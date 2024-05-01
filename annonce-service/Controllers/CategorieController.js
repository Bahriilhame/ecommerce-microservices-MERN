const Categorie = require('../Models/Categorie');
const mongoose=require("mongoose")
require('dotenv').config();
const connectDB = require('../../DBConnection/db');

exports.createCategory = async (req, res) => {
  try {
    const url = `mongodb+srv://${process.env.db_username}:${process.env.db_password}@ecom-avito-project-clus.omnkh3d.mongodb.net/${process.env.db_name}`;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000
    });
    const newCategory = new Categorie({
      name: req.body.name
    });

    await newCategory.save();
    console.log("success");
    res.status(201).send({message: 'Category created successfully', newCategory});

  } catch (error) {
    console.log("sedhe");
    res.status(500).send(error.message);
  }
};

// exports.createCategory = async (req, res) => {
//   try {
//     await connectDB(process.env.db_username, process.env.db_password, process.env.db_name);
//     const newCategory = new Categorie({
//       name: req.body.name
//     });
//     await newCategory.save();
//     console.log("success");
//     res.status(201).send({message: 'Category created successfully', newCategory});
//   } catch (error) {
//     console.log("sedhe");
//     res.status(500).send(error.message);
//   }
// };

// get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const url = `mongodb+srv://${process.env.db_username}:${process.env.db_password}@ecom-avito-project-clus.omnkh3d.mongodb.net/${process.env.db_name}`;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000
    });

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
    const url = `mongodb+srv://${process.env.db_username}:${process.env.db_password}@ecom-avito-project-clus.omnkh3d.mongodb.net/${process.env.db_name}`;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000
    });

    const updatedCategory = await Categorie.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    res.status(200).send({message: 'Category updated successfully', updatedCategory});
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// deleting a category by ID
exports.deleteCategoryById = async (req, res) => {
  try {
    const url = `mongodb+srv://${process.env.db_username}:${process.env.db_password}@ecom-avito-project-clus.omnkh3d.mongodb.net/${process.env.db_name}`;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000
    });

    const deletedCategory = await Categorie.findByIdAndDelete(req.params.id);
    res.status(200).send({message: 'Category deleted successfully', deletedCategory});
  } catch (error) {
    res.status(500).send(error.message);
  }
};
