const keys = require('./config/keys');

// Update with your config settings.
module.exports = {
  development: {
    client: 'pg',
    // connection: process.env.DB_URL,
    connection: {
      host: keys.PSQL_HOST,
      user: keys.PSQL_USER,
      password: keys.PSQL_PASSWORD,
      database: keys.PSQL_DBNAME
    },
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
  },

  testing: {
    client: 'pg',
    connection: process.env.DB_URL,
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
  },
};
