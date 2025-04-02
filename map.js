// Init map
const map = new maplibregl.Map({
  container: 'map',
  style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
  center: [0, 0],
  zoom: 2,
  attributionControl: false
});

// Controls
map.addControl(new maplibregl.NavigationControl(), 'bottom-right');

// Built-in Locate Me (GeolocateControl)
const geolocateControl = new maplibregl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true
  },
  trackUserLocation: false,
  showAccuracyCircle: true,
  showUserLocation: true
});
map.addControl(geolocateControl, 'bottom-right');

// Show popup after map load
map.on('load', () => {
  document.getElementById('location-popup').style.display = 'flex';
});

// Error message fallback
function showError() {
  document.getElementById('error').style.display = 'flex';
}

// Popup buttons
document.getElementById('allow-btn').addEventListener('click', () => {
  document.getElementById('location-popup').style.display = 'none';
  geolocateControl.trigger(); // Use MapLibre's native locate action
});

document.getElementById('deny-btn').addEventListener('click', () => {
  document.getElementById('location-popup').style.display = 'none';
});
