const Annonce = require('../Models/Annonce');
const mongoose=require("mongoose")
require('dotenv').config();

// Create an annonce
exports.createAnnonce = async (req, res) => {
  try {
    const url = `mongodb+srv://${process.env.db_username}:${process.env.db_password}@ecom-avito-project-clus.omnkh3d.mongodb.net/${process.env.db_name}`;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000
    });

    const newAnnonce = new Annonce(req.body);
    await newAnnonce.save();
    res.status(201).json({ message: 'Annonce created successfully', newAnnonce });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read all annonces
exports.getAllAnnonces = async (req, res) => {
  try {
    const url = `mongodb+srv://${process.env.db_username}:${process.env.db_password}@ecom-avito-project-clus.omnkh3d.mongodb.net/${process.env.db_name}`;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000
    });

    const annonces = await Annonce.find();
    res.status(200).json(annonces);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read a single annonce by ID
exports.getAnnonceById = async (req, res) => {
  try {
    const url = `mongodb+srv://${process.env.db_username}:${process.env.db_password}@ecom-avito-project-clus.omnkh3d.mongodb.net/${process.env.db_name}`;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000
    });

    const annonce = await Annonce.findById(req.params.id);
    if (!annonce) {
      return res.status(404).json({ message: 'Annonce not found' });
    }
    res.status(200).json(annonce);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an annonce by ID
exports.updateAnnonceById = async (req, res) => {
  try {
    const url = `mongodb+srv://${process.env.db_username}:${process.env.db_password}@ecom-avito-project-clus.omnkh3d.mongodb.net/${process.env.db_name}`;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000
    });

    const updatedAnnonce = await Annonce.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAnnonce) {
      return res.status(404).json({ message: 'Annonce not found' });
    }
    res.status(200).json({ message: 'Annonce updated successfully',updatedAnnonce});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an annonce by ID
exports.deleteAnnonceById = async (req, res) => {
  try {
    const url = `mongodb+srv://${process.env.db_username}:${process.env.db_password}@ecom-avito-project-clus.omnkh3d.mongodb.net/${process.env.db_name}`;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000
    });
    
    const deletedAnnonce = await Annonce.findByIdAndDelete(req.params.id);
    if (!deletedAnnonce) {
      return res.status(404).json({ message: 'Annonce not found' });
    }
    res.status(200).json({ message: 'Annonce deleted successfully',deletedAnnonce});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
