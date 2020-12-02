const bcrypt = require('bcrypt');
const generateAuthToken = require('../utils/generateAuthToken');

const pool = require('../db/db.js');
const userService = require('../services/user-service');

// GET '/api/user/profile'
//Fetch a user from the database, sends the user object back for the frontend.

exports.getProfile = async (req, res) => {};

// POST '/api/user/'
//Register a new user

exports.registerUser = async (req, res, next) => {
    const { name, email, password, verify } = req.body;

    try {
        await userService.checkIsEmailRegistered(email);
        userService.verifyPassword(password, verify);
        const hashedPassword = await bcrypt.hash(password, 8);

        const userData = { name, email, hashedPassword };
        const user = await userService.createUser(userData);

        const token = await generateAuthToken(user);

        res.status(201).send({
            user: {
                userId: user.user_id,
                userName: user.user_name,
                accounts: [],
            },
            token,
        });
    } catch (error) {
        return next(error);
    }
};

// POST '/api/user/login'
//Log in a user

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userService.checkLoginEmail(email);
        await userService.checkHashedPassword(password, user.user_password);
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
