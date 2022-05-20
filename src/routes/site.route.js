const express = require('express')
const auth = require('../middlewares/auth')

const siteRouter = express.Router()

siteRouter.get('', auth, (req, res) => {
    res.render('home')
})

module.exports = siteRouter
