const express = require('express');
const router = express.Router();
const cartController = require('../Controllers/cartController');
const verifyToken = require('../Middlewares/verifyToken');

// Add annonce to the cart
router.post('/add', verifyToken ,cartController.addToCart);

// Get the cart of the user
router.get('/',verifyToken ,cartController.getCart);

// remove an item from the cart
router.post('/remove',verifyToken, cartController.removeFromCart);

// clear the cart after adding an order
router.post('/clear/:id_buyer', cartController.clearCart);

// update the quantity of an item in the cart
router.put('/update/:id_buyer', cartController.updateQuantity);

module.exports = router;
