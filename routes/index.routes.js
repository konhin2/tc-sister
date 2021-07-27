// 1. IMPORTACIONES
const express = require('express')
const router = express.Router()

const indexController = require('./../controllers/index.controller')

// 2. RUTEO
router.get('/', indexController.home)

// 3. EXPORTACIÓN
module.exports = router