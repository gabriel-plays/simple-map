document.addEventListener("DOMContentLoaded", () => {
  const protocol = new pmtiles.Protocol();
  maplibregl.addProtocol("pmtiles", protocol.tile);

  const map = new maplibregl.Map({
    container: "map",
    style: {
      version: 8,
      sources: {
        carto: {
          type: "raster",
          tiles: [
            "https://basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}@2x.png"
          ],
          tileSize: 256,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
        },
        boundaries: {
          type: "vector",
          url: "pmtiles://https://gab-plays.work/tiles/boundaries.pmtiles"
        }
      },
      layers: [
        {
          id: "carto",
          type: "raster",
          source: "carto"
        },
        {
          id: "boundaries-fill",
          type: "fill",
          source: "boundaries",
          "source-layer": "boundaries",
          paint: {
            "fill-color": "#ffcc00",
            "fill-opacity": 0.5
          }
        },
        {
          id: "boundaries-outline",
          type: "line",
          source: "boundaries",
          "source-layer": "boundaries",
          paint: {
            "line-color": "#ffffff",
            "line-width": 1
          }
        }
      ]
    },
    center: [18.4241, -33.9249], // Cape Town
    zoom: 10
  });
});
