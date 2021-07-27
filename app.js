// 1. IMPORTACIONES
const express = require('express')
const app = express()
const connectDB = require('./db/index')

// 2. MIDDLEWARES
// Conectar a base de datos
connectDB()
// Traer la carpeta /public
// app.use(express.static('./public'))
// Establecer hbs como motor de html
// app.set('view engine', 'hbs')
require('./config')(app)
// Genreración de la session
require('./config/session.config')(app)
// Layout Middleware
app.use((req, res, next) => {
    res.locals.currentUser = req.session.currentUser
    next()
})
// 3. RUTAS

// Ruta Emergency
app.use('/', require('./routes/emergency.routes'))

// Ruta Agressor
app.use('/', require('./routes/agressor.routes'))

// Ruta Autenticación
app.use('/', require('./routes/auth.routes'))

// Ruta Usiario
app.use('/', require('./routes/user.routes'))

// Ruta de About
app.use('/', require('./routes/about.routes'))

// Ruta Home
app.use('/', require('./routes/index.routes'))



// 4. SERVIDOR
module.exports = app
