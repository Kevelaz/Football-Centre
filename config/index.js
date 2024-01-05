import 'dotenv/config'

const apiBaseURL = process.env.API_BASE_URL;
const apiKey = process.env.API_KEY;

const headers = {
  'X-Auth-Token': apiKey,
};

export {
  apiBaseURL,
  apiKey,
  headers
}