//Requires
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const userDA = require('../dataAccess/user')

//Enviromental Variables
const jwtSecret = keys.JWT_SECRET;

//Authentication middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, jwtSecret);
    const user = await userDA.findUserById(decoded)

    // console.log(result)

    // const user = result.rows[0];

    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;

    next();
  } catch (error) {
    res.status(401).send({ error: 'Authentication required' });
  }
};

module.exports = auth;
