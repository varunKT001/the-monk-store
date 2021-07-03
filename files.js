let message_color
let message

let spinner = `<div class="spinner">
                <div class="circle"></div>
                </div>
                <script src="/spinner.js"></script>`

let loaderCSS = "/spinner.css"

function notificationRender(message_type, message_text, fileName) {
    const layout = `<head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta charset="utf-8" />
                    <title>Login / Sign Up Form</title>
                    <link rel="preconnect" href="https://fonts.gstatic.com">
                    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet">
                    <link rel="stylesheet" href="authentication.css" />
                    <link rel="stylesheet" href="error.css">
                    <link rel="stylesheet" href=${loaderCSS} />
                    </head>`

    const layoutSettings = `<!DOCTYPE html>
                            <head>
                            <meta charset="UTF-8">
                            <title>Settings</title>
                            <link rel="stylesheet" href="settings.css">
                            <link rel="stylesheet" href="footer.css">
                            </head>`

    if (message_type) {
        message_color = 'lightgreen'
    }
    else {
        message_color = '#ff7271'
    }

    message = message_text

    if (fileName == 'login') {
        let login = layout + `<!DOCTYPE html>
                    <body>
                    <div class="notification" style="background-color: ${message_color};">${message}</div>
                    <script>
                    let div = document.getElementsByClassName('notification')[0]
                    setTimeout(() => {
                        div.style.animation = "slideBackToTop 250ms ease-in"
                        setTimeout(() => {
                        div.style["background-color"] = ""
                        div.style.color = "#ffffff"
                        setTimeout(() => {
                            div.remove()
                        }, 100);
                        }, 250);
                    }, 5000);
                    </script>
                    <div class="container">
                        <form class="form" id="login" method="POST" action="/login">
                        <img class="brand-logo" src="icons/3.png" alt="" />
                        <h1 class="form__title">Login</h1>
                        <div class="form__message form__message--error"></div>
                        <div class="form__input-group">
                            <input type="text" class="form__input" autofocus placeholder="Username" name="name" />
                            <div class="form__input-error-message"></div>
                        </div>
                        <div class="form__input-group">
                            <input type="password" class="form__input" autofocus placeholder="Password" name="password" />
                            <div class="form__input-error-message"></div>
                        </div>
                        <button class="form__button" type="submit">Continue</button>
                        <p class="form__text">
                            <a href="/forgot-password" class="form__link">Forgot your password?</a>
                        </p>
                        <p class="form__text">
                            <a class="form__link" href="/register" id="linkCreateAccount">Don't have an account? Create account</a>
                        </p>
                        </form>
                    </div>
                    ${spinner}
                </body>
                `
        return login
    }
    else if (fileName == 'register') {
        let register = layout + `<!DOCTYPE html>                        
                                    <body>
                                    <div class="notification" style="background-color: ${message_color};">${message}</div>
                                    <script>
                                    let div = document.getElementsByClassName('notification')[0]
                                    setTimeout(() => {
                                        div.style.animation = "slideBackToTop 250ms ease-in"
                                        setTimeout(() => {
                                        div.style["background-color"] = ""
                                        div.style.color = "#ffffff"
                                        setTimeout(() => {
                                            div.remove()
                                        }, 100);
                                        }, 250);
                                    }, 5000);
                                    </script>
                                    <div class="container">
                                        <form class="form" id="createAccount" method="POST" action="/register">
                                            <img class="brand-logo" src="icons/3.png" alt="" />
                                            <h1 class="form__title">Create Account</h1>
                                            <div class="form__message form__message--error"></div>
                                            <div class="form__input-group">
                                                <input type="text" id="signupUsername" class="form__input" autofocus placeholder="Username" name="name" />
                                                <div class="form__input-error-message"></div>
                                            </div>
                                            <div class="form__input-group">
                                                <input type="text" class="form__input" autofocus placeholder="Email Address" name="email" />
                                                <div class="form__input-error-message"></div>
                                            </div>
                                            <div class="form__input-group">
                                                <input type="password" class="form__input" autofocus placeholder="Password" name="password" />
                                                <div class="form__input-error-message"></div>
                                            </div>
                                            <div class="form__input-group">
                                                <input type="password" class="form__input" autofocus placeholder="Confirm password"
                                                    name="confirmpassword" />
                                                <div class="form__input-error-message"></div>
                                            </div>
                                            <button class="form__button" type="submit">Continue</button>
                                            <p class="form__text">
                                                <a class="form__link" href="/login" id="linkLogin">Already have an account? Sign in</a>
                                            </p>
                                        </form>
                                    </div>
                                    ${spinner}
                                </body>
                                `
        return register
    }

    if (fileName == 'forgot-password'){
        let forgotPasswordEmail = layout + `<body>
                                            <div class="notification" style="background-color: ${message_color};">${message}</div>
                                            <script>
                                            let div = document.getElementsByClassName('notification')[0]
                                            setTimeout(() => {
                                                div.style.animation = "slideBackToTop 250ms ease-in"
                                                setTimeout(() => {
                                                div.style["background-color"] = ""
                                                div.style.color = "#ffffff"
                                                setTimeout(() => {
                                                    div.remove()
                                                }, 100);
                                                }, 250);
                                            }, 5000);
                                            </script>
                                            <div class="container">
                                            <form class="form" id="login" method="POST" action="/forgot-password">
                                                <img class="brand-logo" src="images/The Monk Store.png" alt="" />
                                                <h1 class="form__title">Password Reset</h1>
                                                <div class="form__message form__message--error"></div>
                                                <div class="form__input-group">
                                                <input
                                                    type="email"
                                                    class="form__input"
                                                    autofocus
                                                    placeholder="Email"
                                                    name="email"
                                                />
                                                <div class="form__input-error-message"></div>
                                                </div>
                                                <button class="form__button" type="submit">Continue</button>
                                            </form>
                                            </div>
                                            ${spinner}
                                        </body>`
    return forgotPasswordEmail
    }

    if (fileName == 'settings'){
        let settings = layoutSettings + `<body>
                                            <div class="notification" style="background-color: ${message_color};">${message}</div>
                                            <script>
                                            let div = document.getElementsByClassName('notification')[0]
                                            setTimeout(() => {
                                                div.style.animation = "slideBackToTop 250ms ease-in"
                                                setTimeout(() => {
                                                div.style["background-color"] = ""
                                                div.style.color = "#ffffff"
                                                setTimeout(() => {
                                                    div.remove()
                                                }, 100);
                                                }, 250);
                                            }, 5000);
                                            </script>
                                            <div class="wrapper">
                                            <div class="left">
                                                <ul>
                                        
                                                <li><img class="icon" src="icons/profile.png" alt=""><span class="profile">Profile</span></li>
                                        
                                                <li><img class="icon" src="icons/location.png" alt=""><span class="list_item">Delivery Address</span></li>
                                        
                                                <li><img class="icon" src="icons/payment.png" alt=""><span class="list_item">Payment Method</span></li>
                                                </ul>
                                            </div>
                                            <div class="right">
                                                <h2>Settings</h2>
                                                <img class="avatar" src="icons/profile_avatar.png" alt="">
                                                <div class="form">
                                                <form>
                                                    <div class="field">
                                                    <form for="">Email-ID</form>
                                                    <input class="full_name" type="text" name="full-name"/>
                                                    </div>
                                                    <div class="field">
                                                    <form for="">Mobile Number</form>
                                                    <input class="full_name" type="text" name="full-name"/>
                                                    </div>
                                                    <div class="field">
                                                    <form for="">Gender</form>
                                                    <input class="full_name" type="text" name="full-name"/>
                                                    </div>
                                                    <div class="field">
                                                    <form for="">Address</form>
                                                    <input class="full_name" type="text" name="full-name"/>
                                                    </div>
                                                </form>
                                                </div>
                                                <div class="bottom">
                                                <a href="#"><button class="button_left" type="submit" name="button">Save Changes</button></a>
                                                <a href="/homepage"><button class="button_right" type="cancel" name="button">Cancel</button></a>
                                                </div>
                                            </div>
                                            </div>
                                            <p class="copyright">&copy Copyrights. All rights reservered, 2021</p>
                                        </body>`
    return settings
    }
}

