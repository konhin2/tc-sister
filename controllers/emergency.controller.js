exports.home = async (req, res) => {
    res.render('emergency/index')
}
exports.postCoords = async (req, res) => {
    res.render('emergency/index', {
        msg: 'req.body.currentUser',
    })
}