const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');
const verifyToken = require('../Middlewares/verifyToken');

// Route to get user profile
router.get('/profile', verifyToken, authController.getUserProfile);

// Route to update user profile
router.put('/profile/update', verifyToken, authController.updateUserProfile);

module.exports = router;
