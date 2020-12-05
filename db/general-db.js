const pool = require('./db');

exports.selectAllfromSingleColumn = async (table, column, value) => {
    console.log(table, column, value)
    const query = 'SELECT * FROM $1 WHERE $2 = $3';

    try {
        const result = await pool.query(query, [table, column, value]);
        return result.rows;
    } catch (error) {
        throw new Error(error.message);
    }
};