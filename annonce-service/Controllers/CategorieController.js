const Categorie = require('../Models/Categorie');

// create a new category
exports.createCategory = async (req, res) => {
  try {
    const newCategory = new Categorie({
      name: req.body.name
    });
    await newCategory.save();
    console.log("success");
    res.status(201).send('Category created successfully');
  } catch (error) {
    console.log("sedhe");
    res.status(500).send(error.message);
  }
};

// get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Categorie.find();
    console.log(categories);
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// update a category by ID
exports.updateCategoryById = async (req, res) => {
  try {
    const updatedCategory = await Categorie.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    res.status(200).send(updatedCategory);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// deleting a category by ID
exports.deleteCategoryById = async (req, res) => {
  try {
    const deletedCategory = await Categorie.findByIdAndDelete(req.params.id);
    res.status(200).send(deletedCategory);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
