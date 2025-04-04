import { Protocol } from "https://unpkg.com/pmtiles@3.1.3/dist/pmtiles.mjs";

const map = new maplibregl.Map({
  container: "map",
  style: {
    version: 8,
    sources: {
      carto: {
        type: "raster",
        tiles: [
          "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
          "https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
        ],
        tileSize: 256,
        attribution: "© OpenStreetMap contributors © CARTO"
      }
    },
    layers: [
      {
        id: "carto",
        type: "raster",
        source: "carto"
      }
    ]
  },
  center: [0, 0],
  zoom: 1,
  attributionControl: false
});

map.addControl(new maplibregl.NavigationControl(), 'bottom-right');
map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-right');

// PMTiles integration
let protocol = new Protocol();
maplibregl.addProtocol("pmtiles", protocol.tile);

function addPMTilesLayer(pmtilesUrl, layerId = "pmtiles-layer") {
  const sourceId = `${layerId}-source`;
  const tileUrl = `pmtiles://${pmtilesUrl}`;

  map.addSource(sourceId, {
    type: "vector",
    url: tileUrl
  });

  map.addLayer({
    id: layerId,
    type: "fill",
    source: sourceId,
    "source-layer": "boundaries",
    paint: {
      "fill-color": "#FF6600",
      "fill-opacity": 0.4,
      "fill-outline-color": "#FFCC00"
    }
  });
}

map.on("load", () => {
  addPMTilesLayer("https://gab-plays.work/tiles/boundaries.pmtiles");
});

// Example usage in console:
// addPMTilesLayer("https://another-pmtiles-url/file.pmtiles", "new-layer-id");
