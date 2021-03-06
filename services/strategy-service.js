const strategyDA = require('../dataAccess/strategy');
const tradeDA = require('../dataAccess/trade');
const tradeDb = require('../db/trade-db');
const HttpError = require('../models/http-error');

exports.newStrategy = async (userId, strategyData) => {
  const strategy = await strategyDA.insertNewStrategy(userId, strategyData);
  return strategy;
};

exports.getOneStrategy = async (userId, strategyId) => {
  const strategy = await strategyDA.findStrategyById(userId, strategyId);

  if (!strategy) {
    const error = new Error();
    error.message = 'Strategy not found';
    error.code = '404';
    throw new Error(error.message);
  }

  return strategy;
};

exports.updateStrategy = async (userId, updatedData) => {
  const updatedStrategy = await strategyDA.updateStrategyById(
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
  const strategy = await strategyDA.findStrategyById(user_id, strategy_id)
  
  if (strategy.is_default) {
    throw new HttpError('This strategy cannot be deleted manually', 401)
  }
  
  const deletedStrategy = await strategyDA.deleteStrategyById(
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

exports.getUserStrategies = async userId => {
  const strategies = await strategyDA.findStrategyByUserId(userId);
  return strategies;
};

exports.getAccountStrategies = async (userId, account_id) => {
  const strategies = await strategyDA.findStrategyByUserId(userId);
  return strategies.filter(strategy => strategy.account_id === account_id);
};

exports.getStrategyStats = async (userId, accountId) => {
  const strategyStats = await tradeDA.getTradeStatsByStrategy(
    userId,
    accountId,
  );
  const formattedStats = strategyStats.map(strategy => (  {
    ...strategy, 
    total_pnl:parseFloat(strategy.total_pnl),
    average_amount:parseFloat(strategy.average_amount),
    average_profit:parseFloat(strategy.average_profit),
    average_loss:parseFloat(strategy.average_loss),
    num_of_loss: parseFloat(strategy.num_of_loss),
    num_of_profit:parseFloat(strategy.num_of_profit),
    num_of_be:parseFloat(strategy.num_of_be), 
    num_of_trades:parseFloat(strategy.num_of_trades)
  }))

  return formattedStats;
};
