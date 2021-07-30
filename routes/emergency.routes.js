// 1. IMPORTACIONES
const express = require('express')
const router = express.Router()

const emergencyRouter = require('./../controllers/emergency.controller')
const { isLoggedIn, isLoggedOut } = require("./../middleware/route-guard")

// 2. RUTAS
router.get('/emergency', isLoggedIn, emergencyRouter.home)

router.post('/emergency', emergencyRouter.postCoords)

// 3. EXPORTACIÓN
module.exports = router