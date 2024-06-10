const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
      const token = req.headers.authorization.split(' ')[1];
  
    jwt.verify(token, "secret-key", (err, decoded) => {
      if (err) return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      req.userId = decoded.id;
      next();
    });
  };

module.exports = verifyToken;
