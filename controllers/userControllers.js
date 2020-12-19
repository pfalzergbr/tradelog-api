const bcrypt = require('bcrypt');
const generateAuthToken = require('../utils/generateAuthToken');
const userService = require('../services/user-service');
const accountService = require('../services/account-service')
const strategyService = require('../services/strategy-service')

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

// Sending account and strategy data for the frontend, to use populating Redux store on strartup.
exports.getUserData = async (req, res, next) => {
    const {user_id} = req.user;
    const userData = await userService.getUserData(user_id);

    try {
        res.status(200).send(userData)
    } catch (error) {
        return next(error);
    }
}

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
        //TODO - get account information with one single call later - new db service
        const accounts = await accountService.getAccounts(user.user_id);
        const strategies = await strategyService.getUserStrategies(user.user_id)
        res.status(200).send({
            user: {
                userId: user.user_id,
                userName: user.user_name /*accounts: accountsField*/,
            },
            accounts,
            strategies,
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
