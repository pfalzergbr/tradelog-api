const { validationResult } = require('express-validator')

//Require Models
const User = require('../models/user')
const HttpError = require('../models/http-error')

// GET '/api/user/profile'
//Fetch a user from the database
exports.getProfile = async (req, res) => {
    const _id = req.user._id;
    try {
        const user = await User.find({_id})
        res.send(user)
    } catch (error) {
        res.status(400).send(error.message)
    }

}
////////////////////////////////
// POST '/api/user/'
//Register a new user
////////////////////////////////
exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    // Check for validation errors
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data', 422));
    }
    //Check if e-mail address is already taken. 
    const email = req.body.email;
    let existingUser;
    try {
        existingUser = await User.findOne({email});
    } catch (error) {
        return next(new HttpError('Registration failed, please try again later', 500));
    }

    if (existingUser) {
        return next( new HttpError('E-mail address is already registered, please log.', 422));
    }

    //Create a new user based on the User model, spreading the request body. 
    const user = new User({
            ...req.body
    })

    //Create a new JWT token, and saves the user into the database. Returns a user object with a name
    //and Id, and the token for the front-end. 
    try {
        const token = await user.generateAuthToken();
        await user.save();
        console.log(user, token)
        res.status(201).send({ user: {userId: user._id, userName: user.name}, token });
    } catch (error) {
        res.status(400).send(error.message);
    }
}


////////////////////////////////
// POST '/api/user/login'
//Log in a user
////////////////////////////////

exports.loginUser = async (req, res) => {
    //Destructure password from the body of the request
    const { email, password } = req.body;

    try {
        //Search for user with password and email. If there is a result, generate an Auth token.
        //Send it back with a response.
        const user = await User.findByCredentials(email, password);
        const token = await user.generateAuthToken();
        res.status(200).send({ user: {userId: user._id, userName: user.name}, token });

    } catch (error) {
        res.status(400).send();
    }
}


// POST '/api/user/logout'
//Log out a user from the app.
exports.logoutUser = async (req, res) => {
    console.log('Main function runs', req.user)
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.status(200).send('Logged out')
    } catch (error) {
        res.status(500).send()
    }
}


// PATCH '/api/user/profile
//Update user information
exports.updateUser = async (req, res) => {
    const _id = req.user.id;
    try {
        //Finds the user and update based on request body. 
        const user = await User.findByIdAndUpdate({_id}, req.body)
        //Finds the update user
        const newUser = await User.findOne({_id});
        res.send(newUser)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

// DELETE '/api/user/profile
//Delete a user
exports.deleteUser = async(req, res) => {
    const _id = req.user._id;

    try {
        const user  = await User.findOneAndRemove({_id})
        res.send(user)
    } catch (error) {
        res.status(400).send(error.message)
    }

}