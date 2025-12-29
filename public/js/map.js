mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/mapbox/streets-v11", 
    center: coordinates, // Use the dynamic coordinates provided by EJS
    zoom: 9 // starting zoom
});

// Create a default Marker and add it to the map.
const marker = new mapboxgl.Marker({ color: 'red' })
    .setLngLat(coordinates) // Listing.geometry.coordinates
    .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h4>Exact Location will be provided after booking</h4>`
        )
    )
    .addTo(map);