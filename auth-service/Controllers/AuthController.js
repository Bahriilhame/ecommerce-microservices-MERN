const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const mongoose=require("mongoose")
require('dotenv').config();

// Fonction pour générer un token JWT
function generateToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role
  };
  const options = {
    expiresIn: '1h'
  };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

// Service d'inscription (register)
exports.registerUser = async (req, res) => {
  try {
    const url = `mongodb+srv://${process.env.db_username}:${process.env.db_password}@ecom-avito-project-clus.omnkh3d.mongodb.net/${process.env.db_name}`;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000
    });

    const { lname, fname, email, password, phone,role } = req.body;

    // Vérification si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hashage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création d'un nouvel utilisateur
    const newUser = new User({
      lname,
      fname,
      email,
      password: hashedPassword,
      phone,
      role
    });

    // Sauvegarde de l'utilisateur dans la base de données
    await newUser.save();

    // Génération du token JWT
    const token = generateToken(newUser);

    // Retourner l'utilisateur et le token JWT
    res.status(201).json({ token, user: newUser});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Service de connexion (login)
exports.loginUser = async (req, res) => {
  try {
    const url = `mongodb+srv://${process.env.db_username}:${process.env.db_password}@ecom-avito-project-clus.omnkh3d.mongodb.net/${process.env.db_name}`;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000
    });

    const { email, password } = req.body;

    // Recherche de l'utilisateur par email dans la base de données
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Vérification du mot de passe
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Génération du token JWT
    const token = generateToken(user);

    // Retourner l'utilisateur et le token JWT
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};