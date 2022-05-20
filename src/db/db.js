const mongoose = require('mongoose')
const redis = require('redis')
const { DB_URI } = process.env
const logger = require('../lib/winston')
const { REDIS_URI, REDIS_PASS } = process.env
const redisClient = redis.createClient({ url: `redis://${REDIS_URI}`, password: REDIS_PASS, legacyMode: true })

//connect mongodb atlat db
async function connectDb() {
    try {
        mongoose.connect(DB_URI)
        console.log(`Connect to db establish`)
    } catch (error) {
        console.log(error)
    }
}

//listen event on redisClient
redisClient.on('error', function (err) {
    console.log('Could not establish a connection with redis. ' + err)
})
redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully')
})

//connect redis
async function createRedisConnect() {
    try {
        await redisClient.connect()
    } catch (error) {
        logger.error(`[REDIS] ${error.name}: ${error.message}`)
    }
}

module.exports = { connectDb, redisClient, createRedisConnect }
