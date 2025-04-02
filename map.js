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
  [13.072357, -35.061477], // Southwest
  [35.858002, -21.876792]  // Northeast
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

// Custom popup logic
document.getElementById('allow-btn').addEventListener('click', () => {
  document.getElementById('location-popup').style.display = 'none';

  if (!navigator.geolocation) {
    showError();
    return;
  }

  // Check permissions
  if (navigator.permissions) {
    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      if (result.state === 'granted' || result.state === 'prompt') {
        geolocateControl.trigger();
      } else {
        showError(); // Permission denied or blocked
      }
    }).catch(() => {
      // Permissions API not supported, fallback
      geolocateControl.trigger();
    });
  } else {
    // Permissions API not supported, fallback
    geolocateControl.trigger();
  }
});

document.getElementById('deny-btn').addEventListener('click', () => {
  document.getElementById('location-popup').style.display = 'none';
});

// If location fails (user denies or not available), show the custom fallback
geolocateControl.on('error', (e) => {
  console.warn("MapLibre location error:", e);
  document.getElementById('error').style.display = 'flex';
});
