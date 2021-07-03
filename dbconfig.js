const { Pool } = require('pg')

const connectionString = `postgresql://postgres:postgres@localhost:5432/the_monk_store`

const pool = new Pool({
    connectionString: connectionString
})

module.exports = { pool }