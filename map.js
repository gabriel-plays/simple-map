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

// Show location popup after map load
map.on('load', () => {
  document.getElementById('location-popup').style.display = 'flex';
  document.getElementById('locate-btn').style.display = 'block'; // enable locate button
});

function showError() {
  document.getElementById('error').style.display = 'flex';
}

function locateAndMarkUser() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

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
}

// Popup buttons
document.getElementById('allow-btn').addEventListener('click', () => {
  document.getElementById('location-popup').style.display = 'none';
  locateAndMarkUser();
});

document.getElementById('deny-btn').addEventListener('click', () => {
  document.getElementById('location-popup').style.display = 'none';
});

// 📍 Button
document.getElementById('locate-btn').addEventListener('click', () => {
  locateAndMarkUser();
});
