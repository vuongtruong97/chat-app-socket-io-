const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { SECRET_KEY, EXPERT_KEY } = process.env

const { Schema } = mongoose

const userSchema = new Schema(
    {
        email: { type: String, require: true, trim: true, lowercase: true },
        password: {
            type: String,
            require: true,
            trim: true,
            validate(value) {
                if (value.length < 2) {
                    throw new Error('password must be long than 2 characters')
                }
            },
        },
        firstName: { type: String },
        lastName: { type: String },
        accessToken: { type: String },
        googleId: { type: String },
        avatar: { type: String },
        googleRefreshToken: { type: String },
    },
    { timestamp: true }
)

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const tokenData = { id: user._id }
    const token = jwt.sign(tokenData, SECRET_KEY, { expiresIn: EXPERT_KEY })
    user.accessToken = token
    await user.save()
    return token
}

userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        hashedpassword = await bcrypt.hash(user.password, 10)
        user.password = hashedpassword
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
