const express = require('express');
const router = express.Router();
const annonceController = require('../Controllers/AnnonceController');
const authMiddleware = require('../../auth-service/authMiddleware');

// get all annonces
router.get('/', annonceController.getAllAnnonces);

// create a new annonce
router.post('/create', authMiddleware,annonceController.createAnnonce);

// get an annonce by ID
router.get('/:id' ,annonceController.getAnnonceById);

// update an annonce by ID
router.put('/update/:id', authMiddleware ,annonceController.updateAnnonceById);

// delete an annonce by ID
router.delete('/delete/:id', authMiddleware , annonceController.deleteAnnonceById);

module.exports = router;
