// Initialize map
const map = new maplibregl.Map({
  container: 'map',
  style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
  center: [0, 0],
  zoom: 2,
  attributionControl: false
});

// Lock viewport to bounds
const bounds = [
  [4.700775,-38.186387], // Southwest
  [46.558685,-19.704658]  // Northeast
];
map.setMaxBounds(bounds);       // restrict panning
map.fitBounds(bounds);          // zoom to bounds on load
map.setMinZoom(map.getZoom()); // prevent zooming out further


// Controls
map.addControl(new maplibregl.NavigationControl(), 'bottom-right');

// Native "Locate Me" button from MapLibre
const geolocateControl = new maplibregl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true
  },
  trackUserLocation: false,
  showAccuracyCircle: true,
  showUserLocation: true
});
map.addControl(geolocateControl, 'bottom-right');

// Show custom popup after map is fully loaded
map.on('load', () => {
  document.getElementById('location-popup').style.display = 'flex';
});
// Register pmtiles protocol for MapLibre
let protocol = new pmtiles.Protocol();
maplibregl.addProtocol("pmtiles", protocol);

map.on("load", () => {
  // PMTiles vector source
  map.addSource("boundaries", {
    type: "vector",
    url: "pmtiles://https://gab-plays.work/tiles/boundaries.pmtiles"
  });

  // Fill layer
  map.addLayer({
    id: "boundaries-fill",
    type: "fill",
    source: "boundaries",
    "source-layer": "boundaries", // <-- replace this if needed
    paint: {
      "fill-color": "#00aaff",
      "fill-opacity": 0.3
    }
  });

  // Outline layer
  map.addLayer({
    id: "boundaries-outline",
    type: "line",
    source: "boundaries",
    "source-layer": "boundaries", // <-- replace this if needed
    paint: {
      "line-color": "#0077cc",
      "line-width": 1.2
    }
  });
});

