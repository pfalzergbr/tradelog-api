//Require Models

const User = require('../models/user')

//Fetch a user from the database
exports.getUser = (req, res) => {
    const userId = req.params.id;
    res.send(`This should fetch user with id ${userId}`)
}
//Register a new user
exports.registerUser = (req, res) => {
    res.send('This should register a new user')
}
//Update user information
exports.updateUser = (req, res) => {
    const userId = req.params.id;
    res.send(`This should update user information of user id ${userId}`)
}
//Delete a user
exports.deleteUser = (req, res) => {
    const userId = req.params.id;
    res.send(`This should delete the user with id ${userId}`)
}