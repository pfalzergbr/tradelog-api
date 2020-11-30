const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const generateAuthToken = ( user ) => {
    const token = jwt.sign({user_id: user_id}, jwtSecret, {expiresIn: '2d'})
    return token;
}


module.exports = generateAuthToken;