const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  token: String
})

mongoose.model('users', UserSchema);

module.exports = mongoose.model('users')