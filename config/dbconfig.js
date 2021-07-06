const { Pool } = require('pg')

// const isDevelopment = process.env.NODE_ENV ? true:false

// const connectionString = isDevelopment ? `postgresql://${process.env.DBUSER}:${process.env.DBPASSWORD}@${process.env.DBHOST}:${process.env.DBPORT}/the_monk_store` : process.env.DATABASE_URL
// const sslVal = isDevelopment ? false : true

// console.log(isDevelopment, sslVal, connectionString)

// var client = new Client({
//     user: "iscmssidwjnmks",
//     password: "fb23d949865d9b86b812aa139ce02b244d2990d264b47bb59f306c2aacc1e95e",
//     database: "decevc4onflgjd",
//     port: 5432,
//     host: "ec2-54-155-208-5.eu-west-1.compute.amazonaws.com",
//     ssl: true
// });

const pool = new Pool({
    user: "iscmssidwjnmks",
    password: "fb23d949865d9b86b812aa139ce02b244d2990d264b47bb59f306c2aacc1e95e",
    database: "decevc4onflgjd",
    port: 5432,
    host: "ec2-54-155-208-5.eu-west-1.compute.amazonaws.com",
    ssl: true
    // connectionString: connectionString,
    // ssl: sslVal
})

module.exports = { pool }