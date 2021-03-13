const knex = require('../data/db');

exports.insertNewTrade = async (
  trade_data,
  snapshot_balance,
  currency,
  relative_gain
) => {
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
  } = trade_data;

  const trx = await knex.transaction();

  try {
    const newTrade = await knex('trades')
      .insert({
        symbol,
        outcome,
        amount,
        bias,
        notes,
        date,
        account_id,
        strategy_id,
        user_id,
        snapshot_balance,
        currency,
        relative_gain,
      })
      .returning('*')
      .transacting(trx);

    const updatedAccount = await knex('accounts')
      .where({user_id, account_id})
      .increment('balance', amount)
      .transacting(trx);

    await trx.commit();
    return { trade: newTrade[0], account: updatedAccount[0] };
  } catch (error) {
    await trx.rollback();
  }
};

exports.findTradesByAccountId = async (user_id, account_id) => {
  const trades = await knex('trades')
    .join('strategies', 'strategies.strategy_id', '=', 'trades.strategy_id')
    .where({ 'trades.user_id': user_id, 'trades.account_id': account_id })
    .returning([
      'trade_id',
      'symbol',
      'outcome',
      'amount',
      'bias',
      'date',
      'notes',
      'currency',
      'snapshot_balance',
      'trades.user_id',
      'trades.account_id',
      'trades.strategy_id',
      'trades.created_at',
      'strategy_name',
      'relative_gain',
    ]);
  return trades;
};

exports.findTradeById = async (user_id, trade_id) => {
  const trades = await knex('trades')
    .join('strategies', 'strategies.strategy_id', '=', 'trades.strategy_id')
    .where({ 'trades.user_id': user_id, 'trades.trade_id': trade_id })
    .returning([
      'trade_id',
      'symbol',
      'outcome',
      'amount',
      'bias',
      'date',
      'notes',
      'currency',
      'snapshot_balance',
      'trades.user_id',
      'trades.account_id',
      'trades.strategy_id',
      'trades.created_at',
      'strategy_name',
      'relative_gain',
    ]);
  return trades[0];
};

exports.findTradesByStrategyId = async (user_id, strategy_id) => {
  const trades = await knex('trades').where({ user_id, strategy_id });
  return trades;
};

exports.changeTradeStrategy = async (trade_id, user_id, strategy_id) => {
  const trades = await knex('trades')
    .where({ trade_id, user_id })
    .update({ strategy_id })
    .returning('*')
  return trades[0];
};

exports.changeTradeDescription = async (trade_id, user_id, notes) => {
  try {
    const trades = await knex('trades')
      .where({ trade_id, user_id })
      .update({ notes })
      .returning('*')
    return trades[0];
    
  } catch (error) {
    console.log(error.message);
  }
};

exports.deleteTradeById = async (trade_id, user_id) => {
  const trx = await knex.transaction();

  try {
    const deletedTrade = await knex('trades')
      .where({trade_id, user_id })
      .del()
      .returning(['amount', 'account_id'])
      .transacting(trx);

    const amount = deletedTrade[0].amount
    const account_id = deletedTrade[0].account_id

    const updatedAccount = await knex('accounts')
      .where({user_id, account_id})
      .decrement('balance', amount)
      .transacting(trx)

    await trx.commit();
    return {
      deletedTrade: deletedTrade[0],
      account: updatedAccount[0],
    };
  } catch (error) {
    await trx.rollback();
    
  }
};



exports.getTradeStatsByStrategy = async (user_id, account_id) => {
  const query = `
  SELECT 
      strategy_name, 
      strategies.strategy_id,
      strategies.description,
      strategies.user_id,
      strategies.account_id,
      strategies.is_default,
      sum(amount) AS "total_pnl", 
      avg(amount)::numeric(10,2) AS "average_amount", 
      avg(case WHEN amount > 0 THEN amount END)::numeric(10,2) AS "average_profit", 
      avg(case WHEN amount < 0 THEN amount END)::numeric(10,2) AS "average_loss", 
      count(case WHEN amount < 0 THEN amount END) AS "num_of_loss", 
      count(case WHEN amount > 0 THEN amount END) AS "num_of_profit", 
      count(case WHEN amount = 0 THEN amount END) AS "num_of_be", 
      count(*) AS "num_of_trades" 
  FROM strategies
  LEFT JOIN trades ON trades.strategy_id = strategies.strategy_id
  WHERE strategies.user_id = ? AND strategies.account_id = ?
  GROUP BY strategies.strategy_id
  `;

  const trades = await knex.raw(query, [user_id, account_id])
  return trades.rows;
}

exports.getTradeStatsByAccount = async user_id => {
  try {
    
  const query = 
  `SELECT 
        account_name, 
        accounts.account_id AS account_id,
        accounts.user_id,
        accounts.balance,
        accounts.opening_balance,
        accounts.description,
        accounts.balance,
        accounts.opening_balance,
        accounts.currency,
        sum(amount) AS "total_pnl", 
        avg(amount)::numeric(10,2) AS "average_amount", 
        avg(case WHEN amount > 0 THEN amount END)::numeric(10,2) AS "average_profit", 
        avg(case WHEN amount < 0 THEN amount END)::numeric(10,2) AS "average_loss", 
        count(case WHEN amount < 0 THEN amount END) AS "num_of_loss", 
        count(case WHEN amount > 0 THEN amount END) AS "num_of_profit", 
        count(case WHEN amount = 0 THEN amount END) AS "num_of_be", 
        count(*) AS "num_of_trades" ,
        count(DISTINCT trades.strategy_id) AS "num_of_strategies"
    FROM accounts
    LEFT JOIN trades ON trades.account_id = accounts.account_id
    WHERE accounts.user_id = ?
    GROUP BY accounts.account_id;`;

  const trades = await knex.raw(query, [user_id])
  return trades.rows;

  
} catch (error) {
    console.log(error);
}
}
