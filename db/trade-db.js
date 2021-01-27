const pool = require('./db');

exports.insertNewTrade = async (tradeData, snapshotBalance) => {
  const {
    symbol,
    outcome,
    amount,
    bias,
    notes,
    date,
    account: account_id,
    strategy: strategy_id,
    user_id,
  } = tradeData;
  const tradeQuery =
    'INSERT INTO trades (symbol, outcome, amount, bias, notes, date, account_id, strategy_id, user_id, snapshot_balance) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';
  const accountQuery =
    'UPDATE accounts SET balance = balance + $1 WHERE user_id = $2 AND account_id = $3 RETURNING *';
  try {
    await pool.query('BEGIN');
    const newTrade = await pool.query(tradeQuery, [
      symbol,
      outcome,
      amount,
      bias,
      notes,
      date,
      account_id,
      strategy_id,
      user_id,
      snapshotBalance
    ]);
    const updatedAccount = await pool.query(accountQuery, [
      amount,
      user_id,
      account_id,
    ]);
    await pool.query('COMMIT');
    return { trade: newTrade.rows[0], account: updatedAccount.rows[0] };
  } catch (error) {
    await pool.query('ROLLBACK');
    throw new Error(error.message);
  }
};

exports.findTradeByUserId = async userId => {
  const query = 'SELECT * FROM trades WHERE user_id = $1';
  try {
    const result = await pool.query(query, [userId]);
    return result.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.findTradeByAccountId = async (userId, accountId) => {
  const query = `SELECT 
  trade_id, 
  symbol, 
  outcome, 
  amount, 
  bias, 
  date, 
  notes, 
  snapshot_balance,
  trades.user_id, 
  trades.account_id, 
  trades.strategy_id, 
  trades.created_at, 
  strategy_name 
  FROM trades 
  JOIN strategies ON strategies.strategy_id = trades.strategy_id 
  WHERE trades.user_id = $1 AND trades.account_id = $2`;
  try {
    const result = await pool.query(query, [userId, accountId]);
    return result.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.findTradeByStrategyId = async (userId, strategyId) => {
  const query = 'SELECT * FROM trades WHERE user_id = $1 AND strategy_id = $2';
  try {
    const result = await pool.query(query, [userId, strategyId]);
    return result.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.findTradeById = async (userId, tradeId) => {
  const query = `SELECT 
  trade_id, 
  symbol, 
  outcome, 
  amount, 
  bias, 
  date, 
  notes, 
  snapshot_balance,
  trades.user_id, 
  trades.account_id, 
  trades.strategy_id, 
  trades.created_at, 
  strategy_name 
  FROM trades 
  JOIN strategies ON strategies.strategy_id = trades.strategy_id 
  WHERE trades.trade_id = $1 AND trades.user_id = $2`;;
  try {
    const result = await pool.query(query, [tradeId, userId]);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

//TODO - FINISH UPDATE TRADE
exports.updateTradeById = async (userId, updatedData) => {
  const query = '';
  // 'UPDATE trades SET trade_name = $1, description = $2 WHERE strategy_id = $3 AND user_id = $4 RETURNING *';
  const { trade_id } = updatedData;

  try {
    const result = await pool.query(query, [trade_id, userId]);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.deleteTradeById = async (trade_id, user_id) => {
  const tradeQuery =
    'DELETE FROM trades WHERE trade_id = $1 AND user_id = $2 RETURNING *';
  const accountQuery =
    'UPDATE accounts SET balance = balance - $1 WHERE user_id = $2 AND account_id = $3 RETURNING *';
  try {
    await pool.query('BEGIN');
    const deletedTrade = await pool.query(tradeQuery, [trade_id, user_id]);
    const { amount, account_id } = deletedTrade.rows[0];
    const updatedAccount = await pool.query(accountQuery, [
      amount,
      user_id,
      account_id,
    ]);
    await pool.query('COMMIT');
    return {
      deletedTrade: deletedTrade.rows[0],
      account: updatedAccount.rows[0],
    };
  } catch (error) {
    await pool.query('ROLLBACK');
    throw new Error(error.message);
  }
};

exports.getTradeStatsByAccount = async user_id => {
  const query = `SELECT 
        account_name, 
        accounts.account_id AS account_id,
        accounts.balance,
        accounts.opening_balance,
        sum(amount) AS "total_pnl", 
        avg(amount)::numeric(10,2) AS "average_amount", 
        avg(case WHEN amount > 0 THEN amount END)::numeric(10,2) AS "average_profit", 
        avg(case WHEN amount < 0 THEN amount END)::numeric(10,2) AS "average_loss", 
        count(case WHEN amount < 0 THEN amount END) AS "num_of_loss", 
        count(case WHEN amount > 0 THEN amount END) AS "num_of_profit", 
        count(case WHEN amount = 0 THEN amount END) AS "num_of_be", 
        count(*) AS "num_of_trades" ,
        count(DISTINCT trades.strategy_id) AS "num of strategies"
    FROM accounts
    JOIN trades ON trades.account_id = accounts.account_id
    WHERE trades.user_id = $1
    GROUP BY accounts.account_id;`;

  try {
    const result = await pool.query(query, [user_id]);
    return result.rows;
  } catch (error) {
    console.log(error)
    throw new Error(error.message);
  }
};

exports.getTradeStatsByStrategy = async (user_id, account_id) => {
  const query = `
    SELECT 
        strategy_name, 
        strategies.strategy_id,
        sum(amount) AS "total_pnl", 
        avg(amount)::numeric(10,2) AS "average_amount", 
        avg(case WHEN amount > 0 THEN amount END)::numeric(10,2) AS "average_profit", 
        avg(case WHEN amount < 0 THEN amount END)::numeric(10,2) AS "average_loss", 
        count(case WHEN amount < 0 THEN amount END) AS "num_of_loss", 
        count(case WHEN amount > 0 THEN amount END) AS "num_of_profit", 
        count(case WHEN amount = 0 THEN amount END) AS "num_of_be", 
        count(*) AS "num_of_trades" 
    FROM strategies
    JOIN trades ON trades.strategy_id = strategies.strategy_id
    WHERE trades.user_id = $1 AND trades.account_id = $2
    GROUP BY strategies.strategy_id
    `;

  try {
    const result = await pool.query(query, [user_id, account_id]);
    return result.rows;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
