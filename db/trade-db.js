const pool = require('./db');

exports.insertNewTrade = async (tradeData) => {
    const {
        symbol,
        outcome,
        amount,
        bias,
        notes,
        accountId: account_id,
        strategyId: strategy_id,
        user_id,
    } = tradeData;
    const query =
        'INSERT INTO trades (symbol, outcome, amount, bias, notes, account_id, strategy_id, user_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
    try {
        const result = await pool.query(query, [
            symbol,
            outcome,
            amount,
            bias,
            notes,
            account_id,
            strategy_id,
            user_id,
        ]);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.findTradeByUserId = async (userId) => {
    const query = 'SELECT * FROM trades WHERE user_id = $1';
    try {
        const result = await pool.query(query, [userId]);
        return result.rows;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.findTradeByAccountId = async (userId, accountId) => {
    const query = 'SELECT * FROM trades WHERE user_id = $1 AND account_id = $2';
    try {
        const result = await pool.query(query, [userId, accountId]);
        return result.rows;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.findTradeByStrategyId = async (userId, strategyId) => {
    const query =
        'SELECT * FROM trades WHERE user_id = $1 AND strategy_id = $2';
    try {
        const result = await pool.query(query, [userId, strategyId]);
        return result.rows;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.findTradeById = async (userId, tradeId) => {
    const query =
        'SELECT * FROM trades WHERE trade_id = $1 AND user_id = $2';
    try {
        const result = await pool.query(query, [tradeId, userId]);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
};

//TODO - FINISH UPDATE TRADE
exports.updateTradeById = async (userId, updatedData) => {
    const query =''
        // 'UPDATE trades SET trade_name = $1, description = $2 WHERE strategy_id = $3 AND user_id = $4 RETURNING *';
    const { trade_id } = updatedData;

    try {
        const result = await pool.query(query, [
            trade_id,
            userId,
        ]);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
};


exports.deleteTradeById = async (trade_id, user_id) => {
    const query =
        'DELETE FROM trades WHERE trade_id = $1 AND user_id = $2 RETURNING account_id';

    try {
        const result = await pool.query(query, [trade_id, user_id]);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
};