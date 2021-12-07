import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  id: String,
  email: { type: String, required: true },
  password: { type: String, required: true }
})

const users = mongoose.model('users', UserSchema);