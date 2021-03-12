const pool = require('./db');

// exports.insertNewAccount = async (id, accountData) => {
//   const { account_name, balance, description, currency } = accountData;
//   console.log(currency)
//   const query =
//     'INSERT INTO accounts (account_name, balance, opening_balance, description, user_id, currency) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
//   try {
//     const result = await pool.query(query, [
//       account_name,
//       balance,
//       balance,
//       description,
//       id,
//       currency
//     ]);
//     return result.rows[0];
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

exports.getSnapshotBalance = async (accountId, userId) => {
  const query =
    'SELECT balance, currency FROM accounts WHERE account_id = $1 AND user_id = $2';
  try {
    const result = await pool.query(query, [accountId, userId]);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.findAccountsByUserId = async id => {
  const query = 'SELECT * FROM accounts WHERE user_id = $1';

  try {
    const result = await pool.query(query, [id]);
    return result.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.findAccountById = async (userId, accountId) => {
  const query = 'SELECT * FROM accounts WHERE account_id = $1 AND user_id = $2';
  try {
    const result = await pool.query(query, [accountId, userId]);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.updateAccountById = async (userId, updatedData) => {
  const query =
    'UPDATE accounts SET account_name = $1, description = $2 WHERE account_id = $3 AND user_id = $4 RETURNING *';
  const { account_id, account_name, description } = updatedData;

  try {
    const result = await pool.query(query, [
      account_name,
      description,
      account_id,
      userId,
    ]);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.deleteAccountById = async (account_id, user_id) => {
  const query =
    'DELETE FROM accounts WHERE account_id = $1 AND user_id = $2 RETURNING account_id';

  try {
    const result = await pool.query(query, [account_id, user_id]);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};
