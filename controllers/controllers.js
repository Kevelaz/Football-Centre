import axios from 'axios';
import { apiBaseURL, headers } from '../config/index.js';
import FavoritePlayers from '../models/favoritePlayers.js';
//Section for main framework for API
const getPlayerById = async (req,res) => {
  try {
    const personId = req.params.id;
    const apiUrl = `${apiBaseURL}/persons/${personId}`;
    console.log('API URL:', apiUrl)

    const response = await axios.get(apiUrl, {headers});
    res.json(response.data);
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

const createPlayer = async (req,res) => {
  try {
    const { name, nationality, club } = req.body;
    const apiUrl = `${apiBaseURL}/persons`;
    console.log('API URL:', apiUrl);

    const response = await axios.post(apiUrl, {name, nationality, club}, { headers });
    res.json(response.data);
  } catch(error) {
    console.error('error creating person:', error)

    if (error.response) {
      console.log('response status:', error.response.status);
      console.log('response data:', error.response.data);
      res.status(error.response.status).json({error: 'bad request'});
    } else {
      res.status(500).json({ error: ' internal server error '});
    }
  }
};

const updatePlayer = async (req,res) => {
  try {
    const personId = req.params.id;
    const { name, nationality, club} = req.body;
    const apiUrl = `${apiBaseURL}/persons/${personId}`;
    console.log('API URL:', apiUrl);

    const response = await axios.put(apiUrl, {name, nationality, club}, {headers});
    res.json(response.data);
  } catch (error) {
    console.error('error updating person info', error);

    if(error.response) {
      console.log('response status:', error.response.status);
      console.log('response data:', error.response.data);
      res.status(error.response.status).json({error:'bad request'});
    } else {
      res.status(500).json({error: 'internal server error'});
    }
  }
};

const deletePlayer = async (req,res) => {
  try {
    const personId = req.params.id;
    const apiUrl = `${apiBaseURL}/persons/${personId}`
    console.log('API URL:', apiUrl);
    
    const response = await axios.delete(apiUrl, {headers});
    res.json(response.data);
  } catch (error) {
    console.error('error deleting person', error);

    if(error.response) {
      console.log('response status:', error.response.status);
      console.log('response data:', error.response.data);
      res.status(error.response.status).json({error: 'bad request'});
    } else {
      res.status(500).json({error: 'Internal server error'});
    }
  }
};
//Section for favorite players
const addFavPlayer = async (req,res) => {
  try {
    const userId = req.userId;
    const {playerId, playerName, playerNationality, playerClub} = req.body;

    await FavoritePlayers.findByIdAndUpdate(userId, {
      $push: {favoritePlayers: { 
        playerId,
        playerName,
        playerNationality,
        playerClub
      }},
    });
    res.json({message: 'favorite player added successfully'});
  } catch (error) {
    handleError(res, error);
  }
};

const getFavPlayers = async (req,res) => {
  try {
    const userId = req.user.userId;
    const user = await FavoritePlayers.findById(userId);
    res.json(user.favoritePlayers);
  } catch (error) {
    handleError(res, error);
  }
}

const removeFavPlayers = async (req,res) => {
  try {
    const userId = req.user.userId;
    const playerIdToRemove = req.params.playerId;

    await FavoritePlayers.findByIdAndUpdate(userId, {
      $pull: {favoritePlayers: {playerId: playerIdToRemove} },
    });
    res.json({message: 'favorite player removed'});
  } catch (error) {
    handleError(res,error);
  }
}

const handleError = (res, error) => {
  console.error('error:', error);

  if(error.response) {
    console.log('response status:', error.response.status);
    console.log('response data:', error.response.data);
    res.status(error.response.status).json({error: 'internal server error'});
  } else {
    res.status(500).json({error:'internal server error'});
  }
};
export {
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
  addFavPlayer,
  getFavPlayers,
  removeFavPlayers
}
