const pool = require('./db');

exports.findUserByEmail = async (email) => {
    try {
        const query = 'SELECT * FROM "users" WHERE user_email = $1';

        const result = await pool.query(query, [email]);
        return result.rows;
    } catch (error) {
        throw new Error(error.message);
    }
};
