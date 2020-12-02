const userDb = require('../db/user-db');
const bcrypt = require('bcrypt');

exports.checkIsEmailRegistered = async (email) => {
    const user = await userDb.findUserByEmail(email);
    if (user) {
        const error = new Error();
        error.message = 'E-mail already registered, please log in';
        error.code = '422';
        throw new Error(error.message);
    }
};

exports.verifyPassword = (password, verify) => {
    if (password !== verify) {
        const error = new Error();
        error.message =
            'Password and re-type password don`t match. Please Try again';
        error.code = '422';
        throw new Error(error.message);
    }
};

exports.createUser = async (userData) => {
    const user = await userDb.insertUser(userData);
    return user;
};

exports.checkLoginEmail = async (email) => {
    const user = await userDb.findUserByEmail(email);
    // console.log(user)
    if (!user) {
        const error = new Error();
        error.message = 'Unable to log in';
        error.code = '422';
        throw new Error(error.message);
    }
    return user;
};

exports.checkHashedPassword = async (password, userPassword) => {
    const isMatch = await bcrypt.compare(password, userPassword);

    if (!isMatch) {
        throw new Error('Unable to login');
    }
};


exports.getUserProfile = async (userId) => {
    const user = await userDb.findUserById(userId);
    delete user.user_password;
    return user;
}

exports.updateUserProfile = async (userId, update) => {
    const user = await userDb.updateUserById(userId, update);
    return user;
}

exports.deleteUser = async (userId) => {
    const user = await userDb.deleteUserById(userId);
    return user;
}