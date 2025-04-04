let boundariesAdded = false;

window.addEventListener("load", () => {
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

  const toggle = document.getElementById("toggle-boundaries");
  const fillColor = document.getElementById("fill-color");
  const fillOpacity = document.getElementById("fill-opacity");

  toggle.addEventListener("change", async () => {
    if (!boundariesAdded && toggle.checked) {
      try {
        // Load PMTiles only when needed
        const script = document.createElement("script");
        script.src = "https://unpkg.com/pmtiles@3.1.2/dist/pmtiles.umd.js";
        script.onload = () => {
          const protocol = new pmtiles.Protocol();
          maplibregl.addProtocol("pmtiles", protocol.tile);

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
              "fill-color": fillColor.value,
              "fill-opacity": parseFloat(fillOpacity.value)
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

          boundariesAdded = true;
        };
        document.body.appendChild(script);
      } catch (e) {
        console.error("Failed to load PMTiles or add layer:", e);
      }
    } else if (boundariesAdded) {
      const vis = toggle.checked ? "visible" : "none";
      map.setLayoutProperty("boundaries-fill", "visibility", vis);
      map.setLayoutProperty("boundaries-outline", "visibility", vis);
    }
  });

  fillColor.addEventListener("input", () => {
    if (boundariesAdded) {
      map.setPaintProperty("boundaries-fill", "fill-color", fillColor.value);
    }
  });

  fillOpacity.addEventListener("input", () => {
    if (boundariesAdded) {
      map.setPaintProperty("boundaries-fill", "fill-opacity", parseFloat(fillOpacity.value));
    }
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
});
