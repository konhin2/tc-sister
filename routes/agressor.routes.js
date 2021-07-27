// 1. IMPORTACIONES
const express = require('express')
const router = express.Router()

const agressorRouter = require('./../controllers/agressor.controller')
const { isLoggedIn, isLoggedOut } = require("./../middleware/route-guard")

// 2. RUTAS
router.get('/agressors', isLoggedIn, agressorRouter.getIndex)

// 3. EXPORTACIÓN
module.exports = router