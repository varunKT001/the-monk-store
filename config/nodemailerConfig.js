const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
})

module.exports = { transport }