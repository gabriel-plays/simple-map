window.onload = () => {
  const protocol = new pmtiles.Protocol();
  maplibregl.addProtocol("pmtiles", protocol.tile);

  const map = new maplibregl.Map({
    container: "map",
    style: createStyle("dark"),
    center: [18.4241, -33.9249], // Cape Town
    zoom: 10
  });

  // Controls
  map.addControl(new maplibregl.NavigationControl(), "bottom-right");
  map.addControl(new maplibregl.GeolocateControl({
    positionOptions: { enableHighAccuracy: true },
    trackUserLocation: true,
    showUserHeading: true
  }), "bottom-right");

  // Basemap selector
  document.getElementById("basemap-select").addEventListener("change", (e) => {
    const selected = e.target.value;
    map.setStyle(createStyle(selected));
  });

  // Style builder
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

  // Add boundaries layer when style is ready
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

    // Wire up UI controls once layers exist
    setupUI();
  });

  function setupUI() {
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
  }
};
