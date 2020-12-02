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
        res.status(200).send({message: 'Account updated', updatedAccount});
    } catch (error) {
        return next(error);
    }
};

// Delete '/api/user/accounts/:id
exports.deleteAccount = async (req, res, next) => {
    const { accountId: account_id} = req.params;
    const { user_id } = req.user;
    try {
        const deletedAccount = await accountService.deleteAccount(account_id, user_id)
        res.status(200).send({ message: 'Account deleted', deletedAccount})
    } catch (error) {
        return next(error);
    }
};
