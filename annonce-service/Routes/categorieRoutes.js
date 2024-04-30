const express = require('express');
const router = express.Router();
const categorieController = require('../Controllers/CategorieController');

// get all categories
router.get('/', categorieController.getAllCategories);

// create a new category
router.post('/create', categorieController.createCategory);

// update a category by ID
router.put('/update/:id', categorieController.updateCategoryById);

// delete a category by ID
router.delete('/delete/:id', categorieController.deleteCategoryById);

module.exports = router;
