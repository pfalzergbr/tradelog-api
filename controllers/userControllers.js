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
    try {
        const user = await User.create(req.body);
        res.send(user)
    } catch (error) {
        res.status(400).send(error.message);
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