import mongoose from 'mongoose'

const favPlayerSchema = new mongoose.Schema({
  username: String,
  password: String,
  favoritePlayers: [
    {
      playerId: String,
      playerName: String,
      playerNationality: String,
      playerClub: String,
    },
  ],
});
const FavoritePlayers = mongoose.model('Favorite', favPlayerSchema);

export default FavoritePlayers;

