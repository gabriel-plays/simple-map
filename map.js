window.onload = () => {
  const map = new maplibregl.Map({
    container: "map",
    style: createStyle("dark"), // Default basemap
    center: [0, 0],
    zoom: 2
  });

  const nav = new maplibregl.NavigationControl({ visualizePitch: true });
  map.addControl(nav, "bottom-right");

  const geolocate = new maplibregl.GeolocateControl({
    positionOptions: { enableHighAccuracy: true },
    trackUserLocation: true,
    showUserHeading: true
  });
  map.addControl(geolocate, "bottom-right");

  // Optional auto trigger
  map.on("load", () => {
    geolocate.trigger();
  });

  // Basemap switcher
  const selector = document.getElementById("basemap-select");
  selector.addEventListener("change", () => {
    const selected = selector.value;
    map.setStyle(createStyle(selected));
  });

  // Helper to return style object
  function createStyle(type) {
    let tileURL = "";
    let attribution = "";

    if (type === "dark") {
      tileURL = "https://basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}@2x.png";
      attribution = '&copy; OSM &copy; <a href="https://carto.com/">CARTO</a>';
    } else if (type === "light") {
      tileURL = "https://basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}@2x.png";
      attribution = '&copy; OSM &copy; <a href="https://carto.com/">CARTO</a>';
    } else if (type === "esri") {
      tileURL = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
      attribution = "Tiles &copy; Esri";
    }

    return {
      version: 8,
      sources: {
        basemap: {
          type: "raster",
          tiles: [tileURL],
          tileSize: 256,
          attribution: attribution
        }
      },
      layers: [
        {
          id: "basemap",
          type: "raster",
          source: "basemap"
        }
      ]
    };
  }
};
