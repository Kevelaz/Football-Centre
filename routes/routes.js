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

router.get('/players/:id', controller.getPlayerById);

router.post('/players/:id/mark-as-favorite', controller.markAsFavorite)

router.delete('/players/:id/unmark-favorite', controller.unmarkAsFav)




export default router