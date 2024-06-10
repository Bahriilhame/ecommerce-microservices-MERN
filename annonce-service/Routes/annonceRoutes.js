const express = require('express');
const router = express.Router();
const annonceController = require('../Controllers/AnnonceController');
const authMiddleware = require('../../auth-service/Middlewares/authMiddleware');
const upload=require('../Middlewares/ImageUpload')

// get all annonces
router.get('/', annonceController.getAllAnnonces);

// create a new annonce
router.post('/create', authMiddleware,upload.single('image'),annonceController.createAnnonce);

// get an annonce by ID
router.get('/:id' ,annonceController.getAnnonceById);

// update an annonce by ID
router.put('/:id' ,upload.single('image'),annonceController.updateAnnonceById);

// delete an annonce by ID
router.delete('/:id' , annonceController.deleteAnnonceById);

// Route to get all announcements of a specific seller
router.get('/seller/:idSeller',annonceController.getAllAnnoncesBySeller);

// Update quantity after passing an order
router.put('/update-quantity/annonce', annonceController.updateAnnonceQuantity);

module.exports = router;
