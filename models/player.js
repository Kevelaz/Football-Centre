import mongoose from 'mongoose'

const PlayerSchema = new mongoose.Schema ({
  playerId: {
    type: Number,
    required: true,
    unique: true, 
  },
  name: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  currentTeam: {
    type: Object,
    required: true,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  }
})

const Player = mongoose.model('Player', PlayerSchema)

export default Player