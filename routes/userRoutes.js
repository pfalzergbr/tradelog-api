//Package Requires
const express = require('express');
const mongoose = require('mongoose')
const auth = require('../middleware/auth')

//Setup Router
const router = express.Router();
//Require Controllers
const userController = require('../controllers/userControllers')

//Fetch a user from the database
router.get('/:id', userController.getUser)
//Register a new user
router.post('/', userController.registerUser)
//Log in a user
router.post('/login', userController.loginUser)
//Log out a user
router.post('/logout', auth, userController.logoutUser)
//Update user information
router.patch('/:id', userController.updateUser)
//Delete a user
router.delete('/:id', userController.deleteUser)

module.exports = router;