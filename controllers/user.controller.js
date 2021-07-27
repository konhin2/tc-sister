const User = require("./../models/User.model")
// User Profile
exports.getUserProfile = async (req, res) => {
    res.render('users/user-profile', {
        user: req.session.currentUser
    })
}
exports.getEditUserProfile = async (req, res) => {
    const {id} = req.params
    try {
        const user = await User.findById(id)
        res.render('users/user-edit', {user})
    } catch (e) {
        console.log(e)
    }
}
exports.postEditUserProfile = async (req, res) => {
    console.log(req.body)
    const { id } = req.params
    const { description, existingImage } = req.body
    let imageUrl
    if (req.file) {
       imageUrl = req.file.path 
    } else {
        imageUrl = existingImage
    }
    User.findByIdAndUpdate(id, {
        description,
        imageUrl
    }, {    
        new: true
    })
        .then((newUser) => {
            req.session.currentUser = newUser
            console.log(newUser)
            res.redirect("/userprofile")
        })
        .catch(err => console.log(err))
}