const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');

// Route pour l'inscription (register)
router.post('/register', authController.registerUser);

// Route pour la connexion (login)
router.post('/login', authController.loginUser);

module.exports = router;
