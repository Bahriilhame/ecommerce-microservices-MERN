// const mongoose = require('mongoose');
// require('dotenv').config();

const connectDB = async (username,password,dbName) => {
  try {
    const url = `mongodb+srv://${username}:${password}@ecom-avito-project-clus.omnkh3d.mongodb.net/${dbName}`;
    await mongoose.connect(url);
    console.log(process.env.db_username);

    console.log('MongoDB Atlas connected');
  } catch (error) {
    console.log(process.env.db_username);
    console.error('Error connecting to MongoDB Atlas:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
