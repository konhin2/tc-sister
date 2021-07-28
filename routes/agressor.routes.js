// 1. IMPORTACIONES
const express = require('express')
const router = express.Router()

const agressorRouter = require('./../controllers/agressor.controller')
const { isLoggedIn, isLoggedOut } = require("./../middleware/route-guard")
const fileUploader = require('./../config/cloudinary.config')
// 2. RUTAS
// List of agressors
router.get('/agressors', isLoggedIn, agressorRouter.getIndex)

// Create an agressor 
// Get
router.get('/agressors/create', isLoggedIn, agressorRouter.getCreateAgressor)
// Post
router.post('/agressors/create', fileUploader.single('newImage'), agressorRouter.postCreateAgressor)

// Details of an agressor
router.get('/agressor/:id', isLoggedIn, agressorRouter.getDetails)

// Edit an agressor
router.get('/agressor/:id/edit', isLoggedIn, agressorRouter.getEditAgressor)

router.post('/agressor/:id/edit', fileUploader.single('newImage'), agressorRouter.postEditAgressor)

// Delete an agressor
router.post('/agressor/:id/delete', agressorRouter.postDeleteAgressor)

// 3. EXPORTACIÓN
module.exports = router