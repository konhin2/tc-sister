// 1. IMPORTACIÓN
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'Username is required.'],
      unique: true
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true,
      match:[/^\S+@\S+\.\S+$/, "Use a valid email"]
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required.']
    },
    imageUrl: String,
    description: String
  },
  {
    timestamps: true
  }
);

// 3. MODELO
const User = mongoose.model('User', userSchema)

// 4. EXPORTACIÓN
module.exports = User