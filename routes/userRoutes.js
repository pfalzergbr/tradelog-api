//Package Requires
const express = require('express');
const mongoose = require('mongoose')

//Setup Router
const router = express.Router();
//Require Controllers
const userController = require('../controllers/userControllers')

//Fetch a user from the database
router.get('/:id', userController.getUser)
//Register a new user
router.post('/', userController.registerUser)
//Update user information
router.patch('/:id', userController.updateUser)
//Delete a user
router.delete('/:id', userController.deleteUser)

module.exports = router;