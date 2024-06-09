const express = require('express');
const router = express.Router();
const authController = require('../Controllers/AuthController');
const verifyToken = require('../Middlewares/verifyToken');

// Route to get user profile
router.get('/profile', verifyToken, authController.getUserProfile);
router.get('/profile/:id_buyer', authController.getBuyer);

// Route to update user profile
router.put('/profile/update', verifyToken, authController.updateUserProfile);

module.exports = router;
