const mongoose = require('mongoose');

const annonceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  date_time: {
    type: Date,
    default: Date.now
  },
  adresse: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  id_categorie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categorie',
    required: true
  }
});

const Annonce = mongoose.model('Annonce', annonceSchema,"annonces");

module.exports = Annonce;
