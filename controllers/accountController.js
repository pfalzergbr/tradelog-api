const { validationResult } = require('express-validator');
//Require utilities
const HttpError = require('../models/http-error');
const bcrypt = require('bcrypt');
const generateAuthToken = require('../utils/generateAuthToken');
// Require DB
const pool = require('../db/db.js');


////////////////////////////////
// POST '/api/accounts
// Create a new strategy for an existing User.
////////////////////////////////

exports.createAccount = async (req, res) => {
    const user_id = req.user.user_id;
    const { accountName, balance, description} = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO accounts (account_name, balance, description, user_id) VALUES($1, $2, $3, $4) RETURNING *',
            [accountName, balance, description, user_id],
        );
        const account = result.rows[0];
        res.status(200).send(account);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

////////////////////////////////
// GET '/api/user/accounts
// Get trading accounts for user.
////////////////////////////////

exports.getAccounts = async (req, res) => {
    const user_id = req.user.user_id;

    try {
        const result = await pool.query(
            'SELECT * FROM accounts WHERE user_id = $1',
            [user_id])
        const accounts = result.rows;
        res.status(200).send({accounts});
    } catch (error) {
        res.status(500).send(error.message);
    }
};

////////////////////////////////
// GET '/api/user/accounts/:id
// Get a single trading account
////////////////////////////////

exports.getSingleAccount = async (req, res) => {
    const account_id = req.params.accountId;
    try {
        const result = await pool.query(
            'SELECT * FROM accounts WHERE account_id = $1',
            [account_id])
        const account = result.rows[0];
        res.status(200).send(account);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

////////////////////////////////
// PATCH '/api/user/accounts/:id
// Get a single trading account
////////////////////////////////

exports.updateAccount = async (req, res) => {
    // const _id = req.params.accountId;
    // try {
    //     const account = await Account.findByIdAndUpdate({ _id }, req.body);
    //     const updatedAccount = await Account.findOne({_id})
    //     res.status(200).send(updatedAccount)
    // } catch (errror) {
    //     res.status(500).send(error.message)
    // }
};

////////////////////////////////
// Delete '/api/user/accounts/:id
// Delete a sincle trading account.
////////////////////////////////

exports.deleteAccount = async (req, res) => {
    // const _id = req.params.accountId;
    // try {
    //     const account = await Account.findByIdAndDelete({ _id });
    //     res.status(200).send({_id})
    // } catch (errror) {
    //     res.status(500).send(error.message)
    // }
};