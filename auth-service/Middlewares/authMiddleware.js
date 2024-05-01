const jwt = require('jsonwebtoken');
const User = require('../Models/User');
require('dotenv').config();
const mongoose=require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

const authMiddleware = async (req, res, next) => {
  try {
    const url = `mongodb+srv://${process.env.db_username}:${process.env.db_password}@ecom-avito-project-clus.omnkh3d.mongodb.net/auth-service`;
    console.log(url);
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000
    });
    console.log("hhh", url);

    const token = req.header('Authorization').replace('Bearer ', '');
    console.log(token);

    // Vérifier si le token est valide
    const decoded = jwt.verify(token, "secret-key");
    console.log(decoded);

    // Trouver l'utilisateur correspondant dans la base de données
    const user = await User.findOne({ _id: decoded.id });
    console.log(user);

    if (!user) {
      throw new Error();
    }

    // Vérifier le rôle de l'utilisateur
    if (user.role !== 'vendeur') {
        return res.status(401).json({ message: 'You are Unauthorized' });
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized midlleware' });
  }
};

module.exports = authMiddleware;
