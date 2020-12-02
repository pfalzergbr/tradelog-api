const accountDb = require('../db/account-db');

exports.createNewAccount = async (userId, accountData) => {
    const account = await accountDb.insertNewAccount(userId, accountData);
    return account;
};

exports.getAccounts = async (userId) => {
    const accounts = await accountDb.findAccountsByUserId(userId);
    return accounts;
};

exports.getOneAccount = async (userId, accountId) => {
    const account = await accountDb.findAccountById(userId, accountId);

    if (!account) {
        const error = new Error();
        error.message = 'Account not found';                
        error.code = '404';
        throw new Error(error.message);
    }

    return account;
};

exports.updateAccount = async (userId, updatedData) => {
    const updatedAccount = await accountDb.updateAccountById(userId, updatedData);

        if (!updatedAccount) {
            const error = new Error();
            error.message = 'Cannot update. Account not found';                
            error.code = '404';
            throw new Error(error.message);
        }
        return updatedAccount;
}

exports.deleteAccount = async (account_id, user_id) => {
    const deletedAccount = await accountDb.deleteAccountById(account_id, user_id);
    
    if (!deletedAccount) {
        const error = new Error();
        error.message = 'Cannot delete. Account not found';                
        error.code = '404';
        throw new Error(error.message);
    }
    return deletedAccount;
}
