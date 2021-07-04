const { Pool } = require('pg')

const connectionString = `postgresql://${process.env.DBUSER}:${process.env.DBPASSWORD}@${process.env.DBHOST}:${process.env.DBPORT}/the_monk_store`

const pool = new Pool({
    connectionString: connectionString
})

module.exports = { pool }