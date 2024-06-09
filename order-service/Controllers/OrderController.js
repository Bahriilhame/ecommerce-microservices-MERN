const Order = require('../Models/Order');
const mongoose = require('mongoose');

const createOrder = async (req, res) => {
  try {
    const url = `mongodb+srv://${process.env.db_username}:${process.env.db_password}@ecom-avito-project-clus.omnkh3d.mongodb.net/${process.env.db_name}`;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000
    });

    const { id_buyer, products, total } = req.body;

    if (!id_buyer || !products || products.length === 0 || !total) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    const newOrder = new Order({
      id_buyer,
      products,
      total,
      status: 'pending',
    });

    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Erreur lors de la création de la commande:', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

module.exports = {
  createOrder,
};
