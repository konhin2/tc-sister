const bcryptjs = require('bcryptjs')
const mongoose = require("mongoose")
const User = require("./../models/User.model")

// Signup
exports.getSignup = async (req, res) => {
    res.render('auth/signup')
}

exports.postSignup = (req, res) => {
    // Extracción de los datos del formulario
    const {
        username,
        email,
        password
    } = req.body
    const description = 'Add a description'
    const imageUrl = 'https://res.cloudinary.com/dounpryi9/image/upload/v1627340058/movie-project/l7wkenca9vu2gxhgbhpw.png'

    // Verificar que todos los campos sean llenados
    if (!username || !email || !password) {
        return res.render('auth/signup', {
            msg: "All the fields are required."
        })
    }
    // Verificar que el password es fuerte, combinación dificil

    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    // Si el password no cumple con las especificaciones
    if (!regex.test(password)) {
        return res.status(500).render('auth/signup', {
            msg: "Please include password requirements"
        })
    }
    // Encriptación
    bcryptjs
        .genSalt(10)
        .then(salt => bcryptjs.hash(password, salt))
        .then(hashedPassword => {
            return User.create({
                username,
                email,
                passwordHash: hashedPassword,
                imageUrl,
                description
            }).then(()=> {
                User.findOne({
                    username
                })
                    .then(userFound => {
                        req.session.currentUser = userFound
                        return res.redirect('/userprofile/' + userFound.username)
                    })
                    .catch((e) => console.log('error redirección signup', e))
            })
        })
        .catch(error => {
            // validacion del email valido
            if (error instanceof mongoose.Error.ValidationError) {
                res.status(500).render('auth/signup', {
                    msg: 'Use a valid email.'
                });
                // Validacion del username
            } else if (error.code === 11000) {
                res.status(500).render('auth/signup', {
                    msg: 'Username and email already exists. Try another.'
                })
            }
        })
}

// Login
exports.getLogin = async (req, res) => {
    res.render('auth/login')
}

exports.postLogin = async (req, res) => {

    const {
        username,
        password
    } = req.body
    // Validar email y password
    if (!username || !password) {
        return res.render('auth/login', {
            msg: "Please enter username and password"
        })
    }
    User.findOne({
            username
        })
        .then(userFound => {
            // 1. Si el usuario no existe
            if (!userFound) {
                return res.render('auth/login', {
                    msg: "User not found"
                })
            }
            const verAuth = bcryptjs.compareSync(password, userFound.passwordHash)
            // 2. Si el usuario se equvoco de contraseña
            if (!verAuth) {
                return res.render('auth/login', {
                    msg: "Wrong Password"
                })
            }
            // 3. Si el usuraio coincide con la contraseña en la base de datos
            // Vamos a crear en nuestro objeto Session una propiedad que se llame usuario actual

            req.session.currentUser = userFound
            return res.redirect('/userprofile/' + userFound.username)
        })
        .catch((e) => console.log(e))
}