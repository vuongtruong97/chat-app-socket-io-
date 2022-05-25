const express = require('express')
const auth = require('../middlewares/auth')
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const Email = require('../lib/nodemailer')
const { v4: uuidv4 } = require('uuid')

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
userRouter.get('/chat', auth, (req, res) => {
    res.render('chat')
})
userRouter.get('/create-password', (req, res) => {
    res.render('createPassword')
})
userRouter.get('/reset-password/:token', async (req, res) => {
    const { token } = req.params
    const user = await User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
    if (!user) {
        res.send('error user not found')
    }
    res.render('createPassword', { userId: user._id.toString(), resetToken: token })
})
userRouter.get('/reset-password', (req, res) => {
    res.render('resetPass')
})

userRouter.post('/reset-password', async (req, res) => {
    const { email } = req.body

    const user = await User.findOne({ email })
    if (!user) {
        return res.render('resetPass', { error: 'Email not found!' })
    }

    const token = uuidv4()
    user.resetToken = token
    user.resetTokenExpiration = Date.now() + 3_600_000
    const urlReset = ` https://vuong-chat-app.herokuapp.com/users/reset-password/${token}`
    const mailer = new Email(user, urlReset)

    await user.save()
    res.render('notification', { message: 'Please check your email!' })
    mailer.sendResetPassword(user, urlReset)
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
    const mailer = new Email(user)
    mailer.sendWellCome()
    const token = await user.generateAuthToken()
    req.session.token = token
    res.redirect('/')
})

userRouter.patch('/update', async (req, res) => {
    const { resetToken, id } = req.body
    const user = await User.findOne({ id, resetToken })
    if (!user) {
        return res.send('User not found')
    }
    if (user.resetTokenExpiration < Date.now()) {
        return res.send('Reset expiration, try later')
    }
    user.password = req.body.password
    user.resetToken = undefined
    user.resetTokenExpiration = undefined
    await user.save()
    res.render('notification', { message: `Password change successfully!` })
})
//

module.exports = userRouter
