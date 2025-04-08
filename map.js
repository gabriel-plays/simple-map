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

  // Locate Me button
  const locateControl = L.control({ position: 'topleft' });
  locateControl.onAdd = function () {
    const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control rounded');
    const button = L.DomUtil.create('a', '', div);
    button.innerHTML = '📍';
    button.title = 'Locate me';
    button.href = '#';

    L.DomEvent.on(button, 'click', function (e) {
      L.DomEvent.stop(e);
      map.locate({ setView: true, maxZoom: 12 });

      map.once('locationfound', function (e) {
        L.circle(e.latlng, {
          radius: e.accuracy / 2,
          color: '#00d',
          fillColor: '#00d',
          fillOpacity: 0.3
        }).addTo(map);
      });

      map.once('locationerror', function () {
        alert("Location access denied or unavailable.");
      });
    });

    return div;
  };
  locateControl.addTo(map);

  // Photon Geocoder
  const geocoder = L.Control.geocoder({
    defaultMarkGeocode: false,
    placeholder: "Search for places, addresses, POIs...",
    geocoder: L.Control.Geocoder.photon()
  })
    .on('markgeocode', function (e) {
      const bbox = e.geocode.bbox;
      const poly = L.polygon([
        bbox.getSouthEast(),
        bbox.getNorthEast(),
        bbox.getNorthWest(),
        bbox.getSouthWest()
      ]).addTo(map);
      map.fitBounds(poly.getBounds());
    })
    .addTo(map);
});
