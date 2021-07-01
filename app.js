const PORT = process.env.PORT || 5000

const EMAIL = 'keplons@outlook.com'
const PASS = 'Keplonrusk8878'

const {notificationRender, pageRender} = require('./files')
const {readFileSync, writeFileSync} = require('fs')
const path = require('path')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const express = require('express')
const app = express()

app.use(cookieParser())
app.use(express.static('./static'))
app.use(express.urlencoded({extended: false}))
app.use(session({
    secret: 'bhothard',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*3
    }
}))
app.use(flash())

const transport = nodemailer.createTransport({
    service: 'outlook',
    auth: {
        user: EMAIL,
        pass: PASS
    }
})

const checkAuthorization = (req, res, next)=>{
    if(req.cookies.token){
        const token = req.cookies.token
        jwt.verify(token, 'secret', (err, userDetails)=>{
            if(err){
                return res.redirect('/login')
            }
            req.user = userDetails.user
            res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0')
            next()
        })
    }
    else{
        return res.redirect('/login')
    }
}

const getUserByUsername = (username)=>{
    let users = readFileSync('./users.json', 'utf8')
    users = JSON.parse(users)
    return users.find(user => user.name == username)
}

const getUserByID = (id)=>{
    let users = readFileSync('./users.json', 'utf8')
    users = JSON.parse(users)
    return users.find(user => user.id == id)
}

const getUserByEmail = (email)=>{
    let users = readFileSync('./users.json', 'utf8')
    users = JSON.parse(users)
    return users.find(user => user.email == email)
}

app.get('/', checkAuthorization, (req, res)=>{
    res.redirect('/homepage')
})

app.get('/login', (req, res)=>{
    const message = req.flash()
    if(message.msg){
        return res.send(notificationRender(true, message.msg, 'login'))
    }
    if(message.emsg){
        return res.send(notificationRender(false, message.emsg, 'login'))
    }
    else{
        return res.sendFile(path.join(__dirname, "markups", "login.html"))
    }
})

app.post('/login', (req, res)=>{
    const newUser = {
        name: req.body.name,
        password: req.body.password,
    }
    console.log('login request recieved', newUser)
    let users = readFileSync('./users.json', 'utf8')
    users = JSON.parse(users)

    const user = getUserByUsername(newUser.name)

    if(user == null){
        return res.send(notificationRender(false, 'User not found!', 'login'))
        // return res.redirect('/login')
    }
    if(!(user.password == newUser.password)){
        return res.send(notificationRender(false, 'Password incorrect!', 'login'))
        // return res.redirect('/login')
    }
    if(!user.verified){
        return res.send(notificationRender(false, 'Please verify your email to continue!', 'login'))
        // return res.redirect('/login')
    }
    const token = jwt.sign({user}, 'secret', { expiresIn: '20m' })
    res.cookie('token', token, {maxAge: 1000*60*20 ,httpOnly: true})
    return res.redirect('/homepage')
})

app.get('/register', (req, res)=>{
    const message = req.flash()
    if(message.msg){
        return res.send(notificationRender(true, message.msg, 'register'))
    }
    if(message.emsg){
        return res.send(notificationRender(false, message.emsg, 'register'))
    }
    else{
        return res.sendFile(path.join(__dirname, "markups", "register.html"))
    }
})

