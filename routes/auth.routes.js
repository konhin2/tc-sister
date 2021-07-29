// IMPORTACIONES
const express = require('express')
const router = express.Router()


const authRouter = require('./../controllers/auth.controller')
const { isLoggedIn, isLoggedOut } = require("./../middleware/route-guard")
// RUTEO

// GET - Signup
router.get('/signup', isLoggedOut, authRouter.getSignup)

// POST - Signup (procesar la información del formulario)
router.post('/signup', authRouter.postSignup)

// POST - login with Google
router.post('/login/google', authRouter.postSingupGoogle)

// Login
// GET - Login
router.get('/login', authRouter.getLogin)
// POST - Login (procesar la información del formulario)
router.post('/login', authRouter.postLogin)

// EXPORTACIÓN
module.exports = router
