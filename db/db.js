const Pool = require('pg').Pool;
const keys = require('../config/keys');

const user = keys.PSQL_USER;
const password = keys.PSQL_PASSWORD;
const host = keys.PSQL_HOST;
const port = keys.PSQL_PORT;
const database = keys.PSQL_DBNAME;

const pool = new Pool({
    user,
    password,
    host,
    port,
    database,
});

module.exports = pool;
