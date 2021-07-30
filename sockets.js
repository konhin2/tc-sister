module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('userCoordinates', (coords) => {
            // Aqui llega el arreglo de las coordenadas
            console.log(coords)
            socket.broadcast.emit('newUserCoordinates', coords)
        })
    })
}