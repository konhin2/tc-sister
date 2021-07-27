// 1. IMPORTACIONES
const express = require('express')
const router = express.Router()

const aboutController = require('./../controllers/about.controller')

// 2. RUTEO
router.get('/about', aboutController.home)

// 3. EXPORTACIÓN
module.exports = router