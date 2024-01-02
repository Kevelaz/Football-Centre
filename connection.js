import mongoose from 'mongoose'

import dotenv from 'dotenv'

dotenv.config()

const DATABASE_URI = process.env.DATABASE_URI


mongoose.connect(DATABASE_URI)
mongoose.connection
.on('open', () => {console.log('connected to mongo')})
.on('close', () => {console.log('disconnected from mongo')})
.on('error', (error) => {console.log('error trying to connect ')})

module.exports = mongoose