const pageRender = (user, page)=>{
    const layoutHomepage = `<!DOCTYPE html>
                    <html language
                    <head>
                        <meta charset="UTF-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width">
                        <title>The Monk Store</title>
                        <link rel="stylesheet" href="homepage.css">
                        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Nunito"/>
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                    
                    </head>`

    const layoutFeedback = `<!DOCTYPE html>
                            <head>
                                <meta charset="UTF-8">
                                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <title>Feedback</title>
                                <link rel="stylesheet" href="feedback.css">
                                <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Nunito" />
                            </head>`

    const layoutOrderHistory = `<!DOCTYPE html>
                                <head>
                                <meta charset="UTF-8">
                                <title>The Monk Store</title>
                                <link rel="stylesheet" href="order-history.css">
                                <link rel="stylesheet" href="footer.css">
                                </head>`

    const layoutForgotPasswordEmail = `<!DOCTYPE html>
                                        <head>
                                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                                        <meta charset="utf-8" />
                                        <title>Login / Sign Up Form</title>
                                        <link rel="preconnect" href="https://fonts.gstatic.com" />
                                        <link
                                            href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap"
                                            rel="stylesheet"
                                        />
                                        <link rel="stylesheet" href="authentication.css" />
                                        <link rel="stylesheet" href="error.css" />
                                        <link rel="stylesheet" href=${loaderCSS} />
                                        </head>`
                    
    const layoutPasswordReset = `<!DOCTYPE html>
                                    <head>
                                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                                    <meta charset="utf-8" />
                                    <title>Login / Sign Up Form</title>
                                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                                    <link
                                        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap"
                                        rel="stylesheet"
                                    />
                                    <link rel="stylesheet" href="/authentication.css" />
                                    <link rel="stylesheet" href="/error.css" />
                                    <link rel="stylesheet" href=${loaderCSS} />
                                    </head>`

    const layoutSettings = `<!DOCTYPE html>
                            <head>
                            <meta charset="UTF-8">
                            <title>Settings</title>
                            <link rel="stylesheet" href="settings.css">
                            <link rel="stylesheet" href="footer.css">
                            </head>`
    
    if (page == 'homepage'){
        let homepage = layoutHomepage + `<body>
                                    <div class="topbar">
                                        <div class="itemLogo"><a href="/homepage"><img src="images/The Monk store.png" height="75px" width="300px"></a></div>
                                
                                        <div class="search">
                                        <div class="Searchbar">
                                            <input type="text" placeholder=" Search.."> </div>
                                        
                                        <div class="SearchButton">
                                            <button type="submit" class="searchBtn">
                                            <i class="fa fa-search fa-2x"></i>
                                            </button>
                                        </div>
                                        </div>
                                    </div>
                                
                                    <div class="container1">
                                    <div class="user-details">Hi, ${user.name}</div>
                                    <div class="options">
                                        <a href="profile.html" id="option1"><img src="icons/pencil 1.png" height="25px"><br> <p>Edit</p></a>
                                        <a href="cart.html" id="option2"><img src="icons/shopping-cart 1.png" height="25px"><br><p> Cart</p></a>
                                        <a href="/order-history" id="option3"><img src="icons/Time Machine.png" height="25px"><br><p> Orders</p></a>
                                    </div>
                                
                                    <div class="sidenav">
                                        <div class="line item" id="one"></div>
                                        <a href="/settings" class="item"><b>Settings</b></a>
                                        <div class="line item" id="two"></div>
                                        <a href="/feedback" class="item"><b>Help & Feedback</b></a>
                                        <div class="line item" id="three"></div>
                                        <form action="/logout" method="get">
                                        <button class="Logout item" type="submit"><b>Log out</b></button>
                                        </form>
                                        <div class="line" id="four"></div>
                                    </div>
             
                                    </div>
                                    
                                    <div class="grid">
                                        <div class="product" id="pro1"><p id="start"><b> Phones <img src="icons/down-arrow 1.png" width="20px"></b></p></div>
                                        <div class="product"><p><b> Laptops <img src="icons/down-arrow 1.png" width="20px"></b></p></div>
                                        <div class="product" id="pro3"><p id="end"><b> Storages <img src="icons/down-arrow 1.png" width="20px"></b></p></div>
                                    </div>
                                    
                                    <div class="poster">
                                        <img class="poster-image" src="images/covidPoster.jpeg">
                                    </div>
                                </body>`
        return homepage
    }     
    
    if (page == 'feedback'){
        let feedback = layoutFeedback + `<body>
                                            <div class="topnav">
                                                <div class="navbar">
                                                    <!-- remember to remove class navbar at end if not required-->
                                                    <a href="/homepage"><img id="Logo" src="images/The Monk store.png" height="75px" width="300px"></a>
                                                    <h1 id="heading">Help and Feedback</h1>
                                                </div>
                                            </div>
                                        
                                            <div class="FAQgrid">
                                                <h1 id="headFAQ"><img src="icons/Question Mark.png" id="FAQ"> FAQs</h1>
                                                <div class="content" id="C1">
                                                    <p><b>Q1. What type of products are available in MONK STORE ?</b><br>Ans - Our store offers a basic variety
                                                        of electronics and their accessories</p>
                                                </div>
                                                <div class="content" id="C2">
                                                    <p><b>Q2. Can I return my product if ordered by mistake ?</b><br>Ans- Sorry! but we do not have a return
                                                        policy, so please be sure before buying.</p>
                                                </div>
                                                <div class="content" id="C3">
                                                    <p><b>Q3. What if I recieve a damaged product ?</b><br>Ans- If you recieve a damaged product please call us
                                                        on our helpline we will try to solve the problem as soon as possible.</p>
                                                </div>
                                                <div class="content" id="C4">
                                                    <p><b>Q4. How to set my delivery address ?</b><br>Ans- To change your delivery address go to profile page
                                                        and enter/edit it from there.</p>
                                                </div>
                                        
                                            </div>
                                        
                                            <div class="feedback">
                                                <div class="headFeedback">
                                                    <h1 id="headFAQ"><img src="icons/Feedback.png" id="feedback"> Feedback</h1>
                                                    <textarea name="feed" placeholder=" Write your review here" id="feed" cols="38" rows="12"></textarea>
                                                </div>
                                        
                                                <div class="send">
                                                    <button type="submit" id="Submit">Submit</button>
                                                    <p><b>For any further query please contact toll-free no.
                                                            1800-257-2399 or 30304499
                                                    </p></b>
                                                </div>
                                            </div>
                                        </body>`
        return feedback
    }

    if (page == 'order-history'){
        let orderHistory = layoutOrderHistory + `<body>
                                                    <div class="container">
                                                    
                                                    <div class="row">
                                                        <div class="order-tittle">
                                                        <a href="/homepage"><img src="images/the-monk-store-order-history.png" class="main-logo" height="80px" width="250px"><a>
                                                        </div>
                                                    </div>
                                                    
                                                    <div class="row title-row">
                                                        <div class="page-title">
                                                        <h1>Order History</h1>
                                                        </div>
                                                    </div>  
                                                    
                                                    <div class="row order_sorter">
                                                        <ul id="toggle-orders">
                                                        <li class="first"></li>
                                                        <li class="oh selected"><a href="#">Order History</a></li>
                                                        <li class="fo"><a href="#">Cart Deck</a></li>
                                                        </ul>
                                                    </div>
                                                    
                                                    <div class="row" id="order-history">
                                                    
                                                        <div class="row order-summary">
                                                        <div class="totalspent-orders">
                                                            <h2>Rs.1,30,525.00</h2>
                                                            <h3>Total Spent</h3>
                                                        </div>
                                                        <div class="printqty-orders">
                                                            <h2>05</h2>
                                                            <h3>Total Orders</h3>
                                                        </div>
                                                        <div class="total_gst">
                                                            <h2>Rs.350.00</h2>
                                                            <h3>Total GST Paid</h3>
                                                        </div>
                                                        <div class="ytd-orders">
                                                            <h2>01</h2>
                                                            <h3>Refund Request</h3>
                                                        </div>
                                                        </div>
                                                            
                                                        <div class="order-container">
                                                        <div class="header">
                                                            <div class="row">
                                                            <div class="col-1"><span>ORDERS PLACED</span><span>Jun 27, 2021</span></div>
                                                            <div class="col-2"><span>TOTAL</span><span>Rs.74,999/-</span></div>
                                                            <div class="col-3"><span>SHIPPED TO</span><span>Varun Kumar Tiwari</span></div>
                                                            <div class="col-4"><span>ORDER NUMBER</span><span>XXXXX</span></div>
                                                            </div>
                                                        </div>
                                                        <div class="box">
                                                            <div class="row">
                                                            <div class="col-1">
                                                                <img src="images/lenevo leigon.jpg" alt="">
                                                            </div>
                                                            <div class="col-2">
                                                                <span class="product-title">Lenovo Legion 5 AMD Ryzen 5 4600H 15.6 inch (39.62 cms) Full HD Gaming Laptop (8GB/1TB HDD + 256GB SSD/Windows 10/120 Hz/NVIDIA GTX 1650 4GB GDDR6 Graphics/Phantom Black/2.3Kg)</span>
                                                                <p>Order Status: Delivered <br>
                                                                Total Quantity: 1 <br>
                                                                Billed On: Jun 27, 2021 </p>
                                                                <a href="#" class="btn-default"><i class="fa fa-repeat" aria-hidden="true"></i> Re-Order</a>
                                                            </div>
                                                            <div class="col-3">
                                                            <a href="#" class="btn-default"><i class="fa fa-download" aria-hidden="true"></i> Download Bill</a>
                                                            </div>
                                                            </div>
                                                        </div>
                                                        </div>
                                                    </div>
                                                    
                                                        
                                                        
                                                        
                                                    <div id="future-orders">    
                                                        <div class="order-container">
                                                        <div class="header">
                                                            <div class="row">
                                                            <div class="col-1"><span>ORDERS PLACED</span><span>Jan 09, 2021</span></div>
                                                            <div class="col-2"><span>TOTAL</span><span>Rs.9,499.00/-</span></div>
                                                            <div class="col-3"><span>SHIPPED TO</span><span>Varun Kumar Tiwari</span></div>
                                                            <div class="col-4"><span>ORDER NUMBER</span><span>XXXXX</span></div>
                                                            </div>
                                                        </div>
                                                        <div class="box"> 
                                                            <div class="row">
                                                            <div class="col-1">
                                                                <img src="images/smsung.jpg" alt="">
                                                            </div>
                                                            <div class="col-2">
                                                                <span class="product-title">Samsung Galaxy M11 (Black, 4GB RAM, 64GB Storage)<i class="fa fa-pencil-square-o" aria-hidden="true"></i></span>
                                                                <p>Order Status: Delivered <br>
                                                                Total Quantity 01 <br>
                                                                Billed On: Jan 09, 2021 </p>
                                                            <a href="#" class="btn-default"><i class="fa fa-repeat" aria-hidden="true"></i> Re-Order</a>
                                                            </div>
                                                            <div class="col-3">
                                                            <a href="#" class="btn-default"><i class="fa fa-download" aria-hidden="true"></i> Download Bill</a>
                                                            </div>
                                                            </div>
                                                        </div>
                                                        </div>
                                                    
                                                        <div id="future-orders-1">    
                                                        <div class="order-container">
                                                        <div class="header">
                                                            <div class="row">
                                                            <div class="col-1"><span>ORDERS PLACED</span><span>Dec 28, 2020</span></div>
                                                            <div class="col-2"><span>TOTAL</span><span>Rs.11,839.00/-</span></div>
                                                            <div class="col-3"><span>SHIPPED TO</span><span>Varun Kumar Tiwari</span></div>
                                                            <div class="col-4"><span>ORDER NUMBER</span><span>XXXXX</span></div>
                                                            </div>
                                                        </div>
                                                        <div class="box"> 
                                                            <div class="row">
                                                            <div class="col-1">
                                                                <img src="images/Sandisk.jpg" alt="">
                                                            </div>
                                                            <div class="col-2">
                                                                <span class="product-title">SanDisk Ultra Dual Drive Luxe Type C Flash Drive 1TB, 5Y - SDDDC4-1T00-I35<i class="fa fa-pencil-square-o" aria-hidden="true"></i></span>
                                                                <p>Order Status: Delivered <br>
                                                                Total Quantity 01 <br>
                                                                Billed On: Dec 28, 2020 </p>
                                                            <a href="#" class="btn-default"><i class="fa fa-repeat" aria-hidden="true"></i> Re-Order</a>
                                                            </div>
                                                            <div class="col-3">
                                                            <a href="#" class="btn-default"><i class="fa fa-download" aria-hidden="true"></i> Download Bill</a>
                                                            </div>
                                                            </div>
                                                        </div>
                                                        </div>
                                                    
                                                        <div id="future-orders-2">    
                                                        <div class="order-container">
                                                        <div class="header">
                                                            <div class="row">
                                                            <div class="col-1"><span>ORDERS PLACED</span><span>Jul 11, 2020</span></div>
                                                            <div class="col-2"><span>TOTAL</span><span>Rs. 3,839.00/-</span></div>
                                                            <div class="col-3"><span>SHIPPED TO</span><span>Varun Kumar Tiwari</span></div>
                                                            <div class="col-4"><span>ORDER NUMBER</span><span>XXXXX</span></div>
                                                            </div>
                                                        </div>
                                                        <div class="box"> 
                                                            <div class="row">
                                                            <div class="col-1">
                                                                <img src="images/wd elements.jpg" alt="">
                                                            </div>
                                                            <div class="col-2">
                                                                <span class="product-title">Western Digital Elements 1TB Portable External Hard Drive (Black)<i class="fa fa-pencil-square-o" aria-hidden="true"></i></span>
                                                                <p>Order Status: Delivered <br>
                                                                Total Quantity 01 <br>
                                                                Billed On: Jul 11, 2020 </p>
                                                            <a href="#" class="btn-default"><i class="fa fa-repeat" aria-hidden="true"></i> Re-Order</a>
                                                            </div>
                                                            <div class="col-3">
                                                            <a href="#" class="btn-default"><i class="fa fa-download" aria-hidden="true"></i> Download Bill</a>
                                                            </div>
                                                            </div>
                                                        </div>
                                                        </div>
                                                    
                                                        <div id="future-orders-3">    
                                                        <div class="order-container">
                                                        <div class="header">
                                                            <div class="row">
                                                            <div class="col-1"><span>ORDERS PLACED</span><span>Jul 11, 2020</span></div>
                                                            <div class="col-2"><span>TOTAL</span><span>Rs.29,999.00/-</span></div>
                                                            <div class="col-3"><span>SHIPPED TO</span><span>Varun Kumar Tiwari</span></div>
                                                            <div class="col-4"><span>ORDER NUMBER</span><span>XXXXX</span></div>
                                                            </div>
                                                        </div>
                                                        <div class="box"> 
                                                            <div class="row">
                                                            <div class="col-1">
                                                                <img src="images/mi 11x.jpg" alt="">
                                                            </div>
                                                            <div class="col-2">
                                                                <span class="product-title">Mi 11X 5G Celestial Silver 6GB RAM 128GB ROM | SD 870 | DisplayMate A+ rated E4 AMOLED<i class="fa fa-pencil-square-o" aria-hidden="true"></i></span>
                                                                <p>Order Status: Delivered <br>
                                                                Total Quantity 01 <br>
                                                                Billed On: Jul 11, 2020 </p>
                                                            <a href="#" class="btn-default"><i class="fa fa-repeat" aria-hidden="true"></i> Re-Order</a>
                                                            </div>
                                                            <div class="col-3">
                                                            <a href="#" class="btn-default"><i class="fa fa-download" aria-hidden="true"></i> Download Bill</a>
                                                            </div>
                                                            </div>
                                                        </div>
                                                        </div>
                                                    
                                                    </div>      
                                                    </div>
                                                    <p class="copyright">&copy Copyrights. All rights reservered, 2021</p>  
                                                    </body>`

        return orderHistory
    } 

    if (page == 'forgot-password'){
        let forgotPasswordEmail = layoutForgotPasswordEmail + `<body>
                                                                <div class="container">
                                                                <form class="form" id="login" method="POST" action="/forgot-password">
                                                                    <img class="brand-logo" src="images/The Monk Store.png" alt="" />
                                                                    <h1 class="form__title">Password Reset</h1>
                                                                    <div class="form__message form__message--error"></div>
                                                                    <div class="form__input-group">
                                                                    <input
                                                                        type="email"
                                                                        class="form__input"
                                                                        autofocus
                                                                        placeholder="Email"
                                                                        name="email"
                                                                    />
                                                                    <div class="form__input-error-message"></div>
                                                                    </div>
                                                                    <button class="form__button" type="submit">Continue</button>
                                                                </form>
                                                                </div>
                                                                ${spinner}
                                                            </body>
                                                            `
    return forgotPasswordEmail
    }

    if(page == 'password-reset'){
        let passwordReset = layoutPasswordReset + `<body>
                                                    <div class="container">
                                                    <form class="form" id="login" method="POST" action="/account/password-reset">
                                                        <img class="brand-logo" src="/images/The Monk Store.png" alt="" />
                                                        <h1 class="form__title">Password Reset</h1>
                                                        <div class="form__message form__message--error"></div>
                                                        <div class="form__input-group">
                                                        <input
                                                            type="password"
                                                            class="form__input"
                                                            autofocus
                                                            placeholder="password"
                                                            name="password"
                                                        />
                                                        <div class="form__input-error-message"></div>
                                                        </div>
                                                        <div class="form__input-group">
                                                        <input
                                                            type="password"
                                                            class="form__input"
                                                            autofocus
                                                            placeholder="Confirm password"
                                                            name="confirmPassword"
                                                        />
                                                        <div class="form__input-error-message"></div>
                                                        </div>
                                                        <div class="form__input-group">
                                                        <input
                                                            type="hidden"
                                                            class="form__input"
                                                            autofocus
                                                            placeholder=""
                                                            name="userToken"
                                                            value="${user}"
                                                        />
                                                        <div class="form__input-error-message"></div>
                                                        </div>
                                                        <button class="form__button" type="submit">Reset</button>
                                                    </form>
                                                    </div>
                                                    ${spinner}
                                                </body>
                                                `
    return passwordReset
    }

    if(page == 'settings'){
        let settings = layoutSettings + `<body>
                                            <div class="wrapper">
                                            <div class="left">
                                                <ul>
                                        
                                                <li><img class="icon" src="icons/profile.png" alt=""><span class="profile">Profile</span></li>
                                        
                                                <li><img class="icon" src="icons/location.png" alt=""><span class="list_item">Delivery Address</span></li>
                                        
                                                <li><img class="icon" src="icons/payment.png" alt=""><span class="list_item">Payment Method</span></li>
                                                </ul>
                                            </div>
                                            <div class="right">
                                                <h2>Settings</h2>
                                                <img class="avatar" src="icons/profile_avatar.png" alt="">
                                                <div class="form">
                                                <form>
                                                    <div class="field">
                                                    <form for="email">Email-ID</form>
                                                    <input class="full_name" type="email" name="email" value="${user.email}"/>
                                                    </div>
                                                    <div class="field">
                                                    <form for="phoneNumber">Mobile Number</form>
                                                    <input class="full_name" type="text" name="phoneNumber" value="${user.phoneNumber}"/>
                                                    </div>
                                                    <div class="field">
                                                    <form for="gender">Gender</form>
                                                    <input class="full_name" type="text" name="gender" value="${user.gender}"/>
                                                    </div>
                                                    <div class="field">
                                                    <form for="address">Address</form>
                                                    <input class="full_name" type="text" name="address" value="${user.address}"/>
                                                    </div>
                                                </form>
                                                </div>
                                                <div class="bottom">
                                                <a href="#"><button class="button_left" type="submit" name="button">Save Changes</button></a>
                                                <a href="/homepage"><button class="button_right" type="cancel" name="button">Cancel</button></a>
                                                </div>
                                            </div>
                                            </div>
                                            <p class="copyright">&copy Copyrights. All rights reservered, 2021</p>
                                        </body>`
    return settings
    }

}

module.exports = {
    notificationRender, 
    pageRender
}