// Initialize Leaflet map
const map = L.map('map').setView([-20, 25], 4); // Adjusted center and zoom

// Add a base tile layer (OpenStreetMap)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Get references to the input and button
const pmtilesUrlInput = document.getElementById('pmtilesUrl');
const addPmtilesButton = document.getElementById('addPmtiles');

let currentPmtilesLayer = null;

addPmtilesButton.addEventListener('click', () => {
    const url = pmtilesUrlInput.value;
    if (url) {
        if (currentPmtilesLayer) {
            map.removeLayer(currentPmtilesLayer);
            currentPmtilesLayer = null;
        }

        try {
            const pmtiles = new pmtiles.PMTiles(url);
            pmtiles.leafletLayer().then(layer => {
                layer.addTo(map);
                currentPmtilesLayer = layer;

                pmtiles.getMetadata().then(metadata => {
                    if (metadata.bounds) {
                        map.fitBounds([
                            [metadata.bounds[1], metadata.bounds[0]],
                            [metadata.bounds[3], metadata.bounds[2]]
                        ]);
                    }
                });

            }).catch(error => {
                console.error("Error adding PMTiles layer:", error);
                alert("Could not add PMTiles layer. Please check the URL.");
            });
        } catch (error) {
            console.error("Error initializing PMTiles:", error);
            alert("Could not initialize PMTiles. Please check the URL or library.");
        }
    } else {
        alert("Please enter a PMTiles URL.");
    }
});
