import express from 'express'

import mainController from '../controllers/mainControllers.js'
import favoriteController from '../controllers/favoriteController.js'


const router = express.Router()

router

router.get('/extract-players/:id', mainController.getPlayerById);

router.get('/players/:id?/:name?', mainController.getPlayerInfo)

router.post('/players/:id?/:name?/favorite', favoriteController.markPlayerAsFav)

router.get('/favorite-list', favoriteController.getFavPlayerList)

router.put('/favorite-list/:id', favoriteController.updateFavPlayer)

router.delete('/favorite-list/:id', favoriteController.removeFavPlayer)

export default router