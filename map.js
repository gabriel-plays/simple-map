window.onload = () => {
  const map = new maplibregl.Map({
    container: "map",
    style: {
      version: 8,
      sources: {
        carto: {
          type: "raster",
          tiles: [
            "https://basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}@2x.png"
          ],
          tileSize: 256,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
        }
      },
      layers: [
        {
          id: "carto",
          type: "raster",
          source: "carto"
        }
      ]
    },
    center: [0, 0],
    zoom: 2
  });

  // Add zoom and rotation controls to the bottom right
  const nav = new maplibregl.NavigationControl({
    visualizePitch: true
  });
  map.addControl(nav, "bottom-right");
};
