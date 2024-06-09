const express = require('express');
const bodyParser = require('body-parser');
const orderRoutes = require('./Routes/OrderRoutes');
const dotenv = require('dotenv');
dotenv.config()
const cors = require('cors');

const app = express();
app.use(cors());

app.use(bodyParser.json());

app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});