// IMPORTACIONES
const express = require('express')
const router = express.Router()


const userRouter = require('./../controllers/user.controller')
const { isLoggedIn, isLoggedOut } = require("./../middleware/route-guard")
const fileUploader = require('./../config/cloudinary.config')

// RUTAS DE USUARIO
// GET PROFILE page current user
// Si estoy loggeado, puedo entrar a mi perfil
// Si no estoy loggeado enviame a la página de login
router.get('/userprofile/:username', isLoggedIn, userRouter.getUserProfile)

// Edit Profile
router.get('/userprofile/:username/:id/edit', isLoggedIn, userRouter.getEditUserProfile)

router.post('/userprofile/:username/:id/edit', fileUploader.single('movie-cover-image'), userRouter.updateUser)

// LOGOUT
router.post('/logout', userRouter.logout)

// EXPORTACIÓN
module.exports = router