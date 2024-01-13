import axios from 'axios';
import { apiBaseURL, headers } from '../config/index.js';
import Player from '../models/player.js';



const rootHandler = (req, res) => {
  res.send('hello. this is the root path!')
}


const getPlayerById = async (req,res) => {
  try {
    const personId = req.params.id;
    const apiUrl = `${apiBaseURL}v4/persons/${personId}`;
    console.log('API URL:', apiUrl)

    const response = await axios.get(apiUrl, {headers});
    const playerData = response.data
    console.log('API response:', playerData)
    res.json(playerData);

    await savePlayerToDatabase(playerData)
  } catch (error) {
    console.error('error fetching person info:', error);

    if (error.response) {
      console.log('response status:', error.response.status);
      console.log('response data:', error.response.data)
      res.status(error.response.status).json({error: 'Internal server error'});
    } else {
      res.status(500).json({error: ' internal server error'});
    }
  }
};



const savePlayerToDatabase = async (playerData) => {
  try {
    const {id: playerId, name, nationality, currentTeam } = playerData
    const existingPlayer = await Player.findOne({ playerId })

    if (!existingPlayer) {
      const newPlayer = new Player ({
       // objectId: new mongoose.types.ObjectId(),
        playerId: playerId,
        name: name,
        nationality: nationality,
        currentTeam: currentTeam,
      })
      await newPlayer.save()
      console.log('player saved to the local database:', newPlayer)
    } else {
      console.log('player already exists in the local database')
    }
  } catch (error) {
    console.error('error saving player to the local database', error)
  }
}

const getPlayerInfo = async (req, res) => {
  try {
    const { id, name } = req.params;

    if (id || name) {
      let query = {};

      if (id) {
        query = { playerId: id };
      } else if (name) {
        query = { name: name };
      }
    console.log('query:', query )
      const player = await Player.findOne(query);

      if (!player) {
        return res.status(404).json({ error: 'Player not found' });
      }

      return res.json(player.toObject());
    } else {
      return res.status(400).json({ error: 'Bad request: Provide playerId or playerName' });
    }
  } catch (error) {
    console.error('Error fetching player info', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};






const mainController = {
  rootHandler,
  getPlayerById,
  getPlayerInfo,
  
}
export default mainController