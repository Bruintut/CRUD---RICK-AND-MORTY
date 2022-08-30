const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema({
  user: { type: String },
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  
});

const Character = mongoose.model('character', CharacterSchema);

module.exports = Character;