const express = require('express');
const router = express.Router();
const wishlistController = require('../Controllers/wishlistController');
const verifyToken = require('../Middlewares/verifyToken');

// Add annonce to the cart
router.post('/add', verifyToken ,wishlistController.addToWishlist);

// Get the cart of the user
router.get('/',verifyToken ,wishlistController.getWishlist);

// remove an item from the cart
router.post('/remove',verifyToken, wishlistController.removeFromWishlist);

// clear the cart after adding an order
router.post('/clear/:id_buyer', wishlistController.clearWishlist);


module.exports = router;
