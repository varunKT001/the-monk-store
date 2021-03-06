const { Pool } = require('pg')

const isDevelopment = (process.env.NODE_ENV == 'development') ? true:false

const connectionString = isDevelopment ? `postgresql://${process.env.DBUSER}:${process.env.DBPASSWORD}@${process.env.DBHOST}:${process.env.DBPORT}/the_monk_store` : process.env.DATABASE_URL
const sslVal = isDevelopment ? false : true

console.log(isDevelopment, sslVal, connectionString)

const pool = new Pool({
    connectionString: connectionString,
    ssl: sslVal
})

module.exports = { pool }