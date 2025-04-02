// Init MapLibre map
const map = new maplibregl.Map({
  container: 'map',
  style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
  center: [0, 0],
  zoom: 2,
  attributionControl: false
});

// Add zoom controls
map.addControl(new maplibregl.NavigationControl(), 'bottom-right');

// Geolocation
function showLocation(position) {
  const { latitude, longitude } = position.coords;
  map.setCenter([longitude, latitude]);
  map.setZoom(14);

  // Add a marker
  new maplibregl.Marker({ color: "#00BFFF" })
    .setLngLat([longitude, latitude])
    .addTo(map);
}

function showError() {
  document.getElementById('error').style.display = 'flex';
}

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(showLocation, showError, {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  });
} else {
  showError();
}
