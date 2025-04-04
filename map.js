// ✅ Wait for the DOM and all scripts to fully load
window.addEventListener("load", () => {
  if (typeof pmtiles === "undefined") {
    console.error("PMTiles library is not loaded yet.");
    return;
  }

  const protocol = new pmtiles.Protocol();
  maplibregl.addProtocol("pmtiles", protocol.tile);

  const map = new maplibregl.Map({
    container: "map",
    style: createStyle("dark"),
    center: [18.4241, -33.9249],
    zoom: 10
  });

  map.addControl(new maplibregl.NavigationControl(), "bottom-right");
  map.addControl(new maplibregl.GeolocateControl({
    positionOptions: { enableHighAccuracy: true },
    trackUserLocation: true,
    showUserHeading: true
  }), "bottom-right");

  document.getElementById("basemap-select").addEventListener("change", (e) => {
    map.setStyle(createStyle(e.target.value));
  });

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

  map.on("style.load", () => {
    map.addSource("boundaries", {
      type: "vector",
      url: "pmtiles://https://gab-plays.work/tiles/boundaries.pmtiles"
    });

    map.addLayer({
      id: "boundaries-fill",
      type: "fill",
      source: "boundaries",
      "source-layer": "boundaries",
      paint: {
        "fill-color": "#ffcc00",
        "fill-opacity": 0.5
      }
    });

    map.addLayer({
      id: "boundaries-outline",
      type: "line",
      source: "boundaries",
      "source-layer": "boundaries",
      paint: {
        "line-color": "#ffffff",
        "line-width": 1
      }
    });

    const toggle = document.getElementById("toggle-boundaries");
    const fillColor = document.getElementById("fill-color");
    const fillOpacity = document.getElementById("fill-opacity");

    toggle.addEventListener("change", () => {
      const vis = toggle.checked ? "visible" : "none";
      map.setLayoutProperty("boundaries-fill", "visibility", vis);
      map.setLayoutProperty("boundaries-outline", "visibility", vis);
    });

    fillColor.addEventListener("input", () => {
      map.setPaintProperty("boundaries-fill", "fill-color", fillColor.value);
    });

    fillOpacity.addEventListener("input", () => {
      map.setPaintProperty("boundaries-fill", "fill-opacity", parseFloat(fillOpacity.value));
    });
  });
});
