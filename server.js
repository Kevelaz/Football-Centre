import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
//import footballData from './services/footballdata'



const app = express()
const PORT = process.env.PORT || 3000

//app.use(mongoose)
app.use(cors())
app.use(express.json())
//app.use('/', routes)
//app.use(footballData)












app.listen(PORT, () => {
  console.log(`server is running on on port ${PORT}`)
})