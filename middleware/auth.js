//Requires
const jwt = require('jsonwebtoken');
const User = require('../models/user')

//Enviromental Variables
const jwtSecret = process.env.JWT_SECRET

//Authentication middleware
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, jwtSecret )

        // TODO - REMAKE FROM MONGOOSE TO POSTGRES

        // OLD CODE - MONGOOSE
        // const user = await User.findOne({ user_id: decoded.user_id})
        // if (!user) {
        //     throw new Error()
        // }
        // req.token = token;
        // req.user = user;


        next();
    } catch (error) {
        res.status(401).send({error: 'Authentication required'})
    }
}


module.exports = auth

