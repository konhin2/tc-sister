const User = require("./../models/User.model")
const fileUploader = require('./../config/cloudinary.config')
// User Profile
exports.getUserProfile = async (req, res) => {
    const {
        username
    } = req.params
    try {
        const user = await User.findOne({
            username
        })
        if (user.username == req.session.currentUser.username) {
            console.log('this is your user profile')
            res.render('users/user-profile', {
                user: req.session.currentUser
            })
        } else {
            console.log("You can not see other user profiles")
            res.redirect('/')
        }
    } catch (e) {
        console.log(e)
    }
}
exports.getEditUserProfile = async (req, res) => {
    const {
        id
    } = req.params
    try {
        const user = await User.findById(id)
        res.render('users/user-edit', {
            user
        })
    } catch (e) {
        console.log(e)
    }
}
exports.updateUser = async (req, res) => {
    const {id} = req.params
    const {
        description,
        existingImage
    } = req.body
    let imageUrl
    if (req.file) {
        imageUrl = req.file.path
    } else {
        imageUrl = existingImage
    }
    User.findByIdAndUpdate(id, {description, imageUrl}, {new: true})
        .then((userUpdated) => {
            req.session.currentUser = userUpdated
            res.redirect("/userprofile/" + userUpdated.username)
        })
        .catch(err => console.log(err))
}
// POST - Logout
exports.logout = async (req, res) => {
    console.log('funciona')
    res.clearCookie('session-token')
    req.session.destroy(err => {
        if (err) {
            console.log(err)
        }
        res.redirect('/')
    })
}