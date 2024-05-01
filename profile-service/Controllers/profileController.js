const axios = require('axios');

// get profil
exports.getUserProfile = async (req, res) => {
  try {
    const response = await axios.get('http://localhost:8002/api/profile', {
      headers: {
        Authorization: req.headers.authorization
      }
    });
    
    const user = response.data;
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update profile
exports.updateUserProfile = async (req, res) => {
  try {
    const response = await axios.put(
      'http://localhost:8002/api/profile/update',
      req.body,
      { headers: { Authorization: req.headers.authorization } }
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else if (error.request) {
      res.status(500).json({ message: 'No response received from authentication service' });
    } else {
      res.status(500).json({ message: 'Error setting up request to authentication service' });
    }
  }
};
