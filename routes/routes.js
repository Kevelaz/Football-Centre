import express from 'express'
import axios from 'axios'
import controller from '../controllers/controllers.js'
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

router.get('/persons/:id', controller.getPlayerById);

router.post('/persons', controller.createPlayer);

router.put('/persons/:id', controller.updatePlayer);

router.delete('/persons/:id', controller.deletePlayer);

//router.post('/add-favorite', controller.addFavPlayer);

//router.get('/favorite-players', controller.getFavPlayers);

//router.delete('/remove-favorite/:playerId', controller.removeFavPlayers);

export default router