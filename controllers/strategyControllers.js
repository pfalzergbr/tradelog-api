// Require DB
const strategyService = require('../services/strategy-service');

// ------------------ STRATEGIES ----------------------

// Create new Strategy
// @POST /api/strategy/

exports.createStrategy = async (req, res, next) => {
    const { user_id } = req.user;
    const {
        strategyName: strategy_name,
        description,
        accountId: account_id,
    } = req.body;

    try {
        const strategy = await strategyService.newStrategy(user_id, {
            strategy_name,
            description,
            account_id,
        });

        res.status(200).send({ message: 'New strategy created', strategy });
    } catch (error) {
        return next(error);
    }
};

// Get one strategy
// @GET /api/strategy/:strategyId

exports.getStrategy = async (req, res, next) => {
    const { user_id } = req.user;
    const { strategyId: strategy_id } = req.params;

    try {
        const strategy = await strategyService.getOneStrategy(
            user_id,
            strategy_id,
        );
        res.status(200).send(strategy);
    } catch (error) {
        return next(error);
    }
};

// Update a strategy
// @PATCH /api/strategy/:strategyId

exports.updateStrategy = async (req, res, next) => {
    const { user_id } = req.user;
    const { strategyId: strategy_id } = req.params;
    const { strategyName: strategy_name, description } = req.body;

    try {
        const updatedStrategy = await strategyService.updateStrategy(user_id, {
            strategy_id,
            strategy_name,
            description,
        });
        res.status(200).send({ message: 'Strategy updated', updatedStrategy });
    } catch (error) {
        return next(error);
    }
};

// Delete a strategy
// @DELETE /api/strategy/:strategyId

exports.deleteStrategy = async (req, res, next) => {
    const { strategyId: strategy_id } = req.params;
    const { user_id } = req.user;

    try {
        const deletedStrategy = await strategyService.deleteStrategy(
            strategy_id,
            user_id,
        );
        res.status(200).send({ message: 'Strategy deleted', deletedStrategy });
    } catch (error) {
        return next(error);
    }
};


// Get all strategies by account ID
// @GET /api/strategy/account/:accountId

exports.getAccountStrategies = async (req, res, next) => {
    const { user_id } = req.user;
    const { accountId: account_id } = req.params

    try {
        const strategies = await strategyService.getAccountStrategies(user_id, account_id);
        res.status(200).send({ strategies });
    } catch (error) {
        return next(error);
    }
};

// Get all strategies by user ID
// @GET /api/strategy/user/

exports.getUserStrategies = async (req, res, next) => {
    const { user_id } = req.user;

    try {
        const strategies = await strategyService.getUserStrategies(user_id);
        res.status(200).send({ strategies });
    } catch (error) {
        return next(error);
    }
};



exports.getStrategyStats = async (req, res, next) => {
    const { accountId: account_id } = req.params 
    const { user_id } = req.user;

    try {
        const strategyStats = await strategyService.getStrategyStats(user_id, account_id);
        res.status(200).send({ strategyStats });
    } catch (error) {
        return next(error);
    }
}
