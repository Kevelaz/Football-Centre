import axios from 'axios';
import { apiBaseURL, headers } from '../config/index.js';
import Player from '../models/player.js';
import FavoritePlayers from '../models/favoritePlayers.js';
import User from '../models/user.js';

//Section for main framework for API
// ignore this and rewrite it to have a route fetch to the football data, then make it desplay to user on the frontend, give the user option to store to local database, then make routes for the data to go to the database, then make that database the favorite players DB there youll perform CRUD fully
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
    const playerId = req.params.id

    const player = await Player.findOne({ playerId })

    if(!player) {
      return res.status(404).json ({ error: 'Player not found '})
    }
    res.json(player.toObject())
  } catch(error) {
    console.error('error fetching player info', error)
    res.status(500).json({ error: 'internal server error'})
  }
}





const mainController = {
  getPlayerById,
  getPlayerInfo,
}
export default mainController