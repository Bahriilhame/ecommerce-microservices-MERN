const express = require('express');
const bodyParser = require('body-parser');
const cartRoutes = require('./Routes/CartRoutes');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
dotenv.config()

app.use(cors());
app.use(bodyParser.json());

app.use('/api/cart', cartRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
