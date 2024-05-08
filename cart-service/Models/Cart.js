const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId },
  annonces: [{
    annonce: { type: mongoose.Schema.Types.Mixed },
    quantity: { type: Number }
  }]
});

module.exports = mongoose.model('Cart', cartSchema);
