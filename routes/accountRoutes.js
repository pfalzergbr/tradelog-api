//Package Requires
const express = require('express');
const { body } = require('express-validator');
const auth = require('../middleware/auth');
const { checkValidation } = require('../middleware/check-Validation');

const accountController = require('../controllers/accountController');
const router = express.Router();
// ------------------ ACCOUNTS ------------------------

//Create a new trading account for a user
router.post(
    '/',
    auth,
    [
        body('accountName').not().isEmpty().trim(),
        body('balance').not().isEmpty().isFloat(),
        body('description').not().isEmpty().isString(),
    ], checkValidation,
    accountController.createAccount,
);
//Get a single trading account.
router.get('/:accountId', auth, accountController.getSingleAccount);
//Update a single trading account
router.patch(
    '/:accountId',
    auth,
    [
        body('accountName').not().isEmpty().trim(),
        body('balance').isEmpty(),
        body('description').not().isEmpty().isString(),
    ], checkValidation,
    accountController.updateAccount,
);

//TODO - ADD VALIDATION

//Delete a single trading account.
router.delete('/:accountId', auth, accountController.deleteAccount);

//Get all accounts associated with the user. Id decoded from JWT.
router.get('/', auth, accountController.getAccounts);

module.exports = router;
