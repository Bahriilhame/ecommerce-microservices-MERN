const Wishlist = require('../Models/Wishlist');
const axios = require('axios');
const mongoose = require('mongoose');

exports.addToWishlist = async (req, res) => {
    try {
      const url = `mongodb+srv://${process.env.db_username}:${process.env.db_password}@ecom-avito-project-clus.omnkh3d.mongodb.net/${process.env.db_name}`;
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 30000,
        socketTimeoutMS: 45000
      });
  
      const { annonceId } = req.body;
      const userId = req.userId;
  
      const adDetailsResponse = await axios.get(`http://localhost:8001/annonces/${annonceId}`);
      const adDetails = adDetailsResponse.data;
  
      if (!adDetails) {
        return res.status(404).json({ message: 'Annonce not found' });
      }
  
      let wishlist = await Wishlist.findOne({ userId });
  
      if (!wishlist) {
        wishlist = new Wishlist({ userId, annonces: [{ annonce: adDetails }] });
      } else {
        const existingAdIndex = wishlist.annonces.findIndex(ad => ad.annonce._id === annonceId);
        if (existingAdIndex !== -1) {
          return res.status(400).json({ message: 'Annonce already in wishlist' });
        } else {
          wishlist.annonces.push({ annonce: adDetails });
        }
      }
  
      await wishlist.save();
      res.status(201).json({ message: 'Annonce added to wishlist successfully', wishlist });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getWishlist = async (req, res) => {
    try {
      const url = `mongodb+srv://${process.env.db_username}:${process.env.db_password}@ecom-avito-project-clus.omnkh3d.mongodb.net/${process.env.db_name}`;
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 30000,
        socketTimeoutMS: 45000
      });

      const userId = req.userId;
  
      const wishlist = await Wishlist.findOne({ userId });
  
      if (!wishlist) {
        return res.status(404).json({ message: 'Wishlist not found' });
      }
  
      res.status(200).json({ wishlist });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
};

exports.removeFromWishlist = async (req, res) => {
    try {
        const url = `mongodb+srv://${process.env.db_username}:${process.env.db_password}@ecom-avito-project-clus.omnkh3d.mongodb.net/${process.env.db_name}`;
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 30000,
            socketTimeoutMS: 45000
        });

        const userId = req.userId;
        const { annonceId } = req.body;

        let wishlist = await Wishlist.findOne({ userId });

        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        wishlist.annonces = wishlist.annonces.filter(item => item.annonce._id !== annonceId);

        await wishlist.save();
        res.status(200).json({ message: 'Annonce removed from wishlist successfully', wishlist });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.clearWishlist = async (req, res) => {
    try {
        const url = `mongodb+srv://${process.env.db_username}:${process.env.db_password}@ecom-avito-project-clus.omnkh3d.mongodb.net/${process.env.db_name}`;
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 30000,
            socketTimeoutMS: 45000
        });

        const userId = req.userId;

        let wishlist = await Wishlist.findOne({ userId });

        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        wishlist.annonces = [];

        await wishlist.save();
        res.status(200).json({ message: 'Wishlist cleared successfully', wishlist });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
