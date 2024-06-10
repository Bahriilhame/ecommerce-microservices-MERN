const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, required: true },
//   annonces: [{
//     annonce: { type: mongoose.Schema.Types.Mixed, required: true }
//   }]

  userId: { type: mongoose.Schema.Types.ObjectId },
  annonces: [{
    annonce: { type: mongoose.Schema.Types.Mixed }
  }]

});

module.exports = mongoose.model('Wishlist', wishlistSchema);
