const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } = process.env

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: GOOGLE_REDIRECT_URI,
            scope: ['email', 'profile'],
            state: true,
        },
        async function (accessToken, refreshToken, profile, cb) {
            try {
                console.log('verify')

                const exitsUser = await User.findOne({ googleId: profile._json.sub })
                if (exitsUser) {
                    debugger
                    if (refreshToken) {
                        exitsUser.googleRefreshToken = refreshToken
                    }
                    await exitsUser.generateAuthToken()
                    await exitsUser.save()
                    return cb(null, exitsUser)
                }
                const { given_name: firstName, family_name: lastName, email, picture: avatar, sub: googleId } = profile._json
                const user = new User({ firstName, lastName, email, avatar, googleId, googleRefreshToken: refreshToken })

                await user.generateAuthToken()
                await user.save()
                return cb(null, user)
            } catch (error) {
                console.log(error)
            }
        }
    )
)
passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET_KEY,
        },
        async function (jwt_payload, done) {
            try {
                return null, jwt_payload
            } catch (error) {
                return done(error)
            }
        }
    )
)
passport.serializeUser(function (user, done) {
    console.log('serializeUser')
    // set session.passport.user
    const { _id, accessToken } = user
    done(null, { accessToken, _id })
})

passport.deserializeUser(async (payload, done) => {
    console.log('deserializeUser')
    try {
        const { _id, accessToken } = payload
        let user = await User.findOne({ _id, accessToken })
        //set req.user

        done(null, user)
    } catch (error) {
        done(error, null)
    }
})
