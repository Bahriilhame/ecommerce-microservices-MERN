const express = require('express');
const connectDB = require('../DBConnection/db');
require('dotenv').config();

const app = express();

// Connect to MongoDB Atlas
connectDB(process.env.db_username,process.env.db_password,process.env.db_name)

const categorieRoutes = require('./Routes/categorieRoutes');

app.use(express.json());

app.use('/categories', categorieRoutes);

const PORT = 8001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
