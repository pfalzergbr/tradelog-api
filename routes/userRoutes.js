//Package Requires
const express = require('express');
const { body } = require('express-validator');
const auth = require('../middleware/auth');
const { validation } = require('../middleware/validation')

//Setup Router
const router = express.Router();
//Require Controllers
const userController = require('../controllers/userControllers');


//------------------ LOGIN, REGISTRATION ------------

//Register a new user
router.post(
    '/',
    [
        body('name').not().isEmpty().trim(),
        body('email').isEmail().trim().normalizeEmail(),
        body('password').isLength({ min: 6 }).trim(),
        body('verify').isLength({ min: 6 }),
    ], validation, 
    userController.registerUser,
);

//Log in a user
router.post(
    '/login',
    [
        body('email').isEmail().trim().normalizeEmail(),
        body('password').isLength({ min: 6 }).trim(),
    ], validation,
    userController.loginUser,
);

// ------------------ PROFILE INFO UPDATE AND DELETE ----------------

//Update user information
//TODO - ADD VALIDATION
router.patch('/profile', auth, userController.updateUser);
//Fetch a user from the database
router.get('/profile', auth, userController.getProfile);
//Delete a user
router.delete('/profile', auth, userController.deleteUser);

module.exports = router;
