// IMPORTACIONES
const fileUploader = require('./../config/cloudinary.config')
const express = require('express')
const router = express.Router()


const userRouter = require('./../controllers/user.controller')
const { isLoggedIn, isLoggedOut } = require("./../middleware/route-guard")

// RUTAS DE USUARIO
// GET PROFILE page current user
// Si estoy loggeado, puedo entrar a mi perfil
// Si no estoy loggeado enviame a la página de login
router.get('/userprofile', isLoggedIn, userRouter.getUserProfile)

// Edit Profile
router.get('/userprofile/:id/edit', isLoggedIn, userRouter.getEditUserProfile)

router.post('/userprofile/:id/edit', fileUploader.single('newImage'), userRouter.postEditUserProfile)

// EXPORTACIÓN
module.exports = router