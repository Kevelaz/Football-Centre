import axios from 'axios';
import { apiBaseURL, headers } from '../config/index.js';
import Player from '../models/player.js';
//import FavoritePlayers from '../models/favoritePlayers.js';
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
    const { id:playerId, name, nationality, currentTeam } = playerData
    const existingPlayer = await Player.findOne({ playerId })

    if (!existingPlayer) {
      const newPlayer = new Player ({
        playerId,
        name,
        nationality,
        currentTeam,
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
const markAsFavorite = async (req, res) => {
  try {
    const playerId = req.params.id

    const player = await Player.findOne({playerId})

    if(!player) {
      return res.status(404).json({ error: 'player not found '})
    }
    player.isFavorite = !player.isFavorite

    await player.save()

    res.json({message: 'player marked as favorite', isFavorite: player.isFavorite})
  } catch (error) {
    console.error('error marking player as favorites', error)
    res.status(500).json({error: 'internal server error'})
  }
}

const unmarkAsFav = async (req,res) => {
  try {
    const playerId = req.params.id;

    const player = await Player.findOne({ playerId });

    if(!player) {
      return res.status(404).json({error:'Player not found'})
    }
    player.isFavorite = false; await player.save()
    res.json({
      message:'Player unmarked as favorite',
      isFavorite: player.isFavorite,
    })
  } catch(error) {
    console.error('error unmarking player as favorite', error);
    res.status(500).json ({error: 'Internal server error homie'})
  }
}
const createPlayer = async (req,res) => {
  try {
    const { name, nationality, club } = req.body;
    const apiUrl = `${apiBaseURL}v4/persons`;
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
    const apiUrl = `${apiBaseURL}v4/persons/${personId}`;
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
    const apiUrl = `${apiBaseURL}v4/persons/${personId}`
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
/*const addFavPlayer = async (req,res) => {
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
};*/
const controller = {
  getPlayerById,
  markAsFavorite,
  unmarkAsFav,
  createPlayer,
  updatePlayer,
  deletePlayer,
  //addFavPlayer,
  //getFavPlayers,
  //removeFavPlayers
}
export default controller