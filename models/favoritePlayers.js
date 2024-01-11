import mongoose from 'mongoose'

const favPlayerSchema = new mongoose.Schema({
  objectId: {type:mongoose.Schema.Types.ObjectId},
  playerId: {type: String, required: true},
  name: {type: String, required: true },
  nationality: {type: String, required: true},
  currentTeam: { type: Object, required:true},
  isFavorite: Boolean,

})

const FavoritePlayers = mongoose.model('FavoritePlayer', favPlayerSchema);

export default FavoritePlayers