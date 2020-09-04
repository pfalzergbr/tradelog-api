//Requires
const jwt = require('jsonWebtoken');
const User = require('../models/user')

//Enviromental Variables
const jwtSecret = process.env.JWT_SECRET

//Authentication middleware
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        console.log(token)
        const decoded = jwt.verify(token, jwtSecret )
        console.log(decoded)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token})
        if (!user) {
            throw new Error()
        }
        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({error: 'Authentication required'})
    }
}


module.exports = auth