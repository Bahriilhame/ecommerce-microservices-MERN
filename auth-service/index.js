const express = require('express');
// const connectDB = require('../DBConnection/db');
require('dotenv').config();
const authRoutes = require('./Routes/authRoutes');
const apiRoutes = require('./Routes/apiRoutes');
const cors = require('cors');

const app = express();

// Connect to MongoDB Atlas
// connectDB(process.env.db_username,process.env.db_password,process.env.db_name)

app.use(express.json());

// Allow requests from all origins
app.use(cors());

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

const PORT = 8002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
