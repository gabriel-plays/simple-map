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
