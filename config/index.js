const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    app_port: process.env.APP_PORT,
}