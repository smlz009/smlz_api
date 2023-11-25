const dotenv = require('dotenv')

dotenv.config()

const SERVER_PORT = process.env.SERVER_PORT || 3000
const SERVER_URL = process.env.SERVER_URL

module.exports = {
  SERVER_PORT,
  SERVER_URL
}
