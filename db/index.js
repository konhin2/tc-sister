// PATRÓN DE DISEÑO - PROGRAMACIÓN FUNCIONAL

// IMPORTACIONES
const mongoose = require('mongoose')

require('dotenv').config()

// MIDDLEWARE
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
        })
        console.log('Connected to DB')
    } catch (err) {
        console.log(err)
    }
}

// EXPORTACIÓN
module.exports = connectDB