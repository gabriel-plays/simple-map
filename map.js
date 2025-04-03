// Register pmtiles protocol for MapLibre
let protocol = new pmtiles.Protocol();
maplibregl.addProtocol("pmtiles", protocol);

const map = new maplibregl.Map({
  container: "map",
  style: {
    version: 8,
    sources: {},
    layers: []
  },
  center: [18.4, -33.9],
  zoom: 10
});

map.on("load", () => {
  // Add the PMTiles vector source
  map.addSource("boundaries", {
    type: "vector",
    url: "pmtiles://https://gab-plays.work/tiles/boundaries.pmtiles"
  });

  // Add transparent light blue polygon fill
  map.addLayer({
    id: "boundaries-fill",
    type: "fill",
    source: "boundaries",
    "source-layer": "boundaries", // replace if needed
    paint: {
      "fill-color": "#add8e6",  // light blue
      "fill-opacity": 0.3
    }
  });

  // Add thin black polygon outline
  map.addLayer({
    id: "boundaries-outline",
    type: "line",
    source: "boundaries",
    "source-layer": "boundaries", // replace if needed
    paint: {
      "line-color": "#000000",  // black
      "line-width": 0.5
    }
  });
});
