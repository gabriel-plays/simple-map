
let map = new maplibregl.Map({
    container: 'map',
    style: 'https://tiles.basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
    center: [0, 0],
    zoom: 1
});

// Add default map controls
map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'bottom-right');
map.addControl(new maplibregl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true,
    showAccuracyCircle: true
}), 'bottom-right');
