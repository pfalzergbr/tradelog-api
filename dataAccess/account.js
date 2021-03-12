const knex = require('../data/db');

exports.insertNewAccount = async (id, { account_name, balance, description, currency }) => {
    const account = await knex('accounts')
      .insert({
        account_name,
        balance,
        opening_balance: balance,
        description,
        user_id: id,
        currency
      })
      .returning('*')
    return account[0];
    

}