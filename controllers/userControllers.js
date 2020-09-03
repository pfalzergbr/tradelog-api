//Require Models

const User = require('../models/user')

//Fetch a user from the database
exports.getUser = async (req, res) => {
    const _id = await req.params.id;
    try {
        const user = await User.find({_id})
        res.send(user)
    } catch (error) {
        res.status(400).send(error.message)
    }

}
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

exports.logoutUser = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) =>{
            return token.token !== req.token
        })
        await req.user.save()
        res.status(200).send('Logged out')
    } catch (error) {
        res.status(500).send()
    }
}


//Update user information
exports.updateUser = async (req, res) => {
    const _id = req.params.id;
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

//Delete a user
exports.deleteUser = async(req, res) => {
    const _id = req.params.id;

    try {
        const user  = await User.findOneAndRemove({_id})
        res.send(user)
    } catch (error) {
        res.status(400).send(error.message)
    }

}