app.post('/register', (req, res)=>{
    const newUser = {
        id: Date.now().toString(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        verified: false,
        phoneNumber: "NA", 
        address: "NA",
        gender: "NA"
    }

    console.log('Register request recieved', newUser)

    let users = readFileSync('./users.json', 'utf8')
    users = JSON.parse(users)

    
    if (users.find(user => user.name == newUser.name && users.find(user => user.email == newUser.email))){
        return res.send(notificationRender(false, 'User already exist!', 'register'))
        // return res.redirect('/register')
    }
    if (users.find(user => user.name == newUser.name)){
        return res.send(notificationRender(false, 'Username already taken!', 'register'))
        // return res.redirect('/register')
    }
    if (users.find(user => user.email == newUser.email)){
        return res.send(notificationRender(false, 'Email already registered!', 'register'))
        // return res.redirect('/register')
    }

    const verificationToken = jwt.sign({id: newUser.id}, "hellohi", {expiresIn: '2m'})
    
    const url = `http://localhost:5000/account/verify/${verificationToken}`

    const html = `<h1>hey, ${newUser.name}</h1>
                  <h3>Account Verification</h3>
                  <p>Thank you for registering with The Monk Store. Before you are able to use your account, you must verify your email.
                  </p>
                  <p>Click on the following link to verify your email address:</p>
                  <a href="${url}">VERIFY</a>`

    const mailOptions = {
        from: `"The Monk Store" <${EMAIL}>`,
        to: newUser.email,
        subject: 'Account Verification',
        html: html
    }

    transport.sendMail(mailOptions, (err, info)=>{
        if(err){
            console.log(err)
            req.flash('emsg', 'Something went wrong!')
            return res.redirect('/register')
        }
        else{
            console.log('mail sent')
            
            users.push(newUser)
            users = JSON.stringify(users)
            writeFileSync('./users.json', users)

            req.flash('msg', 'check your email and verify')
            return res.redirect('/login')
        }
    })
})

app.get('/account/verify/:token', (req, res)=>{
    const {token} = req.params
    jwt.verify(token, "hellohi", (err, userDetails)=>{
        if(err){
            console.log(err)

            let users = readFileSync('./users.json', 'utf8')
            users = JSON.parse(users)

            users = users.filter(user => user.id != reqUser.id)
            users = JSON.stringify(users)
            writeFileSync('./users.json', users)

            req.flash('emsg', 'Verification failed! Please try registering again')
            return res.redirect('/login')
        }
        else{
            let reqUser = getUserByID(userDetails.id)
            if(reqUser){
            reqUser.verified = true

            let users = readFileSync('./users.json', 'utf8')
            users = JSON.parse(users)

            users = users.filter(user => user.id != reqUser.id)
            users.push(reqUser)
            users = JSON.stringify(users)
            writeFileSync('./users.json', users)
            
            req.flash('msg', 'Verification successfull!')
            return res.redirect('/login')
            }
        }
    })

    return
})

app.get('/forgot-password', (req, res)=>{
    const message = req.flash()
    if(message.msg){
        return res.send(notificationRender(true, message.msg, 'forgot-password'))
    }
    else if(message.emsg){
        return res.send(notificationRender(false, message.emsg, 'forgot-password'))
    }
    else{
        return res.send(pageRender(null, 'forgot-password'))
    }
})

app.post('/forgot-password', (req, res)=>{

    let user = getUserByEmail(req.body.email)

    const verificationToken = jwt.sign({email: user.email}, "hellohi", {expiresIn: '2m'})
    
    const url = `http://localhost:5000/account/password-reset/${verificationToken}`

    const html = `<h1>hey, ${user.name}</h1>
                  <h3>Password Change Process</h3>
                  <p>It has been noticed that you've applied for a password change. If it was you then click on the following link for further process. 
                  </p>
                  <a href="${url}">RESET PASSWORD</a>`

    const mailOptions = {
        from: `"The Monk Store" <${EMAIL}>`,
        to: user.email,
        subject: 'Password Reset Request',
        html: html
    }

    transport.sendMail(mailOptions, (err, info)=>{
        if(err){
            console.log(err)
            req.flash('emsg', 'Something went wrong!')
            return res.redirect('/forgot-password')
        }
        else{
            console.log('mail sent')
            req.flash('msg', 'check your email and follow the instruction')
            return res.redirect('/forgot-password')
        }
    })
})

app.get('/account/password-reset/:emailToken', (req, res)=>{
    const {emailToken} = req.params
    res.send(pageRender(emailToken, 'password-reset'))
})

app.post('/account/password-reset', (req, res)=>{
    const newCredentials = {
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        userToken: req.body.userToken
    }

    jwt.verify(newCredentials.userToken, "hellohi", (err, userDetails)=>{
        if(err){
            console.log(err)
            req.flash('emsg', 'Something went wrong! try again')
            return res.redirect('/forgot-password')
        }
        else{
            reqUser = getUserByEmail(userDetails.email)

            reqUser.password = newCredentials.password

            let users = readFileSync('./users.json', 'utf8')
            users = JSON.parse(users)

            users = users.filter(user => user.email != reqUser.email)
            users.push(reqUser)
            users = JSON.stringify(users)
            writeFileSync('./users.json', users)

            const html = `<h1>hey, ${reqUser.name}</h1>
            <h3>Password Changed</h3>
            <p>The password for your account has been changed. If not done by you, contact to our support team immediately:</p>
            <br><br>
            <p>Mail us: support@monkstore.com </p>
            <p>Call us: 1234567890, 0987654321 (TOLL-FREE) </p>`

            const mailOptions = {
            from: `"The Monk Store" <${EMAIL}>`,
            to: reqUser.email,
            subject: 'Password Reset Request',
            html: html
            }

            transport.sendMail(mailOptions, (err, info)=>{
            if(err){
                console.log(err)
                req.flash('emsg', 'Something went wrong!')
                return res.redirect('/login')
            }
            else{
                console.log('mail sent')
                req.flash('msg', 'Password reset successfull!')
                res.redirect('/login')
            }
            })
        }
    })
})

app.get('/logout', checkAuthorization, (req, res)=>{
    res.clearCookie('token')
    req.flash('msg', 'Logged out!')
    res.redirect('/login')
})

app.get('/homepage', checkAuthorization, (req, res)=>{
    res.send(pageRender(req.user, 'homepage'))
    // res.sendFile(path.join(__dirname, "markups", "homepage.html"))
})

app.get('/feedback', checkAuthorization, (req, res)=>{
    res.send(pageRender(req.user, 'feedback'))
})

app.get('/order-history', checkAuthorization, (req, res)=>{
    res.send(pageRender(req.user, 'order-history'))
})

app.get('/settings', checkAuthorization, (req, res)=>{
    const user = req.user
    const message = req.flash()
    if(message.msg){
        return res.send(notificationRender(true, message.msg, 'settings'))
    }
    if(message.emsg){
        return res.send(notificationRender(false, message.emsg, 'settings'))
    }
    else{
        return res.send(pageRender(user, 'settings'))
    }
})

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})