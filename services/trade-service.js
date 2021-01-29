const tradeDb = require('../db/trade-db');
const accountDb = require('../db/account-db');


const calcTradeGain = (snapshotBalance, tradeAmount) => {
  const relativeGain = ((tradeAmount / snapshotBalance) * 100).toFixed(2)
  if (relativeGain === 'NaN'){
    return 0
  }
  return relativeGain;
}


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
  const { balance, currency } = await accountDb.getSnapshotBalance(
    tradeData.account,
    tradeData.user_id,
  );
  const relativeGain = calcTradeGain(balance, tradeData.amount);
  const trade = await tradeDb.insertNewTrade(tradeData, balance, currency, relativeGain);
  return trade;
};

exports.getUserTrades = async userId => {
  const trades = await tradeDb.findTradeByUserId(userId);
  return trades;
};

exports.getAccountTrades = async (userId, accountId) => {
  const trades = await tradeDb.findTradeByAccountId(userId, accountId);
  return trades;
};

exports.getStrategyTrades = async (userId, strategyId) => {
  const trades = await tradeDb.findTradeByStrategyId(userId, strategyId);
  return trades;
};

exports.getTradeById = async (userId, tradeId) => {
  const trade = await tradeDb.findTradeById(userId, tradeId);

  if (!trade) {
    const error = new Error();
    error.message = 'Cannot update. Trade not found';
    error.code = '404';
    throw new Error(error.message);
  }

  return trade;
};

exports.updateTradeStrategy = async (trade_id, userId, updates) => {
  if (updates.strategy) {
    const updatedTrade = await tradeDb.changeTradeStrategy(trade_id, userId, updates.strategy);

    if (!updatedTrade) {
      const error = new Error();
      error.message = 'Cannot update. Trade not found';
      error.code = '404';
      throw new Error(error.message);
    }

    return updatedTrade;
  } else if (updates.notes) { 
    const updatedTrade = await tradeDb.changeTradeDescription(trade_id, userId, updates.notes);

    if (!updatedTrade) {
      const error = new Error();
      error.message = 'Cannot update. Trade not found';
      error.code = '404';
      throw new Error(error.message);
    }
    return updatedTrade;
  } else {
    throw new Error;
  }

};

exports.deleteTrade = async (trade_id, user_id) => {
  const deletedTrade = await tradeDb.deleteTradeById(trade_id, user_id);

  if (!deletedTrade) {
    const error = new Error();
    error.message = 'Cannot delete. Trade not found';
    error.code = '404';
    throw new Error(error.message);
  }
  return deletedTrade;
};


