const strategyDb = require('../db/strategy-db');

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
    const updatedStrategy = await strategyDb.updateStrategyById(userId, updatedData);

        if (!updatedStrategy) {
            const error = new Error();
            error.message = 'Cannot update. Strategy not found';                
            error.code = '404';
            throw new Error(error.message);
        }
        return updatedStrategy;
}