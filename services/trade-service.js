const tradeDb = require('../db/trade-db');
// const generalDb = require('../db/general-db');

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

exports.getTradeById = async (userId, tradeId) => {
    const trade = await tradeDb.findTradeById(userId, tradeId)

    if (!trade) {
        const error = new Error();
        error.message = 'Cannot update. Trade not found';
        error.code = '404';
        throw new Error(error.message);
    }

    return trade;
}

exports.updateStrategy = async (userId, updatedData) => {
    const updatedTrade = await tradeDb.updateTradeById(
        userId,
        updatedData,
    );

    if (!updatedTrade) {
        const error = new Error();
        error.message = 'Cannot update. Trade not found';
        error.code = '404';
        throw new Error(error.message);
    }

    return updatedTrade;
};

exports.deleteTrade = async (trade_id, user_id) => {
    const deletedTrade = await tradeDb.deleteStrategyById(
        trade_id,
        user_id,
    );

    if (!deletedTrade) {
        const error = new Error();
        error.message = 'Cannot delete. Strategy not found';
        error.code = '404';
        throw new Error(error.message);
    }
    return deletedTrade;
};