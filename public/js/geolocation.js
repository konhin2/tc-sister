const map = L.map('map-template').setView([19.4978, -99.1269], 7)
const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const socket = io()

L.tileLayer(tileURL).addTo(map);

map.locate({enableHighAccuracy: true})


map.on('locationfound', (e) => {
    const coords = [e.latlng.lat, e.latlng.lng]
    const marker = L.marker(coords).addTo(map)
    marker.bindPopup("You're here!")
    marker.openPopup()
    socket.emit('userCoordinates', e.latlng)
})

socket.on('newUserCoordinates', (coords) => {
    console.log('New user is connected')
    const marker = L.marker([coords.lat, coords.lng]).addTo(map)
    marker.bindPopup("I'm in trouble, please help!")
    marker.openPopup()
})

