const express = require('express');
const { body } = require('express-validator');
const auth = require('../middleware/auth');
const { checkValidation } = require('../middleware/check-validation');
//Setup Router
const router = express.Router();
const userController = require('../controllers/userControllers');

//------------------ LOGIN, REGISTRATION ------------

//Register a new user -- COMPLETE
router.post(
  '/',
  [
    body('name').not().isEmpty().trim(),
    body('email').isEmail().trim().normalizeEmail(),
    body('password').isLength({ min: 6 }).trim(),
    body('verify').isLength({ min: 6 }),
  ],
  checkValidation,
  userController.registerUser,
);

//Log in a user -- TODO: add fetching accounts
router.post(
  '/login',
  [
    body('email').isEmail().trim().normalizeEmail(),
    body('password').isLength({ min: 6 }).trim(),
  ],
  checkValidation,
  userController.loginUser,
);

// ------------------ PROFILE INFO UPDATE AND DELETE ----------------

//Fetch a user from the database - Complete
router.get('/profile', auth, userController.getProfile);

router.get('/userdata', auth, userController.getUserData);
//Update user information
router.patch(
  '/profile',
  [body('name').not().isEmpty().trim()],
  auth,
  checkValidation,
  userController.updateUser,
);
//Delete a user - Complete
router.delete('/profile', auth, userController.deleteUser);

module.exports = router;
