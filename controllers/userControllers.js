//Require Models

const User = require('../models/user')


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

// POST '/api/user/'
//Register a new user
exports.registerUser = async (req, res) => {
        const user = new User({
            ...req.body
        })
    try {
        const token = await user.generateAuthToken();
        await user.save();
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// POST '/api/user/login'
//Log in a user
exports.loginUser = async (req, res) => {
    //Destructure password from the body of the request
    const { email, password } = req.body;

    try {
        //Search for user with password and email. If there is a result, generate an Auth token.
        //Send it back with a response.
        const user = await User.findByCredentials(email, password);
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});

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