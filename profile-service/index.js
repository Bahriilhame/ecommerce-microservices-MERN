const express = require('express');
require('dotenv').config();
const profilehRoutes = require('./Routes/profileRoutes');

const app = express();

app.use(express.json());

app.use('/profile', profilehRoutes);

const PORT = 8003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
