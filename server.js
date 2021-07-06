
/*---------- LOADING ENVIRONMENT VARIABLES ----------*/
require('dotenv').config()

const PORT = process.env.PORT || 5000

const EMAIL = process.env.EMAIL
const PASS = process.env.PASS

/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|  P A C K A G E S  |+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------- CUSTOM RENDER FUNCTIONS ----------*/
const {notificationRender, pageRender, productRender} = require('./misc/files')

/*---------- GLOBAL PATH MODULE TO RESOLVE PATHS ----------*/
const path = require('path')

/*---------- COOKIE PARSER TO PARSE COOKIES SENT BY BROWSER ----------*/
const cookieParser = require('cookie-parser')

/*---------- USING EXPRESS SESSIONS TO FLASH SUCCESS OR ERROR MSG TO USER USING CONNECT FLASH ----------*/
const flash = require('connect-flash')
const session = require('express-session')

/*---------- USING JWT LIBRARY TO SIGN AND VERIFY TOKENS ----------*/
const jwt = require('jsonwebtoken')

/*---------- USIGN NODEMAILER TO SEND EMAILS ----------*/
const { transport } = require('./config/nodemailerConfig') 

/*---------- REQUIRING POOL USING DBCONFIG TO CONNECT TO DB AND MAKE QUERIES ----------*/
const { pool } = require('./config/dbconfig')

/*---------- EXPRESS TO SETUP THE SERVER ----------*/
const express = require('express')
const app = express()

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|  M I D D L E - W A R E S  |+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------- USING SOME NECESSARY MIDDLEWARES ----------*/
app.use(cookieParser())
app.use(express.static('./static'))
app.use(express.urlencoded({extended: false}))

/*---------- SETTING UP EXPRESS SESSIONS MIDDLEWARE ----------*/
app.use(session({
    secret: 'bhothard',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*3
    }
}))

/*---------- USING FLASH MIDDLEWARE ----------*/
app.use(flash())

/*---------- CUSTOM MIDDLEWARE: FOR CHECKING IF THE USER IS AUTHORIZED OR NOT ----------*/
/*---------- IT USES JWT TOKEN SEND USING A COOKIE TO VERIFY ----------*/
/*---------- IF VERIFIED: IT CALLS NEXT MIDDLEWARE ----------*/
/*---------- IF NOT VERIFIED: REDIRECTS TO LOGIN PAGE ----------*/
const checkAuthorization = (req, res, next)=>{
    if(req.cookies.token){
        const token = req.cookies.token
        jwt.verify(token, 'secret', (err, userDetails)=>{
            if(err){
                return res.redirect('/login')
            }
            req.user = userDetails.user

            /*---------- PREVENTING ANY CACHING DONE BY THE BROWSER ----------*/
            res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0')
            next()
        })
    }
    else{
        return res.redirect('/login')
    }
}

/*---------- CUSTOM MIDDLEWARE: FOR CHECKING IF USER IS A SELLER OR NOT ----------*/
/*---------- IT USES THE user FIELD SET BY THE checkAuthorization() MIDDLEWARE TO CHECK THE SELLER FIELD OF USER ----------*/
/*---------- IF USER IS A SELLER: IT CALLS THE NEXT MIDDLEWARE ----------*/
/*---------- IF USER IS NOT A SELLER: REDIRECTS TO LOGIN PAGE ----------*/
const checkSeller = (req, res, next)=>{
    if (req.user.seller == 'true'){
        /*---------- PREVENTING ANY CACHING DONE BY THE BROWSER ----------*/
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0')
        return next()
    }
    else if (req.user.seller == 'false'){
        return res.redirect('/login')
    }
}


/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|  H E L P E R - F U N C T I O N S  |+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*---------- CUSTOM HELPER FUNCTIONS:  ----------*/

/*---------- RETURNS A USER USING THE USERNAME ----------*/
const getUserByUsername = async (username)=>{
    try{
    const user = await pool.query(`SELECT * FROM users WHERE name = $1`, [username])
    return user.rows[0]
    }
    catch(err){
         console.log(err)
    }
}

/*---------- RETURNS A USER USING THE ID ----------*/
const getUserByID = async (id)=>{
    try{
    const user = await pool.query(`SELECT * FROM users WHERE id = $1`, [id])
    return user.rows[0]
    }
    catch(err){
        console.log(err)
    }
}

/*---------- RETURNS A USER USING THE EMAIL ----------*/
const getUserByEmail = async (email)=>{
    try{
    const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [email])
    return user.rows[0]
    }
    catch(err){
        console.log(err)
    }
}

