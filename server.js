import 'dotenv/config.js'
import express from 'express'
import cors from 'cors'
import controller from './controllers/controllers.js' 
import { apiBaseURL, headers } from './config/index.js'
import router from './routes/routes.js'
import mongoose from './connection.js'

const app = express()
const PORT = process.env.PORT || 3000


app.use(cors())
app.use(express.json())
app.use('/', router)
app.use('/football-centre', router)













app.listen(PORT, () => {
  console.log(`server is running on on port ${PORT}`)
})