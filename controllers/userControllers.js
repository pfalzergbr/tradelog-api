const { validationResult } = require('express-validator');
//Require utilities
const HttpError = require('../models/http-error');
const bcrypt = require('bcrypt');
const generateAuthToken = require('../utils/generateAuthToken');
// Require DB
const pool = require('../db/db.js');

// GET '/api/user/profile'
//Fetch a user from the database, sends the user object back for the frontend.

exports.getProfile = async (req, res) => {};

// POST '/api/user/'
//Register a new user

exports.registerUser = async (req, res, next) => {
    // const errors = validationResult(req);
    // // Check for validation errors
    // if (!errors.isEmpty()) {
    //     return next(
    //         new HttpError('Invalid inputs passed, please check your data', 422),
    //     );
    // }
    //Check if e-mail address is already taken.
    const { name, email, password, verify } = req.body;

    let existingUser;
    try {
        const result = await pool.query(
            'SELECT * FROM "users" WHERE user_email = $1',
            [email],
        );
        existingUser = result.rows;
    } catch (error) {
        return next(
            new HttpError('Registration failed, please try again later', 500),
        );
    }
    if (existingUser.length !== 0) {
        return next(
            new HttpError(
                'E-mail address is already registered, please log.',
                422,
            ),
        );
    }
    //Checks if password and password verification are equal.
    if (password !== verify) {
        return next(
            new HttpError(
                'Password doesn`t match with confirmation, please check.',
                422,
            ),
        );
    }
    //Hashes the password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 8);
    //Create a new user in the database, based on the recieved input.
    let user;
    try {
        const result = await pool.query(
            'INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING user_id, user_name, user_email',
            [name, email, hashedPassword],
        );
        user = {
            ...result.rows[0],
        };
        console.log(user);
    } catch (error) {
        return next(
            new HttpError(
                'Cannot create new user. Please try again later',
                500,
            ),
        );
    }
    //Create a new JWT token, and saves the user into the database. Returns a user object with a name
    //and Id, and the token for the front-end.
    try {
        const token = await generateAuthToken(user);

        res.status(201).send({
            user: {
                userId: user.user_id,
                userName: user.user_name,
                // accounts: user_accounts,
            },
            token,
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// POST '/api/user/login'
//Log in a user

//TODO wire in accounts

exports.loginUser = async (req, res) => {
    //Destructure password from the body of the request
    const { email, password } = req.body;
    try {
        //Search for user with password and email. If there is a result, generate an Auth token.
        //Send it back with a response.
        const response = await pool.query(
            'SELECT * FROM users WHERE user_email = $1',
            [email],
        );
        const user = response.rows[0];
        //Check if there is a user, throw an error if not found
        if (response.rows.length === 0) {
            throw new Error('Unable to login');
        }
        console.log(user);
        //Check password,
        const isMatch = await bcrypt.compare(password, user.user_password);
        // Throw an error if not matching
        if (!isMatch) {
            throw new Error('Unable to login');
        }
        const token = await generateAuthToken(user);

        // const accountsField = user.accounts.map(account => { return {_id: account._id, accountName: account.accountName} })
        res.status(200).send({
            user: {
                userId: user.user_id,
                userName: user.user_name /*accounts: accountsField*/,
            },
            token,
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// PATCH '/api/user/profile
//Update user information

// TODO!!

exports.updateUser = async (req, res) => {
    try {
        //Finds the user and update based on request body, returns updated row.
        const result = await pool.query(
            'UPDATE users SET user_name = $1 WHERE user_id = $2 RETURNING user_id, user_name',
            [req.body.userName, req.user.user_id],
        );
        const user = result.rows[0];
        res.send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// DELETE '/api/user/profile
//Delete a user

//TODO - tidy up and doublecheck
exports.deleteUser = async (req, res) => {
    // const _id = req.user._id;
    // try {
    //     const user = await User.findOneAndRemove({ _id });
    //     res.status(200).send(user);
    // } catch (error) {
    //     res.status(400).send(error.message);
    // }
};
