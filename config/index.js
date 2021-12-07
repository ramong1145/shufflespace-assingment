const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    app_port: process.env.APP_PORT,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD
}