const express = require('express');
// const connectDB = require('../DBConnection/db');
require('dotenv').config();
const authRoutes = require('./Routes/authRoutes');

const app = express();

// Connect to MongoDB Atlas
// connectDB(process.env.db_username,process.env.db_password,process.env.db_name)

app.use(express.json());

app.use('/auth', authRoutes);

const PORT = 8002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
