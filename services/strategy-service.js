const strategyDb = require('../db/strategy-db');
const tradeDb = require('../db/trade-db');

exports.newStrategy = async (userId, strategyData) => {
    const strategy = strategyDb.insertNewStrategy(userId, strategyData);
    return strategy;
};

exports.getOneStrategy = async (userId, strategyId) => {
    const strategy = await strategyDb.findStrategyById(userId, strategyId);

    if (!strategy) {
        const error = new Error();
        error.message = 'Strategy not found';
        error.code = '404';
        throw new Error(error.message);
    }

    return strategy;
};

exports.updateStrategy = async (userId, updatedData) => {
    const updatedStrategy = await strategyDb.updateStrategyById(
        userId,
        updatedData,
    );

    if (!updatedStrategy) {
        const error = new Error();
        error.message = 'Cannot update. Strategy not found';
        error.code = '404';
        throw new Error(error.message);
    }

    return updatedStrategy;
};

exports.deleteStrategy = async (strategy_id, user_id) => {
    const deletedStrategy = await strategyDb.deleteStrategyById(
        strategy_id,
        user_id,
    );

    if (!deletedStrategy) {
        const error = new Error();
        error.message = 'Cannot delete. Strategy not found';
        error.code = '404';
        throw new Error(error.message);
    }
    return deletedStrategy;
};

exports.getUserStrategies = async (userId) => {
    const strategies = await strategyDb.findStrategyByUserId(userId);
    return strategies;
};

exports.getAccountStrategies = async (userId, account_id) => {
    const strategies = await strategyDb.findStrategyByUserId(userId);
    return strategies.filter(strategy => strategy.account_id === account_id);
};

exports.getStrategyStats = async (userId, accountId) => {
    const strategyStats = await tradeDb.getTradeStatsByStrategy(userId, accountId);
    return strategyStats;
};
