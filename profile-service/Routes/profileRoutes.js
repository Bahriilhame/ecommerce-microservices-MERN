const express = require('express');
const router = express.Router();
const profileController = require('../Controllers/profileController');
const verifyToken = require('../Middlewares/verifyToken');

// Route pour récupérer le profil de l'utilisateur
router.get('/', verifyToken, profileController.getUserProfile);

// Route pour mettre à jour le profil de l'utilisateur
router.put('/update', verifyToken, profileController.updateUserProfile);

module.exports = router;
