const mongoose = require('mongoose');

const categorieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Categorie = mongoose.model('Categorie', categorieSchema,"categories");

module.exports = Categorie;
