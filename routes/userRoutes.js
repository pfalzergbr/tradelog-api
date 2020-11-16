//Package Requires
const express = require('express');
const { body } = require('express-validator');
const auth = require('../middleware/auth');

//Setup Router
const router = express.Router();
//Require Controllers
const userController = require('../controllers/userControllers');

//Register a new user
router.post(
    '/',
    [
        body('name').not().isEmpty().trim(),
        body('email').isEmail().trim().normalizeEmail(),
        body('password').isLength({ min: 6 }).trim(),
        body('verify').isLength({ min: 6 }),
    ],
    userController.registerUser,
);

//Log in a user
router.post(
    '/login',
    [
        body('email').isEmail().trim().normalizeEmail(),
        body('password').isLength({ min: 6 }).trim(),
    ],
    userController.loginUser,
);

//Create a new trading account for a user
router.post(
    '/accounts',
    auth,
    [
        body('accountName').not().isEmpty().trim(),
        body('balance').not().isEmpty().isFloat(),
        body('description').not().isEmpty().isString(),
    ],
    userController.createAccount,
);

//Update user information
router.patch('/profile', auth, userController.updateUser);
//Fetch a user from the database
router.get('/profile', auth, userController.getProfile);
//Delete a user
router.delete('/profile', auth, userController.deleteUser);

module.exports = router;
