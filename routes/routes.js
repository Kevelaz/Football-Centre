import express from 'express'
import axios from 'axios'

const router = express.Router()
const apiBaseURL = 'https://api.football-data.org'
const apiKey = '1d8552b221214b4f9498f63376b24e9d'
const headers = {
  'X-Auth-Token': apiKey,
}
router.get('/', async (req,res) => {
  try {
    const apiUrl = `${apiBaseURL}/persons`
    const response = await axios.get(apiUrl, {headers})
    res.json(response.data)
  } catch (error) {
    console.error('error fetching person:', error)
    res.status(500).json({error:'server error'})
  }
})

router.get('/v4/persons/id', async (req,res) => {
  console.log('Route Hit');
  try {
    const personId = req.params.id
    console.log('API URL:', apiUrl);
    const apiUrl = `${apiBaseURL}/persons/${personId}`
    const response = await axios.get(apiUrl, {headers})
    res.json(response.data)
  } catch (error) {
    console.error('error fetching person info:', error)
    res.status(500).json({error: 'internal server error'})
  }
})
router.post()
export default router