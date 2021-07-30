const map = L.map('map-template').setView([19.4978, -99.1269], 13)
const btnLocation = document.getElementById('send-location')
const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

L.tileLayer(tileURL).addTo(map);

map.locate({enableHighAccuracy: true})


map.on('locationfound', (e) => {
    const coords = [e.latlng.lat, e.latlng.lng]
    console.log(e)
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/emergency');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        token: {name: 0}
    }));
    L.marker(coords).addTo(map)
        .bindPopup("I'm in trouble, help!")
        .openPopup()
})

// Función para mandar localización al backend

btnLocation.addEventListener('click', () => {
    console.log('el boton funciona')
})