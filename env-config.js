// Load env vars
require('dotenv').config()

module.exports = {
  'process.env.API_URL': process.env.API_URL,
  'process.env.NODE_URL': process.env.NODE_URL
}
