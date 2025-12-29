
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: "map", // container ID

    center: [77.2090, 28.6139], // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9 // starting zoom
});

console.log(coordinates);
// const marker1 = new mapboxgl.Marker()
//     .setLngLat(coordinates)//we will send here those longitudes and latittudes save din Listing.geometry.coordinates
//     .addTo(map);