
let map = new maplibregl.Map({
    container: 'map',
    style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
    center: [0, 0],
    zoom: 1
});

function locateMe() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            map.flyTo({
                center: [position.coords.longitude, position.coords.latitude],
                zoom: 10
            });
        }, () => {
            alert("Geolocation failed.");
        });
    } else {
        alert("Geolocation not supported.");
    }
}

function orientate() {
    map.resetNorth();
}
