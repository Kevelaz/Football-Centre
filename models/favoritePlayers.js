import mongoose from 'mongoose'

const favPlayerSchema = new mongoose.Schema({
  playerId: {type: Number,default:'', required: true},
  name: {type: String, required: true },
  nationality: {type: String},
  currentTeam: { type: Object},
  isFavorite: Boolean
})

const FavoritePlayers = mongoose.model('FavoritePlayer', favPlayerSchema);

export default FavoritePlayers