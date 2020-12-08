const bcrypt = require('bcrypt');
const generateAuthToken = require('../utils/generateAuthToken');
const userService = require('../services/user-service');
const accountService = require('../services/account-service')

// GET '/api/user/profile'
exports.getProfile = async (req, res, next) => {
    const { user_id } = req.user;

    try {
        const user = await userService.getUserProfile(user_id);

        res.status(200).send({ user: user });
    } catch (error) {
        return next(error);
    }
};

// POST '/api/user/'
exports.registerUser = async (req, res, next) => {
    const { name, email, password, verify } = req.body;

    try {
        await userService.checkIsEmailRegistered(email);
        userService.verifyPassword(password, verify);
        const hashedPassword = await bcrypt.hash(password, 8);
        const user = await userService.createUser({
            name,
            email,
            hashedPassword,
        });
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
exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await userService.checkLoginEmail(email);
        await userService.checkHashedPassword(password, user.user_password);
        const token = await generateAuthToken(user);
        const accounts = await accountService.getAccounts(user.user_id)

        // const accountsField = user.accounts.map(account => { return {_id: account._id, accountName: account.accountName} })
        res.status(200).send({
            user: {
                userId: user.user_id,
                userName: user.user_name /*accounts: accountsField*/,
            },
            accounts: accounts,
            token,
            
        });
    } catch (error) {
        return next(error);
    }
};

// PATCH '/api/user/profile
exports.updateUser = async (req, res, next) => {
    const { user_id } = req.user;
    const { name } = req.body;

    try {
        const user = await userService.updateUserProfile(user_id, { name });
        res.status(200).send(user);
    } catch (error) {
        return next(error);
    }
};

// DELETE '/api/user/profile
//TODO - build a PROTECT SHOWCASE function to make some users undeletable.
exports.deleteUser = async (req, res, next) => {
    const { user_id } = req.user;
    try {
        const user = await userService.deleteUser(user_id);
        res.status(200).send({ message: 'User deleted', user });
    } catch (error) {
        return next(error);
    }
};
