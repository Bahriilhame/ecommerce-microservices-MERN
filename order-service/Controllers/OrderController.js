const Order = require('../Models/Order');
const mongoose = require('mongoose');
const axios = require('axios');

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

const getUserOrders = async (req, res) => {
  try {
    const url = `mongodb+srv://${process.env.db_username}:${process.env.db_password}@ecom-avito-project-clus.omnkh3d.mongodb.net/${process.env.db_name}`;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000
    });

    const userId = req.params.userId; // Récupérer userId à partir des paramètres de la requête
    const userOrders = await Order.find({ id_buyer: userId }); // Trouver toutes les commandes de l'utilisateur
    res.status(200).json({ orders: userOrders }); // Renvoyer les commandes au format JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getOrdersBySeller = async (req, res) => {
  try {
    const url = `mongodb+srv://${process.env.db_username}:${process.env.db_password}@ecom-avito-project-clus.omnkh3d.mongodb.net/${process.env.db_name}`;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000
    });
    
    const sellerId = req.params.sellerId;
    const orders = await Order.find({ 'products.id_seller': sellerId });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this seller' });
    }

    const sellerProducts = await Promise.all(orders.map(async (order) => {
      const filteredProducts = order.products.filter(product => product.id_seller.toString() === sellerId);
      const productsWithBuyerInfo = await Promise.all(filteredProducts.map(async (product) => {
        try {
          const buyerInfo = await axios.get(`http://localhost:8002/api/profile/${order.id_buyer}`);
          console.log("buyerInfo: ", buyerInfo.data);
          return {
            ...product.toObject(),
            id_buyer: order.id_buyer,
            buyerInfo: buyerInfo.data,
            createdAt: order.createdAt,
            order_id: order._id,
            updatedAt: order.updatedAt
          };
        } catch (error) {
          console.error("Error fetching buyer info:", error);
          return null;
        }
      }));
      return productsWithBuyerInfo.filter(product => product !== null);
    }));
    
    res.status(200).json({ products: sellerProducts.flat() });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const updateProductStatus = async (req, res) => {
  try {
    const { orderId, productId, status, id_buyer } = req.body;

    const url = `mongodb+srv://${process.env.db_username}:${process.env.db_password}@ecom-avito-project-clus.omnkh3d.mongodb.net/${process.env.db_name}`;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000
    });

    const order = await Order.findById(orderId);
    console.log("order : ", order);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Find the index of the product matching both productId and orderId
    const productIndex = order.products.findIndex(product => product._id.toString() === productId && order._id.toString() === orderId);
    if (productIndex === -1) return res.status(404).json({ message: 'Product not found in the order' });

    // Update the product status
    order.products[productIndex].status = status;
    await order.save();

    res.status(200).json({ message: 'Product status updated successfully' });
  } catch (error) {
    console.error('Error updating product status:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrdersBySeller,
  updateProductStatus
};
