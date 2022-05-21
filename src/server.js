require('dotenv').config()
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const cookieParser = require('cookie-parser')
const Filter = require('bad-words')
const { engine } = require('express-handlebars')
const path = require('path')
const passport = require('passport')
const morgan = require('morgan')
const raw = require('./utils/hbs.helper')
const methodOverride = require('method-override')

const configRouter = require('./routes/routes')
const { connectDb, redisClient, subClient, createRedisConnect } = require('./db/db')

const { generateMessage, generateLocationMess } = require('./utils/messengers')
const { addUser, getUser, removeUser, getUserInRoom } = require('./utils/users')

//config server express and socketio
const app = express()
const server = http.createServer(app)
const io = socketio(server)

//connect to mongodb atlas
connectDb()
// connect redis clound
createRedisConnect()

// define paths and consts
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, './public')
const viewPath = path.join(__dirname, './views')

app.use(express.static(publicDirectoryPath))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(morgan('combined'))
app.use(methodOverride('_method'))

//Configure session middleware
app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: 'secret$%^134',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false, // if true only transmit cookie over https
            httpOnly: false, // if true prevent client side JS from reading the cookie
            maxAge: 1000 * 60 * 10, // session max age in miliseconds
        },
    })
)
// config passport auth
app.use(passport.initialize())
app.use(passport.session())

//config router
configRouter(app)

//config viewengine
app.engine(
    'hbs',
    engine({
        extname: 'hbs',
        helpers: {
            raw,
        },
    })
)
app.set('view engine', 'hbs')
app.set('views', viewPath)

//socket io

io.on('connection', (socket) => {
    //socket.emit(...),
    //io.emit(...),
    //socket.broadcast.emit(...),

    //io.to(toom).emit(...),
    //socket.broadcast.to(room).emit(...)

    //listen join
    socket.on('join', ({ username, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, username, room })

        if (error) {
            return callback(error)
        }
        if (user) {
            socket.join(user.room)
            socket.broadcast.to(user.room).emit('notification', generateMessage(`${user.username} has join the room`))
            socket.emit('wellcome', generateMessage(`Wellcome ${user.username}`), (response) => {})
            io.to(user.room).emit('room data', { room: user.room, users: getUserInRoom(user.room) })
        }
    })

    socket.on('chat message', (message, callback) => {
        const filter = new Filter()
        const user = getUser(socket.id)
        if (user) {
            io.to(user.room).emit('chat message', generateMessage(filter.clean(message), user.username))
            callback('send all user')
        }
    })

    socket.on('share location', (url, callback) => {
        const user = getUser(socket.id)
        if (user) {
            io.to(user.room).emit('share location', generateLocationMess(url, user.username))
            callback('oke')
        }
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if (user) {
            io.to(user.room).emit('notification', generateMessage(`${user.username} has left the room`))
            io.to(user.room).emit('room data', { room: user.room, users: getUserInRoom(user.room) })
        }
    })
})

server.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
})
