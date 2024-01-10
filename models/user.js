import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {type: String, required: true, unique:true},
  favoritePlayers: [{type: mongoose.Schema.Types.ObjectId, ref: "FavoritePlayers" }]
}) 
const User = mongoose.model('User', UserSchema)
export default User