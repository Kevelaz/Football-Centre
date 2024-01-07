import mongoose from 'mongoose'

const favPlayerSchema = new mongoose.Schema({
  playerId: {type: Number, required: true},
  name: {type: String, required: true },
  nationality: {type: String},
  currentTeam: { type: Object},
  isFavorite: Boolean,
  user: { type:mongoose.Schema.Types.ObjectId, ref: 'User',required:true}
})

const FavoritePlayers = mongoose.model('FavoritePlayer', favPlayerSchema);

export default FavoritePlayers