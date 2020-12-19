const pool = require('./db');

exports.findUserByEmail = async (email) => {
    try {
        const query = 'SELECT * FROM "users" WHERE user_email = $1';

        const result = await pool.query(query, [email]);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
};


exports.insertUser = async ({email, name,  hashedPassword}) => {
    const query = 'INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING user_id, user_name, user_email'
    try {
        const result = await pool.query(query, [name, email, hashedPassword]);
        return result.rows[0]
    } catch (error) {
        throw new Error(error.message);
    }
}


exports.findUserById = async (id) => {
    const query = 'SELECT * FROM "users" WHERE user_id = $1';
    try {
        const result = await pool.query(query, [id])
        return result.rows[0]
    } catch (error) {
        throw new Error(error.message);
    }
}
//TODO - REFACTOR QUERY
// exports.populateUserData = async (id) => {
//     const query = 'SELECT account_name, strategy_name FROM users JOIN accounts ON users.user_id = accounts.user_id JOIN strategies ON users.user_id = strategies.user_id WHERE users.user_id = $1;';

//     try {
//         const result = await pool.query(query, [id])
//         return result.rows
//     } catch (error) {
//         throw new Error(error.message);
//     }
// }

exports.updateUserById = async (id, update) => {
    const { name } = update;
    const query = 'UPDATE users SET user_name = $1 WHERE user_id = $2 RETURNING user_id, user_name';
    try {
        const result = await pool.query(query, [name, id])
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
}

exports.deleteUserById = async (id) => {
    const query = 'DELETE FROM users WHERE user_id = $1 RETURNING user_id';

    try {
        const result = await pool.query(query, [id]);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
}