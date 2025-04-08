window.addEventListener('load', () => {
  const map = L.map('map', {
    center: [-20, 25],
    zoom: 4,
    zoomControl: true
  });

  const baseLayers = {
    "Carto Dark": L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '',
      subdomains: 'abcd',
      maxZoom: 19
    }),

    "Carto Light": L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '',
      subdomains: 'abcd',
      maxZoom: 19
    }),

    "Esri Imagery": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: '',
      maxZoom: 19
    }),

    "OpenStreetMap": L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '',
      maxZoom: 19
    })
  };

  baseLayers["Carto Dark"].addTo(map);
  L.control.layers(baseLayers, null, { position: 'topright' }).addTo(map);
});
