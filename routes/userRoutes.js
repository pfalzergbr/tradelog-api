//Package Requires
const express = require('express');
const mongoose = require('mongoose')

//Setup Router
const router = express.Router();

//Fetch a user from the database

router.get('/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`This should fetch user with id ${userId}`)
})

//Register a new user
router.post('/', (req, res) => {
    res.send('This should register a new user')
})

//Update user information
router.put('/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`This should update user information of user id ${userId}`)
})

//Delete a user
router.delete('/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`This should delete the user with id ${userId}`)
})


module.exports = router;