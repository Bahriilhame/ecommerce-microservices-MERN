const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Add annonce to the cart
router.post('/add', cartController.addToCart);

module.exports = router;
