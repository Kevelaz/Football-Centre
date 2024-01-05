import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const DATABASE_URI = process.env.DATABASE_URI


mongoose.connect(DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

db.once('close', () => {
  console.log('Disconnected from MongoDB');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('mongodb connection closed due to app termination')
  })
})
export default mongoose