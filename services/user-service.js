const userDb = require('../db/user-db');

exports.checkIsEmailRegistered = async (email) => {

        const user = await userDb.findUserByEmail(email);

        if (user.length !== 0) {
            const error = new Error();
            error.message = 'E-mail already registered, please log in';
            error.code = '422';
            throw new Error(error.message);
        }
};

exports.verifyPassword = (password, verify) => {
    if (password !== verify) {
        const error = new Error();
        error.message = 'Password and re-type password don`t match. Please Try again';
        error.code = '422';
        throw new Error(error.message);
    }
}

exports.createUser = async (userData) => {
    const user = await userDb.insertUser(userData);
    return user;
}