/*---------- ORDER HELPER: TAKES USER AND PRODUCT INFO AS INPUT AND ORDER THE PARTICULAR PRODUCT ----------*/
/*---------- RETURNS FULL ORDER INFO AND ORDER STATUS(SUCCESS OR FAILURE) TO THE CALLING FUNCTION ----------*/
const orderHelper = async (user, product)=>{
    try{
        let result = await pool.query(`SELECT * FROM products WHERE id = $1`, [product.id])
        if(result.rows.length > 0){
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = mm + '/' + dd + '/' + yyyy
            try{
                let result_1 = await pool.query(`INSERT INTO orders (productId, name, price, category, date, useremail) VALUES ($1, $2, $3, $4, $5, $6)`, [product.id, result.rows[0].name, result.rows[0].price, result.rows[0].category, today, user.email])
                return {val: true, productOrdered: result.rows[0]}
            }
            catch(err){
                console.log(err)
                return {val: false, productOrdered: 'CANNOT PLACE ORDER'}
            }
        }
    }
    catch(err){
        console.log(err)
        return false
    }
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++|  R O U T E S  |+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------*/


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

app.post('/login', async (req, res)=>{
    const newUser = {
        email: req.body.email,
        password: req.body.password,
    }
    console.log('login request recieved', newUser)

    const user = await getUserByEmail(newUser.email)

    /*---------- CHECKING IF THE CREDENTIALS ENTERED ARE CORRECT OR NOT ----------*/
    if(!user){
        return res.send(notificationRender(false, 'User not found!', 'login'))
    }
    if(!(user.password == newUser.password)){
        return res.send(notificationRender(false, 'Password incorrect!', 'login'))
    }
    /*---------- CHECKING CREDENTIALS END ----------*/

    /*---------- CHECKING IF USER IS VERIFIED OR NOT ----------*/
    /*---------- IF VERIFIED: CAN LOGIN TO THE SITE ----------*/
    /*---------- IF NOT VERIFIED: USER NEED TO VERIFY USING THE VERIFICATION LINK SENT TO EMAIL ADDRESS ----------*/
    if(user.verified == 'false'){
        return res.send(notificationRender(false, 'Please verify your email to continue!', 'login'))
    }
    /*---------- CHECKING VERIFICATION ENDS ----------*/

    /*---------- CREATING A USER SESSION USING JWT AND IMPLEMENTING USING COOKIES ----------*/
    /*---------- SESSIONS LAST FOR ABOUT 20 MINUTES ----------*/
    const token = jwt.sign({user}, 'secret', { expiresIn: '20m' })
    res.cookie('token', token, {maxAge: 1000*60*20 ,httpOnly: true})
    /*---------- SESSION CREATED ----------*/

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
        seller: false,
        phoneNumber: null, 
        address: "NA",
        gender: "NA"
    }

    /*---------- FORM VALIDATION ----------*/
    /*---------- VALIDATION PARAMETERS: 1. USER MUST ENTER USERNAME, EMAIL, AND A PASSWORD, 2. PASSWORDS SHOULD MATCH, 3. PASSWORD SHOULD BE OF ATLEAST 8 CHARACTERS AND MUST CONSTAIN A NUMBER  ----------*/

    if(!newUser.name){
        return res.send(notificationRender(false, 'Enter an username!', 'register'))
    }
    if(!newUser.email){
        return res.send(notificationRender(false, 'Enter an Email!', 'register'))
    }
    if(!newUser.password){
        return res.send(notificationRender(false, 'Enter a Password!', 'register'))
    }
    if(newUser.password != req.body.confirmpassword){
        return res.send(notificationRender(false, 'Passwords not matching!', 'register'))
    }
    if(newUser.password.length < 8){
        return res.send(notificationRender(false, 'Password must be of atleast 8 characters!', 'register'))
    }
    if(! /\d/.test(newUser.password)){
        return res.send(notificationRender(false, 'Password must contain a number!', 'register'))
    }

    /*---------- FORM VALIDATION END ----------*/

    console.log('Register request recieved', newUser)

    /*---------- CHECKING IF THE NEW USER IS ALREADY AN EXISTING USER ----------*/
    /*---------- IF NOT AN EXISTING USER: THE DATA OF USER WILL BE SAVED IN DB AND AN EMAIL VERIFICATION LINK WILL BE SENT ----------*/
    /*---------- IF AN EXISTING USER: THE USER WILL BE REDIRECTED TO LOGIN PAGE ----------*/

    pool.query(`SELECT * FROM users WHERE email = $1`, [newUser.email], (error, result)=>{
        if (error) {
            console.log(error) 
        }
        else{
            if (result.rows.length > 0){
                return res.send(notificationRender(false, 'Email already registered! Login to continue', 'login'))
            }

            /*---------- USING THE GENERATED USER ID AS VERIFYING PARAMETER ----------*/
            const verificationToken = jwt.sign({id: newUser.id}, "hellohi", {expiresIn: '2m'})

            /*---------- VERIFICATION LINK ----------*/
            const url = `http://${process.env.SITE_URL}/account/verify/${newUser.email}/${verificationToken}`

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

            /*---------- SENDING MAIL TO PROVIDED EMAIL ADDRESS ----------*/
            transport.sendMail(mailOptions, (err, info)=>{
                if(err){
                    console.log(err)
                    req.flash('emsg', 'Something went wrong!')
                    return res.redirect('/register')
                }
                else{
                    console.log('mail sent')

                    pool.query(`INSERT INTO users (id, name, email, password, verified, seller) VALUES($1, $2, $3, $4, $5, $6)`, [newUser.id, newUser.name, newUser.email, newUser.password, newUser.verified, newUser.seller], (error, result)=>{
                        if (error) console.log(error)
                    })

                    req.flash('msg', 'An Email Verification has been sent (CHECK SPAM FOLDER)')
                    return res.redirect('/login')
                }
            })
        }
    })

    /*---------- ADDING AND SENDING VERIFICATION LINK END ----------*/
})

