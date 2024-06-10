const express = require('express');
const bodyParser = require('body-parser');
const wishlistRoutes = require('./Routes/WishlistRoutes');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
dotenv.config()

app.use(cors());
app.use(bodyParser.json());

app.use('/api/wishlist', wishlistRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
