const map = L.map('map', {
    zoomControl: false,
    center: [0, 0],
    zoom: 2
  });
  
  // --- Basemaps ---
  const cartoDark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd', maxZoom: 19
  });
  const cartoLight = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd', maxZoom: 19
  });
  const esriSat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri', maxZoom: 19
  });
  cartoDark.addTo(map);
  
  const baseMaps = {
    "CARTO Dark": cartoDark,
    "CARTO Light": cartoLight,
    "Satellite": esriSat
  };
  L.control.layers(baseMaps, null, { position: 'bottomright' }).addTo(map);
  
  let geocoderControl;
  
  function showLocation(latlng) {
    map.setView(latlng, 16);
    L.circleMarker(latlng, {
      radius: 8,
      fillColor: '#00BFFF',
      color: '#fff',
      weight: 2,
      opacity: 1,
      fillOpacity: 0.8
    }).addTo(map);
  
    const lat = latlng[0];
    const lon = latlng[1];
    const delta = 0.1;
  
    const viewbox = [
      lon - delta,
      lat + delta,
      lon + delta,
      lat - delta
    ];
  
    if (geocoderControl) {
      map.removeControl(geocoderControl);
    }
  
    geocoderControl = L.Control.geocoder({
      defaultMarkGeocode: false,
      placeholder: "Search nearby...",
      errorMessage: "No results found",
      geocoder: L.Control.Geocoder.nominatim({
        viewbox: viewbox.join(','),
        bounded: 1
      })
    })
    .on('markgeocode', function(e) {
      const latlng = e.geocode.center;
      L.marker(latlng).addTo(map)
        .bindPopup(e.geocode.name)
        .openPopup();
      map.setView(latlng, 16);
    })
    .addTo(map);
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

// Create a new PMTiles source
const protocol = new pmtiles.Protocol();
map.addProtocol("pmtiles", protocol.tile);

// Load the PMTiles file from GitHub (relative path is fine!)
const pmtilesUrl = "tiles/boundaries.pmtiles";

// Add vector tiles to Leaflet using Protomaps
const vectorLayer = protomapsL.leafletLayer({
  url: pmtilesUrl,
  paintRules: [
    {
      dataLayer: "layer0", // the layer name used during PMTiles generation
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

  
