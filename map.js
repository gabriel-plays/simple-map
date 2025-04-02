// Initialize map
const map = new maplibregl.Map({
  container: 'map',
  style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
  center: [0, 0],
  zoom: 2,
  attributionControl: false
});

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

// Custom popup logic
document.getElementById('allow-btn').addEventListener('click', () => {
  document.getElementById('location-popup').style.display = 'none';
  geolocateControl.trigger(); // Ask for location only after user allows
});

document.getElementById('deny-btn').addEventListener('click', () => {
  document.getElementById('location-popup').style.display = 'none';
});

// If location fails (user denies or not available), show the custom fallback
geolocateControl.on('error', (e) => {
  console.warn("MapLibre location error:", e);
  document.getElementById('error').style.display = 'flex';
});
