import axios from 'axios'

const API_BASE_URL = process.env.API_BASE_URL || 'https://api.football-data.org'
const API_KEY = process.env.API_KEY




const footballData = {
  getPlayers: async (playerId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/v4/persons/{id}`, {
        headers: {
          'X-Auth-Token': API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      console.error('error fetching players', error)
      throw error
    }
  }
}


export default footballData