const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = process.env
async function auth(req, res, next) {
    const token = req.session.token
    if (req.user) {
        res.locals.email = req.user.email
        return next()
    }
    try {
        if (!token) {
            return res.redirect('/users/login')
        }
        const decoded = jwt.verify(token, SECRET_KEY)
        const userId = decoded.id
        const user = await User.findOne({ _id: userId, tokens: token })
        if (!user) {
            return res.redirect('/users/login')
        }
        req.user = user
        res.locals.email = user.email
        next()
    } catch (error) {
        console.log(error)
        res.redirect('/users/login')
    }
}

module.exports = auth
