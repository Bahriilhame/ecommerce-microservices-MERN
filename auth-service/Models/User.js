const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  lname: {
    type: String,
    required: true
  },
  fname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema,"users");

module.exports = User;
