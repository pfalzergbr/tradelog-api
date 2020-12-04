const tradeDb = require('../db/trade-db');

//TODO ADD DATE
exports.formatTrade = (tradeData) => {
    const amount = parseFloat(tradeData.amount);
    const trade = {
        ...tradeData,
        symbol: tradeData.symbol.toUpperCase(),
        amount: tradeData.outcome === 'loss' && amount > 0 ? -amount : amount,
    };
    return trade;
};

exports.createNewTrade = async (tradeData) => {
    const trade = await tradeDb.insertNewTrade(tradeData);
    return trade;
};

exports.getUserTrades = async (userId) => {
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
