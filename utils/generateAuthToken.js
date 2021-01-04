const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const jwtSecret = keys.JWT_SECRET;

const generateAuthToken = user => {
  const token = jwt.sign(
    { user_id: user.user_id },
    jwtSecret /*{expiresIn: '2d'}*/,
  );
  return token;
};

module.exports = generateAuthToken;
