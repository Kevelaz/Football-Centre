require('dotenv').config();

const apiBaseURL = 'http://api.football-data.org/';
const apiKey = process.env.API_KEY;

const headers = {
  'X-Auth-Token': apiKey,
};

export {
  apiBaseURL,
  apiKey,
  headers
}