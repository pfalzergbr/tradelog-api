//Package Requires
const express = require('express');
const { body } = require('express-validator');
const auth = require('../middleware/auth');

//Setup Router
const router = express.Router();
//Require Controllers

const {
    createAccount,
    updateAccount,
    getSingleAccount,
    deleteAccount,
    getAccounts,
} = require('../controllers/accountController');

// ------------------ ACCOUNTS ------------------------

//Create a new trading account for a user
router.post(
    '/',
    auth,
    [
        body('accountName').not().isEmpty().trim(),
        body('balance').not().isEmpty().isFloat(),
        body('description').not().isEmpty().isString(),
    ],
    createAccount,
);
//Get a single trading account.
router.get('/:accountId', auth, getSingleAccount);
//Update a single trading account
router.patch(
    '/:accountId',
    auth,
    [
        body('accountName').not().isEmpty().trim(),
        body('balance').isEmpty(),
        body('description').not().isEmpty().isString(),
    ],
    updateAccount,
);

//TODO - ADD VALIDATION

//Delete a single trading account.
router.delete('/:accountId', auth, deleteAccount);

//Get all accounts associated with the user. Id decoded from JWT.
router.get('/', auth, getAccounts);

module.exports = router;
