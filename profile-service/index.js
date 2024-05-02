const express = require('express');
require('dotenv').config();
const profilehRoutes = require('./Routes/profileRoutes');
const cors = require('cors');

const app = express();

app.use(express.json());

// Allow requests from all origins
app.use(cors());

app.use('/api', profilehRoutes);

const PORT = 8003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
