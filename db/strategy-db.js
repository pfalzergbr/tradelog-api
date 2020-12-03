const pool = require('./db');

exports.insertNewStrategy = async (user_id, strategyData) => {
    const { strategy_name, account_id, description } = strategyData;
    const query =
        'INSERT INTO strategies (strategy_name, description, account_id,  user_id) VALUES($1, $2, $3, $4) RETURNING *';
    try {
        const result = await pool.query(query, [
            strategy_name,
            description,
            account_id,
            user_id,
        ]);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
};
