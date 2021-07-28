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
    imageUrl: {
        type: String, 
        required: [true, 'Image URL is required.'],
    },
    info: {
        type: String,
        required: [true, 'Info is required.'],
        match:[/^[0-9A-Za-z!@.,;:'"?-]{1,100}\z/, "Less than 100 characters"]
    }
  },
  {
    timestamps: true
  }
);

// 3. MODELO
const Comment = mongoose.model('Comment', userSchema)

// 4. EXPORTACIÓN
module.exports = Comment