// Require DB
const pool = require('../db/db.js');
const accountService = require('../services/account-service');
// POST '/api/accounts
// Create a new account for an existing User.

exports.createAccount = async (req, res, next) => {
    const { user_id } = req.user;
    const { accountName: account_name, balance, description } = req.body;

    try {
        const account = await accountService.createNewAccount(user_id, {
            account_name,
            balance,
            description,
        });
        res.status(200).send(account);
    } catch (error) {
        return next(error);
    }
};

// GET '/api/user/accounts
// Get trading accounts for user.

exports.getAccounts = async (req, res, next) => {
    const { user_id } = req.user;

    try {
        const accounts = await accountService.getAccounts(user_id);
        res.status(200).send({ accounts });
    } catch (error) {
        return next(error);
    }
};

// GET '/api/user/account/:id
// Get a single trading account

exports.getSingleAccount = async (req, res, next) => {
    const { user_id } = req.user;
    const { accountId: account_id } = req.params;

    try {
        const account = await accountService.getOneAccount(user_id, account_id);
        res.status(200).send(account);
    } catch (error) {
        return next(error);
    }
};

// PATCH '/api/user/accounts/:id
// Get a single trading account

exports.updateAccount = async (req, res, next) => {
    const { user_id } = req.user;
    const { accountId: account_id } = req.params;
    const { accountName: account_name, description } = req.body;

    try {
        const updatedAccount = await accountService.updateAccount(user_id, {
            account_id,
            account_name,
            description,
        });
        res.status(200).send(updatedAccount);
    } catch (error) {
        return next(error);
        // res.status(500).send(error.message);
    }
};

// Delete '/api/user/accounts/:id
// Delete a single trading account.

exports.deleteAccount = async (req, res) => {
    // const _id = req.params.accountId;
    // try {
    //     const account = await Account.findByIdAndDelete({ _id });
    //     res.status(200).send({_id})
    // } catch (errror) {
    //     res.status(500).send(error.message)
    // }
};
