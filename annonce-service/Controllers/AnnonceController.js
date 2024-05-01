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
      newAnnonce.id_vendeur = req.user._id;
      console.log(req.user);
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

    // Récupérer l'annonce à mettre à jour
    const annonceToUpdate = await Annonce.findById(req.params.id);
    if (!annonceToUpdate) {
      return res.status(404).json({ message: 'Annonce not found' });
    }

    // Vérifier si l'utilisateur est autorisé à mettre à jour cette annonce
    if (annonceToUpdate.id_vendeur.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'You are Unauthorized to update this annonce' });
    }

    // Mettre à jour l'annonce
    const updatedAnnonce = await Annonce.findByIdAndUpdate(req.params.id, req.body, { new: true });
 
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

    // Récupérer l'annonce à supprimer
    const annonceToDelete = await Annonce.findById(req.params.id);
    if (!annonceToDelete) {
      return res.status(404).json({ message: 'Annonce not found' });
    }

    // Vérifier si l'utilisateur est autorisé à supprimer cette annonce
    if (annonceToDelete.id_vendeur.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'You are Unauthorized to delete this annonce' });
    }

    // Supprimer l'annonce
    const deletedAnnonce = await Annonce.findByIdAndDelete(req.params.id);
    console.log(deletedAnnonce);
    res.status(200).json({ message: 'Annonce deleted successfully', deletedAnnonce });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
