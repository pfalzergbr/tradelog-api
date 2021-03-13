const knex = require('../data/db');

exports.insertNewAccount = async (
  id,
  { account_name, balance, description, currency }
) => {
  const account = await knex('accounts')
    .insert({
      account_name,
      balance,
      opening_balance: balance,
      description,
      user_id: id,
      currency,
    })
    .returning('*');
  return account[0];
};

exports.getSnapshotBalance = async (accountId, userId) => {
  const account = await knex('accounts')
    .where({ account_id: accountId, user_id: userId })
    .returning(['balance', 'currency']);
  return account[0];
};

exports.findAccountsByUserId = async (id) => {
  const accounts = await knex('accounts').where({ user_id: id });
  return accounts;
};

exports.findAccountById = async (userId, accountId) => {
  const accounts = await knex('accounts').where({
    user_id: userId,
    account_id: accountId,
  });
  return accounts[0];
};

exports.updateAccountById = async (
  userId,
  { account_id, account_name, description }
) => {
  const accounts = await knex('accounts')
    .where({ 
      user_id: userId, 
      account_id 
    })
    .update({
      account_name,
      description,
    });

  return accounts[0];
};

exports.deleteAccountById = async (account_id, user_id) => {
  const accounts = await knex('accounts').where({ account_id, user_id }).del();
};
