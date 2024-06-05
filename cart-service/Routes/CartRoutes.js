const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const verifyToken = require('../Middlewares/verifyToken');

// Add annonce to the cart
router.post('/add', verifyToken ,cartController.addToCart);

// Get the cart of the user
router.get('/',verifyToken ,cartController.getCart);
router.post('/remove',verifyToken, cartController.removeFromCart);
module.exports = router;
