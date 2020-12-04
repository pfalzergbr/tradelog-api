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
