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

        const image = req.file;
        if (!image) {
          return res.status(400).json({ error: 'Image file is required' });
        }

      const newAnnonce = new Annonce({
        id_vendeur: req.user._id,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        adresse: req.body.adresse,
        status: req.body.status,
        id_categorie: req.body.id_categorie,
        image_name: req.file.filename,
        image_path: req.file.path
      });

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

    // Récupérer toutes les annonces avec leur catégorie associée
    const annonces = await Annonce.find().populate('id_categorie');
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

    const annonce = await Annonce.findById(req.params.id).populate('id_categorie');;
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

    // Mise à jour des champs de l'annonce
    for (const [key, value] of Object.entries(req.body)) {
      annonceToUpdate[key] = value;
    }

    // Mettre à jour l'image si elle est fournie
    if (req.file) {
      annonceToUpdate.image_name = req.file.filename;
      annonceToUpdate.image_path = req.file.path;
    }

    // Enregistrer l'annonce mise à jour
    const updatedAnnonce = await annonceToUpdate.save();

    res.status(200).json({ message: 'Annonce updated successfully', updatedAnnonce });
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

    // Supprimer l'annonce
    const deletedAnnonce = await Annonce.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Annonce deleted successfully', deletedAnnonce });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read all annonces of a specific seller
exports.getAllAnnoncesBySeller = async (req, res) => {
  try {
    const url = `mongodb+srv://${process.env.db_username}:${process.env.db_password}@ecom-avito-project-clus.omnkh3d.mongodb.net/${process.env.db_name}`;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000
    });

    const annonces = await Annonce.find({ id_vendeur: req.params.idSeller }).populate('id_categorie');
    console.log(annonces);
    res.status(200).json(annonces);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAnnonceQuantity = async (req, res) => {
  try {
    const url = `mongodb+srv://${process.env.db_username}:${process.env.db_password}@ecom-avito-project-clus.omnkh3d.mongodb.net/${process.env.db_name}`;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000
    });

    const { annonceId, quantity } = req.body;

    if (!annonceId || quantity === undefined) {
      return res.status(400).json({ message: 'ID de l\'annonce et quantité sont requis.' });
    }

    const annonce = await Annonce.findById(annonceId);
    if (!annonce) {
      return res.status(404).json({ message: 'Annonce non trouvée.' });
    }

    annonce.quantity -= quantity;

    if (annonce.quantity < 0) {
      return res.status(400).json({ message: 'Quantité insuffisante.' });
    }

    await annonce.save();

    res.status(200).json({ message: 'Quantité mise à jour.', annonce });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la quantité:', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};