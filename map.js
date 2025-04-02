// Init MapLibre map
const map = new maplibregl.Map({
  container: 'map',
  style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
  center: [0, 0],
  zoom: 2,
  attributionControl: false
});

map.addControl(new maplibregl.NavigationControl(), 'bottom-right');

// Once the map is fully loaded, show the location popup
map.on('load', () => {
  document.getElementById('location-popup').style.display = 'flex';
});

// Manual location popup logic
const allowBtn = document.getElementById('allow-btn');
const denyBtn = document.getElementById('deny-btn');

// Handle "Yes"
allowBtn.addEventListener('click', () => {
  document.getElementById('location-popup').style.display = 'none';

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Location found:", latitude, longitude);

        map.flyTo({
          center: [longitude, latitude],
          zoom: 14,
          speed: 1.2,
          curve: 1
        });

        new maplibregl.Marker({ color: "#00BFFF" })
          .setLngLat([longitude, latitude])
          .addTo(map);
      },
      (error) => {
        console.warn("Geolocation error:", error.message);
        showError();
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  } else {
    showError();
  }
});

// Handle "No"
denyBtn.addEventListener('click', () => {
  document.getElementById('location-popup').style.display = 'none';
});

function showError() {
  document.getElementById('error').style.display = 'flex';
}
