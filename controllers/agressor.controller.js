// IMPORTACIONES
const Agressor = require('./../models/Agressor.model')
const mongoose = require("mongoose")

exports.getIndex = async (req, res) => {
    try {
        const agressors = await Agressor.find({})
        res.render('agressor/index', {
            agressors
        })
    } catch(err) {
        console.log(err)
    }
}
exports.getCreateAgressor = async (req, res) => {
    res.render('agressor/agressor-create')
}
exports.postCreateAgressor = async (req, res) => {
    const { name, description, address, city, state} = req.body
    // console.log(req.body)

    // Validar que todos los campos esten completos
    if (!name || !description || !req.file || !address || !city || !state) {
        return res.render('agressor/agressor-create', {
            msg: "All the fields are required."
        })
    }
    Agressor.create({
        name,
        description,
        imageUrl: req.file.path, 
        address,
        city,
        state,
        rate: 0,
        author: req.session.currentUser.username
    })
        .then((createdAgressor) => {
            console.log('el usuario creado fue', createdAgressor)
            res.redirect("/agressors")
        })
        .catch(err => {
            // validacion del menos de 100 palabras
            if (err instanceof mongoose.Error.ValidationError) {
                res.status(500).render('agressor/agressor-create', {
                    msg: 'Please write less than 100 words.'
            });
            // Validacion del username
            } else if(err.code === 11000) {
                res.status(500).render('agressor/agressor-create', {
                    msg: 'The agressor already exists.'
                })
            }
        })
}
exports.getDetails = async (req, res) => {
    const {id} = req.params

    try {
        const agressor = await Agressor.findById(id)
        if (agressor.author === req.session.currentUser.username) {
            res.render('agressor/agressor-details', {
                agressorEditable:agressor,
            })
        }else {
            res.render('agressor/agressor-details', {
                agressor
            })
        }
        
    } catch(err) {
        console.log(err)
    }
}

exports.getEditAgressor = async (req, res) => {
    const {id} = req.params
    try {
        const agressor = await Agressor.findById(id)
        if (agressor.author === req.session.currentUser.username) {
            res.render('agressor/agressor-edit', {
                agressor
            })
        } else {
            res.redirect("/agressors")
        }
        
    } catch(err) {
        console.log(err)
    }
}

exports.postEditAgressor = async (req, res) => {
    const {id} = req.params
    let findAgressor
    const {name, description, address, city, state, existingImage, existingRate, existingState} = req.body
    
    const regex = /^\W*(?:\w+(?:\W+|$)){0,100}$/
    // Validar que todos los campos esten completos
    if (!name || !description || !address || !city) {
        return res.render('agressor/agressor-edit', {
            msg: "All the fields are required. Except image file"
        })
    }
    try {
        const agressor = await Agressor.findById(id)
        if (agressor.author === req.session.currentUser.username) {
            findAgressor = agressor
        } 
    } catch(err) {
        console.log(err)
    }
    if (!regex.test(description)) {
        return res.render('agressor/agressor-edit', {
            msg: "Please write less than 100 words.",
            agressor: findAgressor
        })
    }
    let imageUrl
    if (req.file){
        imageUrl = req.file.path
    } else {
        imageUrl = existingImage
    }
    let newState
    if (state) {
        newState = state
    } else {
        newState = existingState
    }
    try {
        const agressor = await Agressor.findByIdAndUpdate(id, {
            name,
            description,
            imageUrl,
            address,
            city,
            state: newState,
            rate: existingRate,
            author: req.session.currentUser.username
        }, {new: true})
        res.redirect("/agressors")
    }catch(err) {
        console.log(err)
        // validacion del menos de 100 palabras
        if (err instanceof mongoose.Error.ValidationError) {
            res.status(500).render('agressor/agressor-edit', {
                msg: 'Please write less than 100 words.'
            })
        }
    }
}

exports.postDeleteAgressor = async (req, res) => {
    const {id} = req.params
    try {
        const agressorFound = await Agressor.findById(id)
        if (agressorFound.author === req.session.currentUser.username) {
            await agressorFound.remove()
            res.redirect("/agressors")
        } else {
            console.log('you can not delete an agressor that you did not create yourself')
            res.redirect("/agressors")
        }
    }catch(err) {
        console.log(err)
    }
}