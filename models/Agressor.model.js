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
    },
    description: {
      type: String,
      required: [true, 'Description is required.'],
      match:[/^\W*(?:\w+(?:\W+|$)){0,100}$/, "Less than 100 words"]
    },
    address: {
      type: String,
      required: [true, 'Address is required.'],
    },
    city: {
      type: String,
      required: [true, 'City is required.'],
    },
    state: {
      type: String,
      required: [true, 'State is required.'],
    },
    rate: Number,
    author: String,
  },
  {
    timestamps: true
  }
);

// 3. MODELO
const Agressor = mongoose.model('Agressor', userSchema)

// 4. EXPORTACIÓN
module.exports = Agressor