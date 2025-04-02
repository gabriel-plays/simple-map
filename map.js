// Init MapLibre map
const map = new maplibregl.Map({
  container: 'map',
  style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
  center: [0, 0],
  zoom: 2,
  attributionControl: false
});

map.addControl(new maplibregl.NavigationControl(), 'bottom-right');

// Manual location popup logic
const locationPopup = document.getElementById('location-popup');
const allowBtn = document.getElementById('allow-btn');
const denyBtn = document.getElementById('deny-btn');

// Handle allow
allowBtn.addEventListener('click', () => {
  locationPopup.style.display = 'none';
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(showLocation, showError, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    });
  } else {
    showError();
  }
});

// Handle deny
denyBtn.addEventListener('click', () => {
  locationPopup.style.display = 'none';
});

// Location logic
function showLocation(position) {
  const { latitude, longitude } = position.coords;
  map.setCenter([longitude, latitude]);
  map.setZoom(14);

  new maplibregl.Marker({ color: "#00BFFF" })
    .setLngLat([longitude, latitude])
    .addTo(map);
}

function showError() {
  document.getElementById('error').style.display = 'flex';
}

