const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  id_buyer: { type: Schema.Types.ObjectId, required: true },
  products: [
      {
      _id: { type: Schema.Types.ObjectId, required: true },
      id_seller: { type: Schema.Types.ObjectId, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      image_name: {type: String,required: true },
      quantity: { type: Number, required: true },
      status: { type: String, enum: ['pending', 'delivred', 'canceled'], default: 'pending' }
    }
  ],
  total: { type: Number, required: true },
}, 
{ 
    timestamps: true 
});

module.exports = mongoose.model('Order', OrderSchema);
