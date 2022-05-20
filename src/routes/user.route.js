const express = require('express')
const auth = require('../middlewares/auth')
const User = require('../models/user.model')
const bcrypt = require('bcrypt')

const userRouter = express.Router()

userRouter.get('/login', (req, res) => {
    res.render('login')
})
userRouter.get('/register', (req, res) => {
    res.render('register')
})
userRouter.get('/logout', auth, (req, res) => {
    req.session.destroy()
    return res.redirect('/')
})
userRouter.post('/login', async (req, res) => {
    try {
        const sess = req.session
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            return res.render('login', { error: 'User not found' })
        }
        if (user && !user.password) {
            return res.redirect('/oauth/google')
        }

        const result = await bcrypt.compare(password, user.password)
        if (!result) {
            return res.render('login', { error: 'Password not match' })
        }
        const token = await user.generateAuthToken()
        sess.token = token
        return res.redirect('/')
    } catch (error) {
        console.log(error)
        return res.render('login', { error: error.message })
    }
})
userRouter.post('/register', async (req, res) => {
    const user = new User({ ...req.body })
    await user.save()
    const token = await user.generateAuthToken()
    req.session.token = token
    res.redirect('/')
})
userRouter.get('/chat', auth, (req, res) => {
    res.render('chat')
})

//

module.exports = userRouter
