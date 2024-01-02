import express from 'express'
import axios from 'axios'
import { 
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
  addFavPlayer,
  getFavPlayers,
  removeFavPlayers
} from '../controllers/controllers'
import { apiBaseURL, headers } from '../config/index.js'

const router = express.Router()

router.get('/', async (req,res) => {
  try {
    const apiUrl = `${apiBaseURL}/persons`;
    const response = await axios.get(apiUrl, {headers});
    res.json(response.data);
  } catch (error) {
    console.error('error fetching persons:', error);
    res.status(500).json({error: 'server error'});
  }
});

router.get('/:id', getPlayerById);

router.post('/', createPlayer);

router.put('/:id', updatePlayer);

router.delete('/:id', deletePlayer);

router.post('/add-favorite', addFavPlayer);

router.get('/favorite-players', getFavPlayers);

router.delete('/remove-favorite/:playerId', removeFavPlayers);

export default router