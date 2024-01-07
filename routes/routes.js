import express from 'express'
import axios from 'axios'
import mainController from '../controllers/mainControllers.js'
import favoriteController from '../controllers/favoriteController.js'
import { apiBaseURL, headers } from '../config/index.js'

const router = express.Router()

router.get('/', async (req,res) => {
  try {
    const apiUrl = `${apiBaseURL}v4/persons`;
    const response = await axios.get(apiUrl, {headers});
    res.json(response.data);
  } catch (error) {
    console.error('error fetching persons:', error);
    res.status(500).json({error: 'server error'});
  }
});

router.get('/extract-players/:id', mainController.getPlayerById);

router.get('/players/:id', mainController.getPlayerInfo)

router.post('/players/:id/favorite', favoriteController.markPlayerAsFav)

router.get('/favorite-list', favoriteController.getFavPlayerList)

router.put('/favorite-list/:id', favoriteController.updateFavPlayer)

router.delete('/favorite-list/:id', favoriteController.removeFavPlayer)

export default router