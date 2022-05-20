const siteRouter = require('./site.route')
const userRouter = require('./user.route')
const oauth2Router = require('./oauth')

const configRouter = (app) => {
    app.use('/', siteRouter)
    app.use('/users', userRouter)
    app.use('/oauth', oauth2Router)
}

module.exports = configRouter
