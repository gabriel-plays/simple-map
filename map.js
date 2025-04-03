// Register PMTiles protocol for MapLibre
const protocol = new pmtiles.Protocol();
maplibregl.addProtocol("pmtiles", protocol);

const map = new maplibregl.Map({
  container: "map",
  style: {
    version: 8,
    sources: {},
    layers: []
  },
  center: [18.4, -33.9], // Centered on Cape Town
  zoom: 10
});

map.on("load", () => {
  // Add PMTiles vector source
  map.addSource("boundaries", {
    type: "vector",
    url: "pmtiles://https://gab-plays.work/tiles/boundaries.pmtiles"
  });

  // Add polygon fill (transparent light blue)
  map.addLayer({
    id: "boundaries-fill",
    type: "fill",
    source: "boundaries",
    "source-layer": "boundaries", // <- replace if needed
    paint: {
      "fill-color": "#add8e6",
      "fill-opacity": 0.3
    }
  });

  // Add polygon outline (thin black line)
  map.addLayer({
    id: "boundaries-outline",
    type: "line",
    source: "boundaries",
    "source-layer": "boundaries", // <- replace if needed
    paint: {
      "line-color": "#000000",
      "line-width": 0.5
    }
  });
});
