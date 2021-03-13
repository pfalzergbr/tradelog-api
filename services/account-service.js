// const accountDb = require('../db/account-db');
const tradeDb = require('../db/trade-db');
const strategyDb = require('../db/strategy-db')
const accountDA = require('../dataAccess/account');

exports.createNewAccount = async (userId, accountData) => {
  const account = await accountDA.insertNewAccount(userId, accountData);

  const strategyData = {
    strategy_name: 'No strategy',
    account_id: account.account_id,
    description: 'Trades without assigned strategies',
    is_default: true
  }

  const strategy = await strategyDb.insertNewStrategy(userId, strategyData);
  return { account, strategy };
};

exports.getAccounts = async userId => {
  const accounts = await accountDA.findAccountsByUserId(userId);
  return accounts;
};

exports.getOneAccount = async (userId, accountId) => {
  const account = await accountDA.findAccountById(userId, accountId);

  if (!account) {
    const error = new Error();
    error.message = 'Account not found';
    error.code = '404';
    throw new Error(error.message);
  }

  return account;
};

exports.updateAccount = async (userId, updatedData) => {
  const updatedAccount = await accountDA.updateAccountById(userId, updatedData);

  if (!updatedAccount) {
    const error = new Error();
    error.message = 'Cannot update. Account not found';
    error.code = '404';
    throw new Error(error.message);
  }
  return updatedAccount;
};

exports.deleteAccount = async (account_id, user_id) => {
  const deletedAccount = await accountDA.deleteAccountById(account_id, user_id);

  if (!deletedAccount) {
    const error = new Error();
    error.message = 'Cannot delete. Account not found';
    error.code = '404';
    throw new Error(error.message);
  }
  return deletedAccount;
};

exports.getAccountStats = async userId => {
  const accountStats = await tradeDb.getTradeStatsByAccount(userId);

  const formattedStats = accountStats.map(account => (  {
    ...account, 
    balance: parseFloat(account.balance),
    opening_balance:parseFloat(account.opening_balance),
    total_pnl:parseFloat(account.total_pnl),
    average_amount:parseFloat(account.average_amount),
    average_profit:parseFloat(account.average_profit),
    average_loss:parseFloat(account.average_loss),
    num_of_loss: parseFloat(account.num_of_loss),
    num_of_profit:parseFloat(account.num_of_profit),
    num_of_be:parseFloat(account.num_of_be), 
    num_of_trades:parseFloat(account.num_of_trades),
    num_of_strategies:parseFloat(account.num_of_strategies)
  }))
  return formattedStats;
};
