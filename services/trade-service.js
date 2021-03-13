const tradeDA = require('../dataAccess/trade');
const accountDA = require('../dataAccess/account');

const calcTradeGain = (snapshotBalance, tradeAmount) => {
  const relativeGain = ((tradeAmount / snapshotBalance) * 100).toFixed(2);
  if (relativeGain === 'NaN') {
    return 0;
  }
  return relativeGain;
};

exports.formatTrade = tradeData => {
  const amount = parseFloat(tradeData.amount);
  const trade = {
    ...tradeData,
    symbol: tradeData.symbol.toUpperCase(),
    amount: tradeData.outcome === 'loss' && amount > 0 ? -amount : amount,
  };
  return trade;
};

exports.createNewTrade = async tradeData => {
  const { account, user_id, amount } = tradeData;
  const { balance, currency } = await accountDA.getSnapshotBalance(
    account,
    user_id,
  );
  const relativeGain = calcTradeGain(balance, amount);
  const trade = await tradeDA.insertNewTrade(
    tradeData,
    balance,
    currency,
    relativeGain,
  );
  //TODO little hacky, try find a better solution
  const {strategy_name} = await tradeDA.findTradeById(user_id, trade.trade.trade_id);

  return {trade: {...trade.trade, strategy_name}, account: trade.account};
};

exports.getUserTrades = async userId => {
  const trades = await tradeDA.findTradeByUserId(userId);
  return trades;
};

exports.getAccountTrades = async (userId, accountId) => {
  const trades = await tradeDA.findTradesByAccountId(userId, accountId);
  return trades;
};

exports.getStrategyTrades = async (userId, strategyId) => {
  const trades = await tradeDA.findTradesByStrategyId(userId, strategyId);
  return trades;
};

exports.getTradeById = async (userId, tradeId) => {
  const trade = await tradeDA.findTradeById(userId, tradeId);

  if (!trade) {
    const error = new Error();
    error.message = 'Cannot update. Trade not found';
    error.code = '404';
    throw new Error(error.message);
  }

  return trade;
};

exports.updateTradeStrategy = async (trade_id, user_id, updates) => {
  if (updates.strategy) {
    const updatedTrade = await tradeDA.changeTradeStrategy(
      trade_id,
      user_id,
      updates.strategy,
    );

    if (!updatedTrade) {
      const error = new Error();
      error.message = 'Cannot update. Trade not found';
      error.code = '404';
      throw new Error(error.message);
    }

    return updatedTrade;
  } else if (updates.notes) {
    const updatedTrade = await tradeDA.changeTradeDescription(
      trade_id,
      user_id,
      updates.notes,
    );
   

    if (!updatedTrade) {
      const error = new Error();
      error.message = 'Cannot update. Trade not found';
      error.code = '404';
      throw new Error(error.message);
    }
    return updatedTrade;
  } else {
    throw new Error();
  }
};

exports.deleteTrade = async (trade_id, user_id) => {
  const deletedTrade = await tradeDA.deleteTradeById(trade_id, user_id);

  if (!deletedTrade) {
    const error = new Error();
    error.message = 'Cannot delete. Trade not found';
    error.code = '404';
    throw new Error(error.message);
  }
  return deletedTrade;
};
