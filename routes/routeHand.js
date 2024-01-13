import express from 'express'

import mainController from '../controllers/mainControllers'

const router = express.Router()

router.get('/', mainController.rootHandler)

export default router 

