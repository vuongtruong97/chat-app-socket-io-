require('../lib/passport')
const express = require('express')
const passport = require('passport')

const oauth2Router = express.Router()

oauth2Router.get('/google', passport.authenticate('google'))

oauth2Router.get('/google/redirect', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/users/login' }))

oauth2Router.get('/zalo/redirect', (req, res) => {
    res.send('zalo run success')
})

module.exports = oauth2Router
