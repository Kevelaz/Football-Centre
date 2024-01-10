import axios from 'axios';
import { apiBaseURL, headers } from '../config/index.js';
import Player from '../models/player.js';
import FavoritePlayers from '../models/favoritePlayers.js';
import User from '../models/user.js';



const markPlayerAsFav = async (req,res) => {
  try {
    const playerId = req.params.id

    const player = await Player.findOne({ playerId })

    if (!player) {
      return res.status(404).json({error: 'player not found '})
    }

    const favoritePlayer = new FavoritePlayers({
      playerId: player.playerId,
      name: player.name,
      nationality: player.nationality,
      currentTeam: player.currentTeam,
    });

    await favoritePlayer.save();




    res.json({ message: 'Player marked as favorite', isFavorite: true });
  } catch (error) {
    console.error('error marking player as favorite', error)
    res.status(500).json({ error: 'internal server error'})
  }
}




const savePlayerToFavs = async (playerData) => {
  try {
    const {id: playerId, name, nationality, currentTeam } = playerData;
    const existingFavPlayer = await FavoritePlayers.findOne({playerId});

    if(!existingFavPlayer) {
      const newFavPlayer = new FavoritePlayers({
        playerId: playerId,
        name: name,
        nationality: nationality,
        currentTeam: currentTeam,
      })
      await newFavPlayer.save();
      console.log('player saved to favorite database', newFavPlayer)
    } else {
      console.log('player already in favorites db', existingFavPlayer)
    }
  } catch (error) {
    console.error('error saving player to favorites db', error.message)
  }
}




const getFavPlayerList = async (req,res) => {
  try {
    const favPlayers = await FavoritePlayers.find().sort({name:1}).limit(7);

    //if(favPlayers.length === 0) {
      //return res.json({message: 'No favorite players found' });
    //}
    res.json(favPlayers)
  } catch (error) {
    console.error('error fetching favorite player list:', error)
    res.status(500).json({error: 'internla server error'})
  }
}

const updateFavPlayer = async (req,res) => {
  try {
    const playerId = req.params.id;
    const {name, currentTeam} = req.body

    if(!name && !currentTeam) {
      return res.status(400).json({error: 'name or currentTeam must be provided for update'})
    }
    const player = await FavoritePlayers.findOne({ playerId })

    if(!player) {
      return res.status(404).json({error: 'favorite player not found '})
    }
    if(name) player.name = name
    if(currentTeam) player.currentTeam = currentTeam

    await player.save()
    res.json({message:'favorite player updated sucessfully', player})
  } catch (error) {
    console.error('error updating favorite player', error)
    res.status(500).json({error: 'internal server error'})
  }
}


const removeFavPlayer = async (req,res) => {
  try {
    const playerId = req.params.id

    const favoritePlayer = await FavoritePlayers.findOne({playerId})

    if(!favoritePlayer) {
      return res.status(404).json({ error: 'favorite player not found' })
    }
    await FavoritePlayers.findOneAndDelete(favoritePlayer.id)


    res.json({message: 'favorite player deleted successfully'})
  } catch (error) {
    console.error('error deleting favorite player', error)
    res.status(500).json({error: 'internal server error'})
  }
}


const favoriteController = {
  markPlayerAsFav,
  savePlayerToFavs,
  getFavPlayerList,
  updateFavPlayer,
  removeFavPlayer,
}

export default favoriteController