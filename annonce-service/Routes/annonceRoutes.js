const express = require('express');
const router = express.Router();
const annonceController = require('../Controllers/AnnonceController');

// get all annonces
router.get('/', annonceController.getAllAnnonces);

// create a new annonce
router.post('/create', annonceController.createAnnonce);

// get an annonce by ID
router.get('/:id', annonceController.getAnnonceById);

// update an annonce by ID
router.put('/update/:id', annonceController.updateAnnonceById);

// delete an annonce by ID
router.delete('/delete/:id', annonceController.deleteAnnonceById);

module.exports = router;
