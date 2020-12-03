const strategyDb = require('../db/strategy-db');

exports.newStrategy = async (userId, strategyData) => {
    const strategy = strategyDb.insertNewStrategy(userId, strategyData);
    return strategy;
}