app.get('/account/verify/:email/:token', (req, res)=>{
    const {email, token} = req.params
    
    /*---------- CHECKING IF THE VERIFICATION TOKEN IS VALID OR NOT ----------*/
    /*---------- IF TOKEN INVALID: USER RECORD WILL BE DELETED AND USER MUST REGISTER AGAIN ----------*/
    /*---------- IF TOKEN VALID: USER WILL BE SET AS VERIFIED AND REDIRECTED TO THE LOGIN PAGE TO LOGIN TO THE SITE ----------*/
    jwt.verify(token, "hellohi", (err, userDetails)=>{
        if(err){
            console.log(err)

            pool.query(`DELETE FROM users WHERE email = $1`, [email], (err, result)=>{
                if(err) console.log(err)
                else{
                    console.log(result)
                }
            })

            req.flash('emsg', 'Verification failed! Please try registering again')
            return res.redirect('/login')  
        }
        else{
            console.log(userDetails)
            pool.query(`SELECT * FROM users WHERE id = $1`, [userDetails.id], (err, result)=>{
                if(err){
                    console.log(err)
                }
                else{
                    if (result.rows[0]){
                        const reqUser = result.rows[0]
                        pool.query(`UPDATE users SET verified = 'true' WHERE id = $1`, [reqUser.id], (err, result)=>{
                            if (err) {
                                console.log(err)
                            }
                            else{
                                console.log(result)
                            }
                        })
                        
                        req.flash('msg', 'Verification successfull!')
                        return res.redirect('/login')
                    }
                    else{
                        console.log(result.rows[0])
                        req.flash('emsg', 'User not found!')
                        return res.redirect('/login')
                    }
                }
            })
        }
    })
    /*---------- CHECKING VERIFICATION ENDS  ----------*/

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

app.post('/forgot-password', async (req, res)=>{

    /*---------- GETTING USER DETAILS USING THE EMAIL ENTERED BY USER ----------*/
    let user = await getUserByEmail(req.body.email)

    /*---------- SENDING PASSWORD RESET LINK TO THE USER ----------*/
    /*---------- THE RESET LINK CONTAINS JWT TOKEN SIGNED USING USER EMAIL ----------*/
    const verificationToken = jwt.sign({email: user.email}, "hellohi", {expiresIn: '2m'})
    
    const url = `http://${process.env.SITE_URL}/account/password-reset/${verificationToken}`

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

    /*---------- SENDING RESET LINK TO THE USER EMAIL ----------*/
    transport.sendMail(mailOptions, (err, info)=>{
        if(err){
            console.log(err)
            req.flash('emsg', 'Something went wrong!')
            return res.redirect('/forgot-password')
        }
        else{
            console.log('mail sent')
            req.flash('msg', 'A Password Reset Link has been sent (CHECK SPAM FOLDER)')
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


    /*---------- VERIFYING THE JWT TOKEN SENT TO USER'S EMAIL ----------*/
    /*---------- IF VERIFIED: THE USER CAN ENTER A NEW PASSWORD AND LOGIN USING SAME ----------*/
    /*---------- IF NOT VERIFIED: USER WILL BE REDIRECTED TO THE FORGOT-PASSWORD PAGE ----------*/
    jwt.verify(newCredentials.userToken, "hellohi", (err, userDetails)=>{
        if(err){
            console.log(err)
            req.flash('emsg', 'Something went wrong! try again')
            return res.redirect('/forgot-password')
        }
        else{
            
            pool.query(`UPDATE users SET password = $1 WHERE email = $2`, [newCredentials.password, userDetails.email], async (err, result)=>{
                if (err){
                    console.log(err)
                }
                else{
                    reqUser = await getUserByEmail(userDetails.email)
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
                    
                    /*---------- SENDING A CONFIRMATION EMAIL TO THE USER AFTER SUCCESSFULL PASSWORD CHANGE ----------*/
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
        }
    })
})

app.get('/logout', checkAuthorization, (req, res)=>{

    /*---------- CLEARING THE COOKIES TO END THE SESSION ----------*/
    res.clearCookie('token')
    req.flash('msg', 'Logged out!')

    /*---------- REDIRECTING THE USER TO LOGIN PAGE AFTER LOGING OUT ----------*/
    res.redirect('/login')
})

app.get('/homepage', checkAuthorization, (req, res)=>{
    const message = req.flash()
    if(message.msg){
        return res.send(notificationRender(true, message.msg, 'homepage'))
    }
    if(message.emsg){
        return res.send(notificationRender(false, message.emsg, 'homepage'))
    }
    else{
        return res.send(pageRender(req.user, 'homepage'))
    }
    // res.sendFile(path.join(__dirname, "markups", "homepage.html"))
})

app.get('/feedback', checkAuthorization, (req, res)=>{
    res.send(pageRender(req.user, 'feedback'))
})

app.post('/feedback', checkAuthorization, (req, res)=>{

    const feedback = req.body.feedback
    user = req.user

    const html = `<h1>hey Team Keplons</h1>
    <h3>Here is a feedback for The Monk Store</h3>
    <p>${feedback}</p>
    <p>Regards,<br>${user.name},<br><a>${user.email}</a></p>`

    const mailOptions = {
    from: `${user.name} <${EMAIL}>`,
    to: EMAIL,
    subject: 'FEEDBACK',
    html: html
    }

    /*---------- SENDING MAIL KEPLONS EMAIL ADDRESS ----------*/
    transport.sendMail(mailOptions, (err, info)=>{
    if(err){
    console.log(err)
    req.flash('emsg', 'Something went wrong!')
    return res.redirect('/homepage')
    }
    else{
    console.log('mail sent')
    req.flash('msg', 'Feedback sent')
    return res.redirect('/homepage')
    }
    })
})

app.post('/order', checkAuthorization, async (req, res)=>{
    const product = {
        id: req.body.id,
        category: req.body.category
    }
    console.log('order request recieved', product)
    let success = await orderHelper(req.user, product)
    if(success.val){
        const html = `<h1>hey, ${req.user.name}</h1>
        <h3>ORDER PLACED</h3>
        <p>PRODUCT NAME: ${success.productOrdered.name}</p>
        <p>PRODUCT PRICE: Rs. ${success.productOrdered.price}/-</p>
        <p>DELIVERY MODE: Cash On Delivery(COD)</p>
        <br>
        <p>Thanks for shopping with The Monk Store,</p>
        <p>Stay Home, Stay Safe</p>
        <br><br>
        <p>For any query:</p>
        <p>Mail us: support@monkstore.com </p>
        <p>Call us: 1234567890, 0987654321 (TOLL-FREE) </p>`

        const mailOptions = {
        from: `"The Monk Store" <${EMAIL}>`,
        to: req.user.email,
        subject: 'ORDER REQUEST',
        html: html
        }
        
        /*---------- SENDING A CONFIRMATION EMAIL TO THE USER AFTER SUCCESSFULL ORDER ----------*/
        transport.sendMail(mailOptions, (err, info)=>{
        if(err){
            console.log(err)
            req.flash('emsg', 'Something went wrong!')
            return res.redirect(`/product-view?id=${product.id}&category=${product.category}`)
        }
        else{
            console.log('mail sent')
            req.flash('msg', 'Order placed!')
            return res.redirect(`/product-view?id=${product.id}&category=${product.category}`)
        }
        })
    }
    else{
        req.flash('emsg', 'Something went wrong!')
        return res.redirect(`/product-view?id=${product.id}&category=${product.category}`)
    }
})

app.get('/order-history', checkAuthorization, async (req, res)=>{
    let orderHistory = await productRender.orderHistoryRender(req.user)
    res.send(orderHistory)
})

app.get('/product-view', checkAuthorization, async (req, res)=>{
    product = {
        id : req.query.id,
        category : req.querycategory
    }

    const message = req.flash()
    if(message.msg){
        let productView = await productRender.productView(true, message.msg, req.user, product)
        return res.send(productView)    }
    if(message.emsg){
        let productView = await productRender.productView(fale, message.emsgreturn , req.user, product)
        return res.send(productView)    }
    else{
        let productView = await productRender.productView('', '', req.user, product)
        return res.send(productView)    }


})

app.get('/about-us', checkAuthorization, (req, res)=>{
    res.send(pageRender(req.user, 'about-us'))
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

app.get('/seller-login', checkAuthorization, (req, res)=>{
    const message = req.flash()
    if(message.msg){
        return res.send(notificationRender(true, message.msg, 'seller-login', req.user))
    }
    if(message.emsg){
        return res.send(notificationRender(false, message.emsg, 'seller-login', req.user))
    }
    else{
        return res.send(pageRender(req.user, 'seller-login'))
    }
})

app.post('/seller-login', async (req, res)=>{
    const reqUser = {
        email: req.body.email,
        password: req.body.password,
        userToken: req.body.emailToken
    }

    console.log('seller-login request recieved', reqUser)

    /*---------- FINDING USER ----------*/
    const user = await getUserByEmail(reqUser.userToken)

    /*---------- CHECKING IF THE CREDENTIALS ENTERED ARE CORRECT OR NOT ----------*/
    if(user.email != reqUser.email){
        return res.send(notificationRender(false, 'User not found!', 'seller-login', req.body.emailToken))
    }
    if(!(user.password == reqUser.password)){
        return res.send(notificationRender(false, 'Password incorrect!', 'seller-login', req.body.emailToken))
    }
    /*---------- CHECKING CREDENTIALS END ----------*/

    /*---------- UPDATING THE SELLER STATUS FROM FALSE TO TRUE ----------*/
    /*---------- AFTER UPDATING: SENT A WELCOME MAIL TO USER FOR BECOMING A SELLER ----------*/
    pool.query(`UPDATE users SET seller = $1 WHERE id = $2`, ['true', user.id], (err, result)=>{
        if (err){
            console.log(err)
        }
        else{
            const html = `<h1>hey, ${user.name}</h1>
                        <h3>Welcome to Monk store</h3>
                        <p>Thank you for becoming a seller.</p>`

            const mailOptions = {
                from: `"The Monk Store" <${EMAIL}>`,
                to: user.email,
                subject: 'Welcome to Monk Store',
                html: html
            }

            /*---------- SENDING MAIL TO USER EMAIL ADDRESS ----------*/
            transport.sendMail(mailOptions, (err, info)=>{
                if(err){
                    console.log(err)
                    req.flash('emsg', 'Something went wrong!')
                    return res.redirect('/seller-login')
                }
                else{
                    console.log('mail sent')

                    pool.query(`SELECT * FROM users WHERE id = $1`, [user.id], (err, USER)=>{
                        if(err){
                            console.log(err)
                        }
                        else{

                        /*---------- CREATING A NEW USER+SELLER SESSION USING JWT VIA UPDATING THE COOKIES ----------*/
                        /*---------- SESSIONS LAST FOR ABOUT 20 MINUTES ----------*/
                        const user = USER.rows[0]
                        const token = jwt.sign({user}, 'secret', { expiresIn: '20m' })
                        res.cookie('token', token, {maxAge: 1000*60*20 ,httpOnly: true})
                        /*---------- SESSION CREATED ----------*/

                        return res.redirect('/seller')
                        }
                    })
                }
            })
        }
    })

})

app.get('/seller', [checkAuthorization, checkSeller, (req, res)=>{
    res.send(`hello, ${req.user.name}. Welcome to seller homepage.`)
}])

app.get('/laptop', checkAuthorization, async (req, res)=>{             
    let laptop = await productRender.laptopRender()
    return res.send(laptop)
})

app.get('/smartphone', checkAuthorization, async (req, res)=>{
    let smartphone = await productRender.smartphoneRender()
    return res.send(smartphone)
})

app.get('/storage', checkAuthorization, async (req, res)=>{
    let storage = await productRender.storageRender()
    return res.send(storage)        
})

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})