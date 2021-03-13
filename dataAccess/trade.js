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
