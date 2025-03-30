// Init map
const map = L.map('map', {
  zoomControl: false,
  center: [0, 0],
  zoom: 2
});

// Basemaps
const cartoDark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  subdomains: 'abcd', maxZoom: 19
});
cartoDark.addTo(map);

// Add your PMTiles vector layer
const protocol = new pmtiles.Protocol();
map.addProtocol("pmtiles", protocol.tile);

const vectorLayer = protomapsL.leafletLayer({
  url: "https://tiles.gab-plays.work/boundaries.pmtiles",
  paintRules: [
    {
      dataLayer: "boundaries", // this is often 'layer0', can be verified in tile metadata
      symbolizer: {
        kind: "fill",
        color: "#00BFFF",
        opacity: 0.15,
        stroke: "#00BFFF",
        strokeWidth: 1
      }
    }
  ]
});

vectorLayer.addTo(map);

// Optional: geolocation
function showLocation(latlng) {
  map.setView(latlng, 14);
  L.circleMarker(latlng, {
    radius: 8,
    fillColor: '#00BFFF',
    color: '#fff',
    weight: 2,
    opacity: 1,
    fillOpacity: 0.8
  }).addTo(map);
}

function showError() {
  document.getElementById('error').style.display = 'flex';
}

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      showLocation([latitude, longitude]);
    },
    (error) => {
      console.warn('Location error:', error.message);
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
