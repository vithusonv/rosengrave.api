const { Pool } = require('pg');

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const pool = new Pool({
    host: PGHOST,
    database: PGDATABASE,
    user: PGUSER,
    password: PGPASSWORD,
    port: 5432,
    ssl: true,
    connectionTimeoutMillis: 0, // 0 means no timeout
    idleTimeoutMillis: 10000, // Close idle clients after 10 seconds
    max: 20, // Max number of clients in the pool
});

module.exports = pool;
