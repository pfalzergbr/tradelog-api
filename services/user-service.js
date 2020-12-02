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
