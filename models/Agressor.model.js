// 1. IMPORTACIÓN
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Name is required.'],
      unique: true
    },
    imageUrl: {
      type: String,
      required: [true, 'Image is required.'],
      match:[/^[0-9A-Za-z!@.,;:'"?-]{1,100}\z/, "Less than 100 characters"]
    },
    description: String
  },
  {
    timestamps: true
  }
);

// 3. MODELO
const Agressor = mongoose.model('Agressor', userSchema)

// 4. EXPORTACIÓN
module.exports = Agressor