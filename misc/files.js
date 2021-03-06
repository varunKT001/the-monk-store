const { load } = require('dotenv')
const { pool } = require('../config/dbconfig')

let message_color
let message

let spinner = `<div class="spinner">
                <div class="circle"></div>
                </div>
                <script src="/js/spinner.js"></script>`
let homepageSpinner = `<div class="spinner">
                        <div class="circle"></div>
                        </div>
                        <script src="/js/homepage-spinner.js"></script>`

let loaderCSS = "/css/spinner.css"

function notificationRender(message_type, message_text, fileName, user = { email : 'user@user.com'}) {
    const layout = `<head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta charset="utf-8" />
                    <title>Login / Sign Up Form</title>
                    <link rel="preconnect" href="https://fonts.gstatic.com">
                    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet">
                    <link rel="stylesheet" href="/css/authentication.css" />
                    <link rel="stylesheet" href="/css/error.css">
                    <link rel="stylesheet" href=${loaderCSS} />
                    </head>`

    const layoutSettings = `<!DOCTYPE html>
                            <head>
                            <meta charset="UTF-8">
                            <title>Settings</title>
                            <link rel="stylesheet" href="css/settings.css">
                            <link rel="stylesheet" href="css/footer.css">
                            <link rel="stylesheet" href="css/homepage-error.css">
                            </head>`

    const layoutHomepage = `<!DOCTYPE html>
    
                            <head>
                            <meta charset="UTF-8" />
                            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                            <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
                            <link rel="stylesheet" href="css/homepage.css" />
                            <link rel="stylesheet" href="css/homepage-error.css" />
                            <link rel="stylesheet" href=css/homepage-spinner.css />
                            
                            <title>Home-Page</title>
                            </head>`

    const layoutSellerHomepage = `<!DOCTYPE html>
                            <html lang="en">
                            
                            <head>
                            <meta charset="UTF-8" />
                            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                            <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
                            <link rel="stylesheet" href="css/seller-homepage.css" />
                            <link rel="stylesheet" href="css/homepage-error.css" />
                            <link rel="stylesheet" href="css/spinner.css" />
                            
                            <title>The Monk Store-Seller Page</title>
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
                            <input type="text" class="form__input" autofocus placeholder="email" name="email" />
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
        let register = layout + `<body>
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
                                                <img class="brand-logo" src="icons/3.png" alt="" />
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

    if(fileName == 'password-reset'){
        let passwordReset = layout + `<body>
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
                                                    <form class="form" id="login" method="POST" action="/account/password-reset">
                                                        <img class="brand-logo" src="/icons/3.png" alt="" />
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

    if (fileName == 'settings'){
        let settings = layoutSettings + `<body>
                                            <div class="notification">
                                            <div class="notification-container" style="background-color: ${message_color};">${message}</div>
                                            </div>
                                            <script>
                                            let div = document.getElementsByClassName('notification')[0]
                                            setTimeout(() => {
                                                div.style.animation = "slideBackToTop 250ms ease-in"
                                                setTimeout(() => {
                                                div.style["background-color"] = ""
                                                div.style.color = "transparent"
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
                                                <form action="/settings" method="POST">
                                                    <div class="field">
                                                    <label for="email">Email-ID</label>
                                                    <div class="full_name">${user.email}</div>
                                                    </div>
                                                    <div class="field">
                                                    <label for="phoneNumber">Mobile Number</label>
                                                    <input class="full_name" type="text" name="phoneNumber" value=${user.phonenumber} />
                                                    </div>
                                                    <div class="field">
                                                    <label for="gender">Gender</label>
                                                    <input class="full_name" type="text" name="gender" value="${user.gender}"/>
                                                    </div>
                                                    <div class="field">
                                                    <label for="address">Address</label>
                                                    <input class="full_name" type="text" name="address" value="${user.address}"/>
                                                
                                                </div>
                                                <div class="bottom">
                                                <button class="button_left" type="submit" name="button">Save Changes</button>
                                                <a href="/homepage"><div class="button_right" style="display: inline-block; width: 30%; padding: 14px; text-align: center;" name="button">Cancel</div></a>
                                                </div>
                                                </form>
                                            </div>
                                            </div>
                                            </div>
                                            <p class="copyright">&copy Copyrights. All rights reservered, 2021</p>
                                        </body>`
    return settings
    }
    if (fileName == 'seller-login'){
        let sellerLogin = layout + `<body>
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
                                            <form class="form" id="login" method="POST" action="/seller-login">
                                            <img class="brand-logo" src="icons/3.png" alt="" />
                                            <h1 class="form__title">Seller Login</h1>
                                            <div class="form__message form__message--error"></div>
                                            <div class="form__input-group">
                                                <input
                                                type="text"
                                                class="form__input"
                                                autofocus
                                                placeholder="Email"
                                                name="email"
                                                />
                                                <div class="form__input-error-message"></div>
                                            </div>
                                            <div class="form__input-group">
                                                <input
                                                type="password"
                                                class="form__input"
                                                autofocus
                                                placeholder="Password"
                                                name="password"
                                                />
                                                <div class="form__input-error-message"></div>
                                            </div>
                                            <div class="form__input-group">
                                                <input
                                                type="hidden"
                                                class="form__input"
                                                autofocus
                                                placeholder="Password"
                                                name="emailToken"
                                                value="${user.email}"
                                                />
                                                <div class="form__input-error-message"></div>
                                            </div>
                                            <div class="form__input-group">
                                            <input
                                              type="checkbox"
                                              class="form__input checkbox"
                                              autofocus
                                              placeholder="Password"
                                              name="userToken"
                                              checked
                                              required
                                              oninvalid="this.setCustomValidity('Accept the terms and conditions to continue')"
                                              oninput="this.setCustomValidity('')"
                                              />
                                              <div class="checkbox"> I agree to accept the terms and conditions</div>
                                            <div class="form__input-error-message"></div>
                                          </div>
                                            <button class="form__button" type="submit">Continue</button>
                                            <p class="form__text">
                                                <a href="/forgot-password" class="form__link">Forgot your password?</a>
                                            </p>
                                            </form>
                                        </div>
                                        <div class="spinner">
                                            <div class="circle"></div>
                                        </div>
                                        <script src="js/spinner.js"></script>
                                        </body>
                                        `
    return sellerLogin
    }

    if (fileName == 'homepage'){

        let sellerURL
        let sellerString

        if(user.seller == 'false'){
            sellerString = `BECOME A SELLER`
            sellerURL = "/seller-login"
        }
        else if (user.seller == 'true'){
            sellerString = `SELLER PROFILE`
            sellerURL = "/seller"
        }

        let homepage = layoutHomepage + `<body>
                                            <div class="notification">
                                            <div class="notification-container" style="background-color: ${message_color};">${message}</div>
                                            </div>
                                            <script>
                                            let div = document.getElementsByClassName('notification')[0]
                                            setTimeout(() => {
                                                div.style.animation = "slideBackToTop 250ms ease-in"
                                                setTimeout(() => {
                                                div.style["background-color"] = ""
                                                div.style.color = "transparent"
                                                setTimeout(() => {
                                                    div.remove()
                                                }, 100);
                                                }, 250);
                                            }, 5000);
                                            </script>
                                            <header id="header" class="header">
                                            <!-- Navigation -->
                                            <div class="navigation">
                                                <div class="container">
                                                <nav class="nav__center">
                                                    <div class="nav__header">
                                                    <div class="nav__logo">
                                                    <img src="svg/The-Monk-store.svg">
                                                    </div>
                                        
                                                    <div class="nav__hamburger">
                                                        <span>
                                                        <svg>
                                                            <use xlink:href="./images/sprite.svg#icon-menu"></use>
                                                        </svg>
                                                        </span>
                                                    </div>
                                                    </div>
                                        
                                                    <div class="nav__menu">
                                                    <div class="menu__top">
                                                        <h1 class="nav__category">Monk<span>Store</span></h1>
                                                        <div class="close__toggle">
                                                        <svg>
                                                            <use xlink:href="./images/sprite.svg#icon-cross"></use>
                                                        </svg>
                                                        </div>
                                                    </div>
                                                    <ul class="nav__list">
                                                        <li class="nav__item">
                                                        <a href="#header" class="nav__link scroll-link">Home</a>
                                                        </li>
                                        
                                                        <li class="nav__item">
                                                        <a href="/settings" class="nav__link scroll-link">Settings</a>
                                                        </li>
                                        
                                                        <li class="nav__item">
                                                        <a href="order-history" class="nav__link scroll-link">Order History</a>
                                                        </li>
                                        
                                                        <li class="nav__item">
                                                        <a href="/cart" class="nav__link scroll-link">Cart History</a>
                                                        </li>
                                        
                                                        <li class="nav__item">
                                                        <a href=${sellerURL} class="nav__link">${sellerString}</a>
                                                        </li>
                                        
                                                        <li class="nav__item">
                                                        <a href="/logout" class="nav__link">Log Out</a>
                                                        </li>
                                                    </ul>
                                        
                                                    <ul class="nav__icons">
                                                        <a href="#" class="icon__item">
                                                        <svg>
                                                            <use xlink:href="./images/sprite.svg#icon-shopping-basket"></use>
                                                        </svg>
                                                        <span>2</span>
                                                        </a>
                                                    </ul>
                                                    </div>
                                                </nav>
                                                </div>
                                            </div>
                                        
                                            <!-- Hero -->
                                            <div class="hero">
                                                <div class="hero__content container">
                                                <a href="#" class="btn-hero">Welcome to Monk Store</a>
                                                </div>
                                        
                                                <a href="#new__arrival" class="goto__next scroll-link">
                                                </a>
                                            </div>
                                            </header>
                                            <main>
                                            
                                            
                                            <!-- Cart Slide -->
                                            <section class="cart__slide">
                                                <div class="arrival__slide container">
                                                <div class="glide" id="glide1">
                                                    <div class="glide__track" data-glide-el="track">
                                                    <ul class="glide__slides">
                                                        <li class="glide__slide">
                                                        <div class="arrival">
                                                            <div class="cart__like">
                                                            <div class="image__holder">
                                                                <img src="https://m.media-amazon.com/images/I/71WbatK7HVL._AC_UY327_FMwebp_QL65_.jpg" alt="" />
                                                            </div>
                                                            <div class="cart__details">
                                                                <h1>Laptops</h1>
                                                                <p>Find all newly launched laptops. Sold by most trustworthy Monk certified sellers.
                                                                </p>
                                                                <div class="btn__group">
                                                                <a class="prod-view-button" href="/laptop"><button>View Products</button></a>
                                                                </div>
                                                            </div>
                                                            </div>
                                                        </div>
                                                        </li>
                                                        <li class="glide__slide">
                                                        <div class="arrival">
                                                            <div class="cart__like">
                                                            <div class="image__holder">
                                                                <img src="https://m.media-amazon.com/images/I/71A9Vo1BatL._AC_UY327_FMwebp_QL65_.jpg" alt="" />
                                                            </div>
                                                            <div class="cart__details">
                                                                <h1>Smartphones</h1>
                                                                <p>Find all newly launched smartphones. Sold by most trustworthy Monk certified sellers.
                                                                </p>
                                                                <div class="btn__group">
                                                                <a class="prod-view-button" href="/smartphone"><button>View Products</button></a>
                                                                </div>
                                                            </div>
                                                            </div>
                                                        </div>
                                                        </li>
                                                        <li class="glide__slide">
                                                        <div class="arrival">
                                                            <div class="cart__like">
                                                            <div class="image__holder">
                                                                <img src="https://m.media-amazon.com/images/I/71p2W9Ykh7L._AC_UY327_FMwebp_QL65_.jpg" alt="" />
                                                            </div>
                                                            <div class="cart__details">
                                                                <h1>Storages</h1>
                                                                <p>Find all newly launched hardrives/pendrives/CDs. Sold by most trustworthy Monk certified sellers.
                                                                </p>
                                                                <div class="btn__group">
                                                                <a class="prod-view-button" href="/storage"><button>View Products</button></a>
                                                                </div>
                                                            </div>
                                                            </div>
                                                        </div>
                                                        </li>
                                                    </ul>
                                                    </div>
                                        
                                                    
                                        <!-- upcoming Section -->
                                            <section class="section upcoming" id="upcoming">
                                                <div class="upcoming__container container">
                                                <div class="title">
                                                    <h1 class="primary__title">Upcoming Products</h1>
                                                </div>
                                        
                                                <div class="upcoming__center">
                                                    <div class="product">
                                                    <div class="img__container">
                                                        <img src="https://m.media-amazon.com/images/I/719F8WdfBzL._AC_UY327_FMwebp_QL65_.jpg" alt="" />
                                                    </div>
                                                    <div class="product__bottom">
                                                        <h3>HP 15 Jet Black</h3>
                                                        <a href="#">Add To Wishlist</a>
                                                    </div>
                                                    </div>
                                                    <div class="product">
                                                    <div class="img__container">
                                                        <img src="https://m.media-amazon.com/images/I/61p3lA4N3uL._AC_UY327_FMwebp_QL65_.jpg" alt="" />
                                                    </div>
                                                    <div class="product__bottom">
                                                        <h3>Lenovo Legion 5 </h3>
                                                        <a href="#">Add To Wishlist</a>
                                                    </div>
                                                    </div>
                                                    <div class="product">
                                                    <div class="img__container">
                                                        <img src="https://m.media-amazon.com/images/I/71ne+SvArgS._AC_UY327_FMwebp_QL65_.jpg" alt="" />
                                                    </div>
                                                    <div class="product__bottom">
                                                        <h3>Western Digital WD</h3>
                                                        <a href="#">Add To Wishlist</a>
                                                    </div>
                                                    </div>
                                                    <div class="product">
                                                    <div class="img__container">
                                                        <img src="https://m.media-amazon.com/images/I/71YswD1KjrL._AC_UY327_FMwebp_QL65_.jpg" alt="" />
                                                    </div>
                                                    <div class="product__bottom">
                                                        <h3>HP CD (50 pcs)</h3>
                                                        <a href="#">Add To Wishlist</a>
                                                    </div>
                                                    </div>
                                                    <div class="product">
                                                    <div class="img__container">
                                                        <img src="https://m.media-amazon.com/images/I/71IkA3T7hIL._AC_UY327_FMwebp_QL65_.jpg" alt="" />
                                                    </div>
                                                    <div class="product__bottom">
                                                        <h3>Samsung Galaxy M02s Black</h3>
                                                        <a href="#">Add To Wishlist</a>
                                                    </div>
                                                    </div>
                                                    <div class="product">
                                                    <div class="img__container">
                                                        <img src="https://m.media-amazon.com/images/I/618UBhFmaQS._AC_UY327_FMwebp_QL65_.jpg" alt="" />
                                                    </div>
                                                    <div class="product__bottom">
                                                        <h3>Realme C11 </h3>
                                                        <a href="#">Add To Wishlist</a>
                                                    </div>
                                                    </div>
                                                    <div class="product">
                                                    <div class="img__container">
                                                        <img src="https://images-na.ssl-images-amazon.com/images/I/71sxlhYhKWL._SL1500_.jpg" alt="" />
                                                    </div>
                                                    <div class="product__bottom">
                                                        <h3>HP 32GB USB 2.0 Pen Drive</h3>
                                                        <a href="#">Add To Wishlist</a>
                                                    </div>
                                                    </div>
                                                    <div class="product">
                                                    <div class="img__container">
                                                        <img src="https://m.media-amazon.com/images/I/61BE1LBx0kS._AC_UY327_FMwebp_QL65_.jpg" alt="" />
                                                    </div>
                                                    <div class="product__bottom">
                                                        <h3>Dell G15 (Ascent Solid Color)</h3>
                                                        <a href="#">Add To Wishlist</a>
                                                    </div>
                                                    </div>
                                                </div>
                                                </div>
                                            </section>
                                        
                                            <!-- team -->
                                            <section class="section team" id="team">
                                                <div class="team__container container">
                                                <div class="title">
                                                    <h1 class="primary__title">Our Team</h1>
                                                </div>
                                        
                                                <div class="team__center">
                                                    <div class="team__box">
                                                    <div class="img__cover">
                                                        <img src="./images/ansh rusia.png" alt="" />
                                                    </div>
                                                    <div class="box__content">
                                                        <h2>ANSH RUSIA</h2>
                                                        <p>Co-Founder, The Monk Store.</p> 
                                                        <P>UI/UX Designer</p>
                                                    </div>
                                                    </div>
                                        
                                                    <div class="team__box">
                                                    <div class="img__cover">
                                                        <img src="./images/shubhajeet pradhan.png" alt="" />
                                                    </div>
                                                    <div class="box__content">
                                                        <h2>SHUBHAJEET PRADHAN</h2>
                                                        <p>Co-Founder, The Monk Store.</p> 
                                                        <p>Front-End Developer</p>
                                                    </div>
                                                    </div>
                                        
                                                    <div class="team__box">
                                                    <div class="img__cover">
                                                        <img src="./images/varun tiwari.png" alt="" />
                                                    </div>
                                                    <div class="box__content">
                                                        <h2>VARUN KUMAR TIWARI</h2>
                                                        <p>Co-Founder, The Monk Store. </p>
                                                        <p>Full-Stack Developer</p>
                                                    </div>
                                                    </div>
                                                </div>
                                                </div>
                                            </section>
                                        
                                            <!-- feedback -->
                                            <section class="section feedback" id="feedback">
                                              <div class="feedback__container container">
                                                <div class="title">
                                                  <h1 class="primary__title">FeedBack</h1>
                                                </div>
                                               <div class="feedback">
                                                <form class="form" action="/feedback" method="POST">
                                                    <div class="form-items">
                                                      <textarea name="feedback" class="input message" cols="30" rows="10" placeholder="Type your Message here ....."></textarea>
                                                    </div>
                                                    <button type="submit" class="btn spinner-btn">
                                                      Submit
                                                      ${homepageSpinner}
                                                      <i class="fas fa-arrow-right"></i>
                                                    </button>
                                                </form>
                                                </div>
                                            </section>
                                        
                                            <!-- Footer -->
                                            <footer id="footer" class="section footer">
                                                <div class="container">
                                                <div class="footer__top">
                                                    <div class="footer-top__box">
                                                    <h3>EXTRAS</h3>
                                                    <a href="#">Brands</a>
                                                    <a href="#">Gift Cards</a>
                                                    <a href="#">Specials</a>
                                                    <a href="#">Support</a>
                                                    </div>
                                                    <div class="footer-top__box">
                                                    <h3>INFORMATION</h3>
                                                    <a href="/about-us">About Us</a>
                                                    <a href="#">Privacy Policy</a>
                                                    <a href="#">Terms & Conditions</a>
                                                    <a href="#">Contact Us</a>
                                                    </div>
                                        
                                                    <div class="footer-top__box">
                                                    <h3>MY ACCOUNT</h3>
                                                    <a href="#">My Account</a>
                                                    <a href="/order-history">Order History</a>
                                                    <a href="#">Cart</a>
                                                    <a href="#">FeedBack</a>
                                                    <a href="#">Returns</a>
                                                    </div>
                                                    <div class="footer-top__box">
                                                    <h3>CONTACT US</h3>
                                                    <div>
                                                    B8-Jabalpur, 482002
                                                    </div>
                                                    <div>
                                                        keplons@outlook.com
                                                    </div>
                                                    <div>
                                                    +91-9878881179
                                                    </div>
                                                    <div>
                                                    Madhya Pradesh, India.
                                                    </div>
                                                    </div>
                                                    <div class="footer_last">&copy; Copyright 2021 All Rights Reserved by 
                                                    <strong>
                                                        <a href="#">The Monk Store.Inc</a>
                                                    </strong>
                                                    </div>
                                                </div>
                                                </div>
                                                </div>
                                            </footer>
                                            <!-- End Footer -->
                                            </main>
                                            
                                        </body>`
        return homepage
    }

    if (fileName == 'seller-homepage'){
        let sellerHomepage = layoutSellerHomepage + `<body>

        <div class="notification">
        <div class="notification-container" style="background-color: ${message_color};">${message}</div>
        </div>
        <script>
        let div = document.getElementsByClassName('notification')[0]
        setTimeout(() => {
            div.style.animation = "slideBackToTop 250ms ease-in"
            setTimeout(() => {
            div.style["background-color"] = ""
            div.style.color = "transparent"
            setTimeout(() => {
                div.remove()
            }, 100);
            }, 250);
        }, 5000);
        </script>

        <header id="header" class="header">
      
          <!-- Navigation -->
          
          <div class="navigation">
            <div class="container">
              <nav class="nav__center">
                <div class="nav__header">
                  <div class="nav__logo">
                   <a href="/homepage"><img src="svg/The-Monk-store.svg"></a>
                  </div>
                    <div class="nav__hamburger">
                    <span>
                      <svg>
                        <use xlink:href="./images/sprite.svg#icon-menu"></use>
                      </svg>
                    </span>
                  </div>
                </div>
      
                <div class="nav__menu">
                  <div class="menu__top">
                    <h1 class="nav__category">Monk<span>Store</span></h1>
                    <div class="close__toggle">
                      <svg>
                        <use xlink:href="./images/sprite.svg#icon-cross"></use>
                      </svg>
                    </div>
                  </div>
                  <ul class="nav__list">
                    <li class="nav__item">
                      <a href="/seller" class="nav__link scroll-link">Home</a>
                    </li>
      
                    <li class="nav__item">
                      <a href="/seller-product" class="nav__link scroll-link">Products</a>
                    </li>
      
                    <li class="nav__item">
                      <a href="/logout" class="nav__link scroll-link">Log Out</a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
      
          <!-- Hero -->
          <div class="hero">
            <div class="hero__content container">
              <a href="#" class="btn btn-hero">Sell you Products</a>
            </div>
      
            <a href="#new__arrival" class="goto__next scroll-link">
            </a>
          </div>
        </header>
        <main>
          
         <section>
              <div class="card">
      
                 <div class="container">
        <div class="title-form">
          <h1>Product Details</h1>
        </div>
        <form class="price-form" action="/add-product" method="POST">
        ${homepageSpinner}

          <div class="field-form">
            <input type="text" name="name" class="first-name" placeholder="Product name">
          </div>
          <div class="field-form">
            <input type="text" name="price" class="student-id" placeholder="Price">
          </div>
          
          <div class="field-form category form">
            <span style="margin-right: 10px;">Category</span>
              <select name="category" id="category select">
                <option value="00">Laptop</option>
                <option value="01">Smartphone</option>
                <option value="02">Storage</option>
              </select>  
          </div>
      
          <div class="field-form description">
            <textarea name="description" id="description" placeholder="Description"></textarea>
            </div>
          
          <div class="field-form button">
            <button type="submit" class="add spinner-btn" value="Add">Add Products</button>
          </div>
        </form>
      </div>
      
                
          <!-- Footer -->
          <footer id="footer" class="section footer">
            <div class="container">
              <div class="footer__top">
                <div class="footer-top__box">
                  <h3>EXTRAS</h3>
                  <a href="#">Brands</a>
                  <a href="#">Gift Cards</a>
                  <a href="#">Specials</a>
                  <a href="#">Support</a>
                </div>
                <div class="footer-top__box">
                  <h3>INFORMATION</h3>
                  <a href="#">About Us</a>
                  <a href="#">Privacy Policy</a>
                  <a href="#">Terms & Conditions</a>
                  <a href="#">Contact Us</a>
                </div>
      
                <div class="footer-top__box">
                  <h3>MY ACCOUNT</h3>
                  <a href="#">My Account</a>
                  <a href="#">Order History</a>
                  <a href="#">Cart</a>
                  <a href="#">FeedBack</a>
                  <a href="#">Returns</a>
                </div>
                <div class="footer-top__box">
                  <h3>CONTACT US</h3>
                  <div>
                   B8-Jabalpur, 482002
                  </div>
                  <div>
                    keplons@outlook.com
                  </div>
                  <div>
                   +91-9878881179
                  </div>
                  <div>
                   Madhya Pradesh, India.
                  </div>
                </div>
                <div class="footer_last">&copy; Copyright 2021 All Rights Reserved by 
                  <strong>
                    <a href="#">The Monk Store.Inc</a>
                  </strong>
                </div>
              </div>
            </div>
            </div>
          </footer>
          <!-- End Footer -->
        </main>
      </body>
      
      </html>`
      return sellerHomepage
    }
}

const pageRender = (user, page)=>{

    const layoutLandingPage = `<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Landing-Page|The Monk Store</title>
        <link rel="stylesheet" href="/css/landing.css">
    </head>`

    const layoutHomepage = `<!DOCTYPE html>
                            
                            <head>
                            <meta charset="UTF-8" />
                            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                            <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
                            <link rel="stylesheet" href="css/homepage.css" />
                            <link rel="stylesheet" href=css/homepage-spinner.css />
                            
                            <title>Home-Page</title>
                            </head>`

    const layoutSellerHomepage = `<!DOCTYPE html>
                                    <html lang="en">
                                    
                                    <head>
                                    <meta charset="UTF-8" />
                                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                                    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
                                    <link rel="stylesheet" href="css/seller-homepage.css" />
                                    <link rel="stylesheet" href="css/spinner.css" />
                                    
                                    <title>The Monk Store-Seller Page</title>
                                    </head>`

    const layoutFeedback = `<!DOCTYPE html>
                            <head>
                                <meta charset="UTF-8">
                                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <title>Feedback</title>
                                <link rel="stylesheet" href="css/feedback.css">
                                <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Nunito" />
                            </head>`

    const layoutOrderHistory = `<!DOCTYPE html>
                                <head>
                                <meta charset="UTF-8">
                                <title>The Monk Store</title>
                                <link rel="stylesheet" href="css/order-history.css">
                                <link rel="stylesheet" href="css/footer.css">
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
                                        <link rel="stylesheet" href="css/authentication.css" />
                                        <link rel="stylesheet" href="css/error.css" />
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
                                    <link rel="stylesheet" href="/css/authentication.css" />
                                    <link rel="stylesheet" href="/css/error.css" />
                                    <link rel="stylesheet" href=${loaderCSS} />
                                    </head>`

    const layoutSettings = `<!DOCTYPE html>
                            <head>
                            <meta charset="UTF-8">
                            <title>Settings</title>
                            <link rel="stylesheet" href="css/settings.css">
                            <link rel="stylesheet" href="css/footer.css">
                            </head>`

    const layoutAboutUs = `<!DOCTYPE html>
                            <head>
                            <meta charset="UTF-8">
                            <title>About Us</title>
                            <meta name="viewport" content="width=device-width, initial-scale=1">
                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
                            <link rel='stylesheet' href='https://rsms.me/inter/inter.css'>
                            <link rel="stylesheet" href="css/about-us.css">
                            </head>`

    const layoutSellerLogin = `<!DOCTYPE html>
                                <head>
                                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                                <meta charset="utf-8" />
                                <title>Seller Login</title>
                                <link rel="preconnect" href="https://fonts.gstatic.com" />
                                <link
                                    href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap"
                                    rel="stylesheet"
                                />
                                <link rel="stylesheet" href="css/authentication.css" />
                                <link rel="stylesheet" href="css/error.css" />
                                <link rel="stylesheet" href="css/spinner.css" />
                                </head>`

    const layoutLaptop = `<!DOCTYPE html>
                        
                        <head>
                        <meta charset="UTF-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
                        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css">
                        <link rel="stylesheet" href="css/laptop.css" />
                        
                        <title>Laptops</title>
                        </head>`

    const layoutSmartphone = `<!DOCTYPE html>
                        
                        <head>
                        <meta charset="UTF-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
                        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css">
                        <link rel="stylesheet" href="css/smartphone.css" />
                        
                        <title>Laptops</title>
                        </head>`

    const layoutStorage = `<!DOCTYPE html>
                        
                        <head>
                        <meta charset="UTF-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
                        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css">
                        <link rel="stylesheet" href="css/storage.css" />
                        
                        <title>Laptops</title>
                        </head>`

    if (page == 'landing'){
        let landing = layoutLandingPage + `<body>
        <main class="container">
          <section class="content-wrapper">
            <div class="main-content">
              <div class="topnav">
                <a href="#home" class="nav-links first"> 
                  <img src="/svg/The-Monk-store.svg" alt="" width="200px" height="150px">
                </a>
               </div>
              <div class="info">
                <div class="circle1"></div>
                <div class="circle2"></div>
                <div class="strengths">
                  <p class="salutation">Hey !!</p>
                  <p class="job" style="margin-bottom: 20px;">    
                    Welcome to THE MONK STORE. 
                    <span class="orange-color">
                    We thank you for chosing us as your shopping mate.</span>
                  </p>
                  <p class="qualities">Hope you enjoy this experience of diving into the world of gadgets.</p>
                  <div class="buttons-wrapper">
                    <a href="/login"><button class="transparent-button">Continue...</button></a> 
                  </div> <br>
                  <div class="hand-right-wrapper">
                    <img src="/images/Dark-white-in-Jacket5.png" alt="" class="hand-right">
                  </div>
                  <div class="hand-up-wrapper">
                    <img src="/images/Dark-white-in-Jacket4.png" alt="" class="hand-up">
                  </div>
                </div>
                <div class="picture">
                  <img src="/svg/2.svg" alt="" class="pose-pic">
                </div>
              </div>
            </div>
          </section>
        </main>
        
    </body>
    </html>`
    return landing
    }
    
    if (page == 'homepage'){

        let sellerURL
        let sellerString

        if(user.seller == 'false'){
            sellerString = `BECOME A SELLER`
            sellerURL = "/seller-login"
        }
        else if (user.seller == 'true'){
            sellerString = `SELLER PROFILE`
            sellerURL = "/seller"
        }

        let homepage = layoutHomepage + `<body>
                                            <header id="header" class="header">
                                            <!-- Navigation -->
                                            <div class="navigation">
                                                <div class="container">
                                                <nav class="nav__center">
                                                    <div class="nav__header">
                                                    <div class="nav__logo">
                                                    <img src="svg/The-Monk-store.svg">
                                                    </div>
                                        
                                                    <div class="nav__hamburger">
                                                        <span>
                                                        <svg>
                                                            <use xlink:href="./images/sprite.svg#icon-menu"></use>
                                                        </svg>
                                                        </span>
                                                    </div>
                                                    </div>
                                        
                                                    <div class="nav__menu">
                                                    <div class="menu__top">
                                                        <h1 class="nav__category">Monk<span>Store</span></h1>
                                                        <div class="close__toggle">
                                                        <svg>
                                                            <use xlink:href="./images/sprite.svg#icon-cross"></use>
                                                        </svg>
                                                        </div>
                                                    </div>
                                                    <ul class="nav__list">
                                                        <li class="nav__item">
                                                        <a href="#header" class="nav__link scroll-link">Home</a>
                                                        </li>
                                        
                                                        <li class="nav__item">
                                                        <a href="/settings" class="nav__link scroll-link">Settings</a>
                                                        </li>
                                        
                                                        <li class="nav__item">
                                                        <a href="order-history" class="nav__link scroll-link">Order History</a>
                                                        </li>
                                        
                                                        <li class="nav__item">
                                                        <a href="/cart" class="nav__link scroll-link">Cart History</a>
                                                        </li>
                                        
                                                        <li class="nav__item">
                                                        <a href=${sellerURL} class="nav__link">${sellerString}</a>
                                                        </li>
                                        
                                                        <li class="nav__item">
                                                        <a href="/logout" class="nav__link">Log Out</a>
                                                        </li>
                                                    </ul>
                                        
                                                    <ul class="nav__icons">
                                                        <a href="#" class="icon__item">
                                                        <svg>
                                                            <use xlink:href="./images/sprite.svg#icon-shopping-basket"></use>
                                                        </svg>
                                                        <span>2</span>
                                                        </a>
                                                    </ul>
                                                    </div>
                                                </nav>
                                                </div>
                                            </div>
                                        
                                            <!-- Hero -->
                                            <div class="hero">
                                                <div class="hero__content container">
                                                <a href="#" class="btn-hero">Welcome to Monk Store</a>
                                                </div>
                                        
                                                <a href="#new__arrival" class="goto__next scroll-link">
                                                </a>
                                            </div>
                                            </header>
                                            <main>
                                            
                                            
                                            <!-- Cart Slide -->
                                            <section class="cart__slide">
                                                <div class="arrival__slide container">
                                                <div class="glide" id="glide1">
                                                    <div class="glide__track" data-glide-el="track">
                                                    <ul class="glide__slides">
                                                        <li class="glide__slide">
                                                        <div class="arrival">
                                                            <div class="cart__like">
                                                            <div class="image__holder">
                                                                <img src="https://m.media-amazon.com/images/I/71WbatK7HVL._AC_UY327_FMwebp_QL65_.jpg" alt="" />
                                                            </div>
                                                            <div class="cart__details">
                                                                <h1>Laptops</h1>
                                                                <p>Find all newly launched laptops. Sold by most trustworthy Monk certified sellers.
                                                                </p>
                                                                <div class="btn__group">
                                                                <a class="prod-view-button" href="/laptop"><button>View Products</button></a>
                                                                </div>
                                                            </div>
                                                            </div>
                                                        </div>
                                                        </li>
                                                        <li class="glide__slide">
                                                        <div class="arrival">
                                                            <div class="cart__like">
                                                            <div class="image__holder">
                                                                <img src="https://m.media-amazon.com/images/I/71A9Vo1BatL._AC_UY327_FMwebp_QL65_.jpg" alt="" />
                                                            </div>
                                                            <div class="cart__details">
                                                                <h1>Smartphones</h1>
                                                                <p>Find all newly launched smartphones. Sold by most trustworthy Monk certified sellers.
                                                                </p>
                                                                <div class="btn__group">
                                                                <a class="prod-view-button" href="/smartphone"><button>View Products</button></a>
                                                                </div>
                                                            </div>
                                                            </div>
                                                        </div>
                                                        </li>
                                                        <li class="glide__slide">
                                                        <div class="arrival">
                                                            <div class="cart__like">
                                                            <div class="image__holder">
                                                                <img src="https://m.media-amazon.com/images/I/71p2W9Ykh7L._AC_UY327_FMwebp_QL65_.jpg" alt="" />
                                                            </div>
                                                            <div class="cart__details">
                                                                <h1>Storages</h1>
                                                                <p>Find all newly launched hardrives/pendrives/CDs. Sold by most trustworthy Monk certified sellers.
                                                                </p>
                                                                <div class="btn__group">
                                                                <a class="prod-view-button" href="/storage"><button>View Products</button></a>
                                                                </div>
                                                            </div>
                                                            </div>
                                                        </div>
                                                        </li>
                                                    </ul>
                                                    </div>
                                        
                                                    
                                        <!-- upcoming Section -->
                                            <section class="section upcoming" id="upcoming">
                                                <div class="upcoming__container container">
                                                <div class="title">
                                                    <h1 class="primary__title">Upcoming Products</h1>
                                                </div>
                                        
                                                <div class="upcoming__center">
                                                    <div class="product">
                                                    <div class="img__container">
                                                        <img src="https://m.media-amazon.com/images/I/719F8WdfBzL._AC_UY327_FMwebp_QL65_.jpg" alt="" />
                                                    </div>
                                                    <div class="product__bottom">
                                                        <h3>HP 15 Jet Black</h3>
                                                        <a href="#">Add To Wishlist</a>
                                                    </div>
                                                    </div>
                                                    <div class="product">
                                                    <div class="img__container">
                                                        <img src="https://m.media-amazon.com/images/I/61p3lA4N3uL._AC_UY327_FMwebp_QL65_.jpg" alt="" />
                                                    </div>
                                                    <div class="product__bottom">
                                                        <h3>Lenovo Legion 5 </h3>
                                                        <a href="#">Add To Wishlist</a>
                                                    </div>
                                                    </div>
                                                    <div class="product">
                                                    <div class="img__container">
                                                        <img src="https://m.media-amazon.com/images/I/71ne+SvArgS._AC_UY327_FMwebp_QL65_.jpg" alt="" />
                                                    </div>
                                                    <div class="product__bottom">
                                                        <h3>Western Digital WD</h3>
                                                        <a href="#">Add To Wishlist</a>
                                                    </div>
                                                    </div>
                                                    <div class="product">
                                                    <div class="img__container">
                                                        <img src="https://m.media-amazon.com/images/I/71YswD1KjrL._AC_UY327_FMwebp_QL65_.jpg" alt="" />
                                                    </div>
                                                    <div class="product__bottom">
                                                        <h3>HP CD (50 pcs)</h3>
                                                        <a href="#">Add To Wishlist</a>
                                                    </div>
                                                    </div>
                                                    <div class="product">
                                                    <div class="img__container">
                                                        <img src="https://m.media-amazon.com/images/I/71IkA3T7hIL._AC_UY327_FMwebp_QL65_.jpg" alt="" />
                                                    </div>
                                                    <div class="product__bottom">
                                                        <h3>Samsung Galaxy M02s Black</h3>
                                                        <a href="#">Add To Wishlist</a>
                                                    </div>
                                                    </div>
                                                    <div class="product">
                                                    <div class="img__container">
                                                        <img src="https://m.media-amazon.com/images/I/618UBhFmaQS._AC_UY327_FMwebp_QL65_.jpg" alt="" />
                                                    </div>
                                                    <div class="product__bottom">
                                                        <h3>Realme C11 </h3>
                                                        <a href="#">Add To Wishlist</a>
                                                    </div>
                                                    </div>
                                                    <div class="product">
                                                    <div class="img__container">
                                                        <img src="https://images-na.ssl-images-amazon.com/images/I/71sxlhYhKWL._SL1500_.jpg" alt="" />
                                                    </div>
                                                    <div class="product__bottom">
                                                        <h3>HP 32GB USB 2.0 Pen Drive</h3>
                                                        <a href="#">Add To Wishlist</a>
                                                    </div>
                                                    </div>
                                                    <div class="product">
                                                    <div class="img__container">
                                                        <img src="https://m.media-amazon.com/images/I/61BE1LBx0kS._AC_UY327_FMwebp_QL65_.jpg" alt="" />
                                                    </div>
                                                    <div class="product__bottom">
                                                        <h3>Dell G15 (Ascent Solid Color)</h3>
                                                        <a href="#">Add To Wishlist</a>
                                                    </div>
                                                    </div>
                                                </div>
                                                </div>
                                            </section>
                                        
                                            <!-- team -->
                                            <section class="section team" id="team">
                                                <div class="team__container container">
                                                <div class="title">
                                                    <h1 class="primary__title">Our Team</h1>
                                                </div>
                                        
                                                <div class="team__center">
                                                    <div class="team__box">
                                                    <div class="img__cover">
                                                        <img src="./images/ansh rusia.png" alt="" />
                                                    </div>
                                                    <div class="box__content">
                                                        <h2>ANSH RUSIA</h2>
                                                        <p>Co-Founder, The Monk Store.</p> 
                                                        <P>UI/UX Designer</p>
                                                    </div>
                                                    </div>
                                        
                                                    <div class="team__box">
                                                    <div class="img__cover">
                                                        <img src="./images/shubhajeet pradhan.png" alt="" />
                                                    </div>
                                                    <div class="box__content">
                                                        <h2>SHUBHAJEET PRADHAN</h2>
                                                        <p>Co-Founder, The Monk Store.</p> 
                                                        <p>Front-End Developer</p>
                                                    </div>
                                                    </div>
                                        
                                                    <div class="team__box">
                                                    <div class="img__cover">
                                                        <img src="./images/varun tiwari.png" alt="" />
                                                    </div>
                                                    <div class="box__content">
                                                        <h2>VARUN KUMAR TIWARI</h2>
                                                        <p>Co-Founder, The Monk Store. </p>
                                                        <p>Full-Stack Developer</p>
                                                    </div>
                                                    </div>
                                                </div>
                                                </div>
                                            </section>
                                        
                                            <!-- feedback -->
                                            <section class="section feedback" id="feedback">
                                              <div class="feedback__container container">
                                                <div class="title">
                                                  <h1 class="primary__title">FeedBack</h1>
                                                </div>
                                               <div class="feedback">
                                                <form class="form" action="/feedback" method="POST">
                                                    <div class="form-items">
                                                      <textarea name="feedback" class="input message" cols="30" rows="10" placeholder="Type your Message here ....."></textarea>
                                                    </div>
                                                    <button class="btn spinner-btn">
                                                      Submit
                                                      ${homepageSpinner}
                                                      <i class="fas fa-arrow-right"></i>
                                                    </button>
                                                </form>
                                                </div>
                                            </section>
                                        
                                            <!-- Footer -->
                                            <footer id="footer" class="section footer">
                                                <div class="container">
                                                <div class="footer__top">
                                                    <div class="footer-top__box">
                                                    <h3>EXTRAS</h3>
                                                    <a href="#">Brands</a>
                                                    <a href="#">Gift Cards</a>
                                                    <a href="#">Specials</a>
                                                    <a href="#">Support</a>
                                                    </div>
                                                    <div class="footer-top__box">
                                                    <h3>INFORMATION</h3>
                                                    <a href="/about-us">About Us</a>
                                                    <a href="#">Privacy Policy</a>
                                                    <a href="#">Terms & Conditions</a>
                                                    <a href="#">Contact Us</a>
                                                    </div>
                                        
                                                    <div class="footer-top__box">
                                                    <h3>MY ACCOUNT</h3>
                                                    <a href="#">My Account</a>
                                                    <a href="/order-history">Order History</a>
                                                    <a href="#">Cart</a>
                                                    <a href="#">FeedBack</a>
                                                    <a href="#">Returns</a>
                                                    </div>
                                                    <div class="footer-top__box">
                                                    <h3>CONTACT US</h3>
                                                    <div>
                                                    B8-Jabalpur, 482002
                                                    </div>
                                                    <div>
                                                        keplons@outlook.com
                                                    </div>
                                                    <div>
                                                    +91-9878881179
                                                    </div>
                                                    <div>
                                                    Madhya Pradesh, India.
                                                    </div>
                                                    </div>
                                                    <div class="footer_last">&copy; Copyright 2021 All Rights Reserved by 
                                                    <strong>
                                                        <a href="#">The Monk Store.Inc</a>
                                                    </strong>
                                                    </div>
                                                </div>
                                                </div>
                                                </div>
                                            </footer>
                                            <!-- End Footer -->
                                            </main>
                                        </body>`
        return homepage
    }     

    if (page == 'seller-homepage'){
        let sellerHomepage = layoutSellerHomepage + `<body>

        <header id="header" class="header">
    
        <!-- Navigation -->
        
        <div class="navigation">
            <div class="container">
            <nav class="nav__center">
                <div class="nav__header">
                <div class="nav__logo">
                <a href="/homepage"><img src="svg/The-Monk-store.svg"></a>
                </div>
                    <div class="nav__hamburger">
                    <span>
                    <svg>
                        <use xlink:href="./images/sprite.svg#icon-menu"></use>
                    </svg>
                    </span>
                </div>
                </div>
    
                <div class="nav__menu">
                <div class="menu__top">
                    <h1 class="nav__category">Monk<span>Store</span></h1>
                    <div class="close__toggle">
                    <svg>
                        <use xlink:href="./images/sprite.svg#icon-cross"></use>
                    </svg>
                    </div>
                </div>
                <ul class="nav__list">
                    <li class="nav__item">
                    <a href="/seller" class="nav__link scroll-link">Home</a>
                    </li>
    
                    <li class="nav__item">
                    <a href="/seller-product" class="nav__link scroll-link">Products</a>
                    </li>
    
                    <li class="nav__item">
                    <a href="/logout" class="nav__link scroll-link">Log Out</a>
                    </li>
                </ul>
                </div>
            </nav>
            </div>
        </div>
    
        <!-- Hero -->
        <div class="hero">
            <div class="hero__content container">
            <a href="#" class="btn btn-hero">Sell you Products</a>
            </div>
    
            <a href="#new__arrival" class="goto__next scroll-link">
            </a>
        </div>
        </header>
        <main>
        
        <section>
            <div class="card">
    
                <div class="container">
        <div class="title-form">
        <h1>Product Details</h1>
        </div>
        <form class="price-form" action="/add-product" method="POST">
        ${homepageSpinner}

        <div class="field-form">
            <input type="text" name="name" class="first-name" placeholder="Product name">
        </div>
        <div class="field-form">
            <input type="text" name="price" class="student-id" placeholder="Price">
        </div>
        
        <div class="field-form category form">
            <span style="margin-right: 10px;">Category</span>
            <select name="category" id="category select">
                <option value="00">Laptop</option>
                <option value="01">Smartphone</option>
                <option value="02">Storage</option>
            </select>  
        </div>
    
        <div class="field-form description">
            <textarea name="description" id="description" placeholder="Description"></textarea>
            </div>
        
        <div class="field-form button">
            <button type="submit" class="add spinner-btn" value="Add">Add Products</button>
        </div>
        </form>
    </div>
    
                
        <!-- Footer -->
        <footer id="footer" class="section footer">
            <div class="container">
            <div class="footer__top">
                <div class="footer-top__box">
                <h3>EXTRAS</h3>
                <a href="#">Brands</a>
                <a href="#">Gift Cards</a>
                <a href="#">Specials</a>
                <a href="#">Support</a>
                </div>
                <div class="footer-top__box">
                <h3>INFORMATION</h3>
                <a href="#">About Us</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Terms & Conditions</a>
                <a href="#">Contact Us</a>
                </div>
    
                <div class="footer-top__box">
                <h3>MY ACCOUNT</h3>
                <a href="#">My Account</a>
                <a href="#">Order History</a>
                <a href="#">Cart</a>
                <a href="#">FeedBack</a>
                <a href="#">Returns</a>
                </div>
                <div class="footer-top__box">
                <h3>CONTACT US</h3>
                <div>
                B8-Jabalpur, 482002
                </div>
                <div>
                    keplons@outlook.com
                </div>
                <div>
                +91-9878881179
                </div>
                <div>
                Madhya Pradesh, India.
                </div>
                </div>
                <div class="footer_last">&copy; Copyright 2021 All Rights Reserved by 
                <strong>
                    <a href="#">The Monk Store.Inc</a>
                </strong>
                </div>
            </div>
            </div>
            </div>
        </footer>
        <!-- End Footer -->
        </main>
    </body>
    
    </html>`

      return sellerHomepage
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
                                                    <p class="copyright">&copy Copyrights. All rights reservered, 2021</p>  
                                                    </body>`

        return orderHistory
    } 

    if (page == 'forgot-password'){
        let forgotPasswordEmail = layoutForgotPasswordEmail + `<body>
                                                                <div class="container">
                                                                <form class="form" id="login" method="POST" action="/forgot-password">
                                                                    <img class="brand-logo" src="icons/3.png" alt="" />
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
                                                        <img class="brand-logo" src="/icons/3.png" alt="" />
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
        console.log(user)
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
                                                <form action="/settings" method="POST">
                                                    <div class="field">
                                                    <label>Email-ID</label>
                                                    <div class="full_name">${user.email}</div>
                                                    </div>
                                                    <div class="field">
                                                    <label for="phoneNumber">Mobile Number</label>
                                                    <input class="full_name" type="text" name="phoneNumber" value="${user.phonenumber}"/>
                                                    </div>
                                                    <div class="field">
                                                    <label for="gender">Gender</label>
                                                    <input class="full_name" type="text" name="gender" value="${user.gender}"/>
                                                    </div>
                                                    <div class="field">
                                                    <label for="address">Address</label>
                                                    <input class="full_name" type="text" name="address" value="${user.address}"/>
                                                    </div>
                                                
                                                    
                                                    <div class="bottom">
                                                    <button class="button_left" type="submit" name="button">Save Changes</button>
                                                    <a href="/homepage"><div class="button_right" style="display: inline-block; width: 30%; padding: 14px; text-align: center;" name="button">Cancel</div></a>
                                                    </div>
                                                </form>
                                            </div>
                                            </div>
                                            </div>
                                            <p class="copyright">&copy Copyrights. All rights reservered, 2021</p>
                                        </body>`
    return settings
    }

    if(page == 'about-us'){
        let aboutUs = layoutAboutUs + `<body>
                            <section class="c-section">
                            <a href="/homepage"><img src="images/the-monk-store-about-us.png" width="200px" height="150px"></a>
                            <h2 class="c-section__title"><span>About Us</span></h2>
                            <ul class="c-services">
                            <li class="c-services__item">
                            <h3>Responsive Team</h3>
                            <p>Our team always responses as fast as they can. Provides effective solution for any inconvinience while operating our online store. </p>
                            </li>
                            <li class="c-services__item">
                            <h3>Hard Working</h3>
                            <p>We always try to work upon costumer needs and their requirements. We are continuosly working on our interface to make it more attractive.</p>
                            </li>
                            <li class="c-services__item">
                            <h3>Our Expert</h3>
                            <p>Our team consist of expert coder and develoers. They always work on website and  we re happy to do so.</p>
                            </li>
                            <li class="c-services__item">
                            <h3>Easy to Operate</h3>
                            <p>We've designed our website in such a way that anyone can use it without wasting any time.</p>
                            </li>
                            <li class="c-services__item">
                            <h3>Services</h3>
                            <p>We provide contact us service which directly send users message directly to our head controller.</p>
                            </li>
                            <li class="c-services__item">
                            <h3>Co-Founders</h3>
                            <p>Our co-founders are ANSH RUSIA, SHUBHAJEET PRADHAN. VARUN KUMAR TIWARI. They are 2nd year students at ABV-IIITM Gwalior. </p>
                            </li>
                            </ul>
                            </section>
                            <div class="footer_last">&copy; Copyright 2021 All Rights Reserved by<strong>
                                        <a href="#">The Monk Store.Inc</a>
                                        </strong>
                                    </div>
                            
                            </body>`
    
    return aboutUs
    }

    if (page == 'seller-login'){
        let sellerLogin = layoutSellerLogin + `<body>
                                                <div class="container">
                                                <form class="form" id="login" method="POST" action="/seller-login">
                                                    <img class="brand-logo" src="icons/3.png" alt="" />
                                                    <h1 class="form__title">Seller Login</h1>
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
                                                    <div class="form__input-group">
                                                    <input
                                                        type="password"
                                                        class="form__input"
                                                        autofocus
                                                        placeholder="Password"
                                                        name="password"
                                                    />
                                                    <div class="form__input-error-message"></div>
                                                    </div>
                                                    <div class="form__input-group">
                                                    <input
                                                        type="hidden"
                                                        class="form__input"
                                                        autofocus
                                                        placeholder="Password"
                                                        name="emailToken"
                                                        value="${user.email}"
                                                    />
                                                    <div class="form__input-error-message"></div>
                                                    </div>
                                                    <div class="form__input-group">
                                                    <input
                                                      type="checkbox"
                                                      class="form__input checkbox"
                                                      autofocus
                                                      placeholder="Password"
                                                      name="userToken"
                                                      checked
                                                      required
                                                      oninvalid="this.setCustomValidity('Accept the terms and conditions to continue')"
                                                      oninput="this.setCustomValidity('')"
                                                      />
                                                      <div class="checkbox"> I agree to accept the terms and conditions</div>
                                                    <div class="form__input-error-message"></div>
                                                  </div>
                                                    <button class="form__button" type="submit">Continue</button>
                                                    <p class="form__text">
                                                    <a href="/forgot-password" class="form__link">Forgot your password?</a>
                                                    </p>
                                                </form>
                                                </div>
                                                <div class="spinner">
                                                <div class="circle"></div>
                                                </div>
                                                <script src="js/spinner.js"></script>
                                            </body>
                                            `
    return sellerLogin
    }
}

const productRender ={
    laptopRender: laptopRender,
    smartphoneRender: smartphoneRender,
    storageRender: storageRender,
    orderHistoryRender: orderHistoryRender,
    sellerProductRender: sellerProductRender,
    cartHistoryRender: cartHistoryRender,
    productView: productView,
    reviewRender: reviewRender,
    aboutSellerRender: aboutSellerRender
}

async function laptopRender(){
    const layoutLaptop = `<!DOCTYPE html>
                        
    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css">
    <link rel="stylesheet" href="css/laptop.css" />
    
    <title>Laptops</title>
    </head>`
    let productCart = ``

    try{
    let result = await pool.query(`SELECT * FROM products WHERE category = $1`, ['laptop'])
    for (let i = 0; i < result.rows.length; i++) {
        productCart += `<div class="card">
                            <div class="wrapper">
                            <div class="colorProd" style="background-color: #fff;"></div>
                            <div class="imgProd" style="background-image: url(https://images-na.ssl-images-amazon.com/images/I/61pwrivrfUS._SL1500_.jpg);"></div>
                            <div class="infoProd">
                                <p class="nombreProd">${result.rows[i].name}</p>
                                <p class="extraInfo">Rs. ${result.rows[i].price}/-</p>
                                <div class="actions">
                                <div class="preciosGrupo">
                                    <div class="product_buttons">
                                        <form action="/product-view" method="GET">
                                        <input type="hidden" name="id" value="${result.rows[i].id}">
                                        <input type="hidden" name="category" value="${result.rows[i].category}">
                                        <button type="submit" class="btn wishlist">Buy Now</button>
                                        </form>
                                    </div>
                                </div>
                                <div class="bakuretsu_icono action aFavs">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                                    <path d="M47 5c-6.5 0-12.9 4.2-15 10-2.1-5.8-8.5-10-15-10A15 15 0 0 0 2 20c0 13 11 26 30 39 19-13 30-26 30-39A15 15 0 0 0 47 5z">
                                    </path>
                                    </svg>
                                </div>
                                <div class="bakuretsu_icono action alCarrito">
                                    <svg class="inCart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                                    <title>Quitar del carrito</title>
                                    <path d="M30 22H12M2 6h6l10 40h32l3.2-9.7"></path>
                                    <circle cx="20" cy="54" r="4"></circle>
                                    <circle cx="46" cy="54" r="4"></circle>
                                    <circle cx="46" cy="22" r="16"></circle>
                                    <path d="M53 18l-8 9-5-5"></path>
                                    </svg>
                                    <form action="/product-view" method="GET">
                                    <input type="hidden" name="id" value="${result.rows[i].id}">
                                    <input type="hidden" name="category" value="${result.rows[i].category}">
                                    <button type="submit">
                                    <svg class="outCart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                                    <title>Agregar al carrito</title>
                                    <path d="M2 6h10l10 40h32l8-24H16"></path>
                                    <circle cx="23" cy="54" r="4"></circle>
                                    <circle cx="49" cy="54" r="4"></circle>
                                    </svg>
                                    </button>
                                    </form>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>`
    }

    let laptop = layoutLaptop + `<body>
                                    <header id="header" class="header">
                                    <!-- Navigation -->
                                    <div class="navigation">
                                        <div class="container">
                                        <nav class="nav__center">
                                            <div class="nav__header">
                                            <div class="nav__logo">
                                            <a href="/homepage"><img src="svg/The-Monk-store.svg"></a>
                                            </div>
                                                <div class="nav__hamburger">
                                            </div>
                                            </div>
                                
                                            <div class="nav__menu">
                                            <div class="menu__top">
                                                <div class="close__toggle">
                                                <svg>
                                                    <use xlink:href="./images/sprite.svg#icon-cross"></use>
                                                </svg>
                                                </div>
                                            </div>
                                            <ul class="nav__list">
                                                <li class="nav__item">
                                                <a href="/laptop" class="nav__link scroll-link">Laptops</a>
                                                </li>
                                
                                                <li class="nav__item">
                                                <a href="/smartphone" class="nav__link scroll-link">Smartphones</a>
                                                </li>
                                
                                                <li class="nav__item">
                                                <a href="/storage" class="nav__link scroll-link">Storages</a>
                                                </li>
                                
                                            <ul class="nav__icons">
                                            </ul>
                                            </div>
                                        </nav>
                                        </div>
                                            
                                <!-- upcoming Section -->
                                    <section class="section upcoming" id="upcoming">
                                        <div class="upcoming__container container">
                                        <div class="title">
                                            <h1 class="primary__title">LAPTOPS</h1>
                                        </div>
                                
                                <div class="contenedorCards">
                                    ${productCart}
                                    <!-- Footer -->
                                    <footer id="footer" class="section footer">
                                        <div class="container">
                                            <div class="footer_last">&copy; Copyright 2021 All Rights Reserved by 
                                            <strong>
                                                <a href="#">The Monk Store.Inc</a>
                                            </strong>
                                            </div>
                                        </div>
                                        </div>
                                        </div>
                                    </footer>
                                    <!-- End Footer -->
                                    </main>

                                    </body>`
    return laptop
    }
    catch(err){
        console.log(err)
    }
}

async function smartphoneRender(){
    const layoutSmartphone = `<!DOCTYPE html>
                        
                        <head>
                        <meta charset="UTF-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
                        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css">
                        <link rel="stylesheet" href="css/smartphone.css" />
                        
                        <title>Laptops</title>
                        </head>`
    let productCart = ``

    try{
    let result = await pool.query(`SELECT * FROM products WHERE category = $1`, ['smartphone'])
    console.log(result.rows)
    for (let i = 0; i < result.rows.length; i++) {
        productCart += `  <div class="card">
                            <div class="wrapper">
                            <div class="colorProd"></div>
                            <div class="imgProd" style="background-image: url(https://images-eu.ssl-images-amazon.com/images/I/31Qy4Tf82UL._SX300_SY300_QL70_FMwebp_.jpg);"></div>
                            <div class="infoProd">
                                <p class="nombreProd">${result.rows[i].name}</p>
                                <p class="extraInfo">Rs. ${result.rows[i].price}/-</p>
                                <div class="actions">
                                <div class="preciosGrupo">
                                    <div class="product_buttons">
                                        <form action="/product-view" method="GET">
                                        <input type="hidden" name="id" value="${result.rows[i].id}">
                                        <input type="hidden" name="category" value="${result.rows[i].category}">
                                        <button type="submit" class="btn wishlist">Buy Now</button>
                                        </form>
                                    </div>
                                </div>
                                <div class="icono action aFavs">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                                    <path d="M47 5c-6.5 0-12.9 4.2-15 10-2.1-5.8-8.5-10-15-10A15 15 0 0 0 2 20c0 13 11 26 30 39 19-13 30-26 30-39A15 15 0 0 0 47 5z">
                                    </path>
                                    </svg>
                                </div>
                                <div class="icono action alCarrito">
                                    <svg class="inCart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                                    <title>Quitar del carrito</title>
                                    <path d="M30 22H12M2 6h6l10 40h32l3.2-9.7"></path>
                                    <circle cx="20" cy="54" r="4"></circle>
                                    <circle cx="46" cy="54" r="4"></circle>
                                    <circle cx="46" cy="22" r="16"></circle>
                                    <path d="M53 18l-8 9-5-5"></path>
                                    </svg>
                                    <form action="/product-view" method="GET">
                                    <input type="hidden" name="id" value="${result.rows[i].id}">
                                    <input type="hidden" name="category" value="${result.rows[i].category}">
                                    <button type="submit">
                                    <svg class="outCart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                                    <title>Agregar al carrito</title>
                                    <path d="M2 6h10l10 40h32l8-24H16"></path>
                                    <circle cx="23" cy="54" r="4"></circle>
                                    <circle cx="49" cy="54" r="4"></circle>
                                    </svg>
                                    </button>
                                    </form>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>`
    }

    let smartphone = layoutSmartphone + `<body>
                                            <header id="header" class="header">
                                            <!-- Navigation -->
                                            <div class="navigation">
                                                <div class="container">
                                                <nav class="nav__center">
                                                    <div class="nav__header">
                                                    <div class="nav__logo">
                                                    <a href="/homepage"><img src="svg/The-Monk-store.svg"></a>
                                                    </div>
                                                        <div class="nav__hamburger">
                                                    </div>
                                                    </div>
                                        
                                                    <div class="nav__menu">
                                                    <div class="menu__top">
                                                        <div class="close__toggle">
                                                        <svg>
                                                            <use xlink:href="./images/sprite.svg#icon-cross"></use>
                                                        </svg>
                                                        </div>
                                                    </div>
                                                    <ul class="nav__list">
                                                        <li class="nav__item">
                                                        <a href="/laptop" class="nav__link scroll-link">Laptops</a>
                                                        </li>
                                        
                                                        <li class="nav__item">
                                                        <a href="/smartphone" class="nav__link scroll-link">Smartphones</a>
                                                        </li>
                                        
                                                        <li class="nav__item">
                                                        <a href="/storage" class="nav__link scroll-link">Storages</a>
                                                        </li>
                                        
                                                    <ul class="nav__icons">
                                                    </ul>
                                                    </div>
                                                </nav>
                                                </div>
                                                    
                                        <!-- upcoming Section -->
                                            <section class="section upcoming" id="upcoming">
                                                <div class="upcoming__container container">
                                                <div class="title">
                                                    <h1 class="primary__title">SMARTPHONES</h1>
                                                </div>
                                        
                                        <div class="contenedorCards">  
                                            ${productCart}
                                            <!-- Footer -->
                                            <footer id="footer" class="section footer">
                                                <div class="container">
                                                    <div class="footer_last">&copy; Copyright 2021 All Rights Reserved by 
                                                    <strong>
                                                        <a href="#">The Monk Store.Inc</a>
                                                    </strong>
                                                    </div>
                                                </div>
                                                </div>
                                                </div>
                                            </footer>
                                            <!-- End Footer -->
                                            </main>
                                        </body>`
    return smartphone
    }
    catch(err){
        console.log(err)
    }
}

async function storageRender(){
    const layoutStorage = `<!DOCTYPE html>
                        
                        <head>
                        <meta charset="UTF-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
                        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css">
                        <link rel="stylesheet" href="css/storage.css" />
                        
                        <title>Laptops</title>
                        </head>`

    let productCart = ``

    try{
    let result = await pool.query(`SELECT * FROM products WHERE category = $1`, ['storage'])
    console.log(result.rows)
    for (let i = 0; i < result.rows.length; i++) {
        productCart += `  <div class="card">
                            <div class="wrapper">
                            <div class="colorProd"></div>
                            <div class="imgProd" style="background-image: url(https://images-eu.ssl-images-amazon.com/images/I/41RbYlMPpBL._SX300_SY300_QL70_FMwebp_.jpg);"></div>
                            <div class="infoProd">
                                <p class="nombreProd">${result.rows[i].name}</p>
                                <p class="extraInfo">Rs. ${result.rows[i].price}/-</p>
                                <div class="actions">
                                <div class="preciosGrupo">
                                    <div class="product_buttons">
                                        <form action="/product-view" method="GET">
                                        <input type="hidden" name="id" value="${result.rows[i].id}">
                                        <input type="hidden" name="category" value="${result.rows[i].category}">
                                        <button type="submit" class="btn wishlist">Buy Now</button>
                                        </form>
                                    </div>
                                </div>
                                <div class="icono action aFavs">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                                    <path d="M47 5c-6.5 0-12.9 4.2-15 10-2.1-5.8-8.5-10-15-10A15 15 0 0 0 2 20c0 13 11 26 30 39 19-13 30-26 30-39A15 15 0 0 0 47 5z">
                                    </path>
                                    </svg>
                                </div>
                                <div class="icono action alCarrito">
                                    <svg class="inCart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                                    <title>Quitar del carrito</title>
                                    <path d="M30 22H12M2 6h6l10 40h32l3.2-9.7"></path>
                                    <circle cx="20" cy="54" r="4"></circle>
                                    <circle cx="46" cy="54" r="4"></circle>
                                    <circle cx="46" cy="22" r="16"></circle>
                                    <path d="M53 18l-8 9-5-5"></path>
                                    </svg>
                                    <form action="/product-view" method="GET">
                                    <input type="hidden" name="id" value="${result.rows[i].id}">
                                    <input type="hidden" name="category" value="${result.rows[i].category}">
                                    <button type="submit">
                                    <svg class="outCart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                                    <title>Agregar al carrito</title>
                                    <path d="M2 6h10l10 40h32l8-24H16"></path>
                                    <circle cx="23" cy="54" r="4"></circle>
                                    <circle cx="49" cy="54" r="4"></circle>
                                    </svg>
                                    </button>
                                    </form>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>`
    }

    let storage = layoutStorage + `<body>
                                            <header id="header" class="header">
                                            <!-- Navigation -->
                                            <div class="navigation">
                                                <div class="container">
                                                <nav class="nav__center">
                                                    <div class="nav__header">
                                                    <div class="nav__logo">
                                                    <a href="/homepage"><img src="svg/The-Monk-store.svg"></a>
                                                    </div>
                                                        <div class="nav__hamburger">
                                                    </div>
                                                    </div>
                                        
                                                    <div class="nav__menu">
                                                    <div class="menu__top">
                                                        <div class="close__toggle">
                                                        <svg>
                                                            <use xlink:href="./images/sprite.svg#icon-cross"></use>
                                                        </svg>
                                                        </div>
                                                    </div>
                                                    <ul class="nav__list">
                                                        <li class="nav__item">
                                                        <a href="/laptop" class="nav__link scroll-link">Laptops</a>
                                                        </li>
                                        
                                                        <li class="nav__item">
                                                        <a href="/smartphone" class="nav__link scroll-link">Smartphones</a>
                                                        </li>
                                        
                                                        <li class="nav__item">
                                                        <a href="/storage" class="nav__link scroll-link">Storages</a>
                                                        </li>
                                        
                                                    <ul class="nav__icons">
                                                    </ul>
                                                    </div>
                                                </nav>
                                                </div>
                                                    
                                        <!-- upcoming Section -->
                                            <section class="section upcoming" id="upcoming">
                                                <div class="upcoming__container container">
                                                <div class="title">
                                                    <h1 class="primary__title">STORAGES</h1>
                                                </div>
                                        
                                        <div class="contenedorCards">  
                                            ${productCart}
                                            <!-- Footer -->
                                            <footer id="footer" class="section footer">
                                                <div class="container">
                                                    <div class="footer_last">&copy; Copyright 2021 All Rights Reserved by 
                                                    <strong>
                                                        <a href="#">The Monk Store.Inc</a>
                                                    </strong>
                                                    </div>
                                                </div>
                                                </div>
                                                </div>
                                            </footer>
                                            <!-- End Footer -->
                                            </main>
                                        </body>`
    return storage
    }
    catch(err){
        console.log(err)
    }
}

async function orderHistoryRender(user){
    const layoutOrderHistory = `<!DOCTYPE html>
    <head>
    <meta charset="UTF-8">
    <title>The Monk Store</title>
    <link rel="stylesheet" href="css/order-history.css">
    <link rel="stylesheet" href="css/footer.css">
    </head>`
    let orderedProduct = ``
    let sum = 0

    try{
        const result = await pool.query(`SELECT * FROM orders WHERE useremail = $1`, [user.email])
        for (let i = 0; i < result.rows.length; i++) {
            
            let orderImageUrl

            if(result.rows[i].category == 'laptop') orderImageUrl = 'https://images-na.ssl-images-amazon.com/images/I/61pwrivrfUS._SL1500_.jpg'
            else if(result.rows[i].category == 'smartphone') orderImageUrl = 'https://images-eu.ssl-images-amazon.com/images/I/31Qy4Tf82UL._SX300_SY300_QL70_FMwebp_.jpg'
            else orderImageUrl = 'https://images-eu.ssl-images-amazon.com/images/I/41RbYlMPpBL._SX300_SY300_QL70_FMwebp_.jpg'

            orderedProduct += `<div class="order-container">
                                    <div class="header">
                                        <div class="row">
                                        <div class="col-1"><span>ORDERS PLACED</span><span>${result.rows[i].date}</span></div>
                                        <div class="col-2"><span>TOTAL</span><span>Rs. ${result.rows[i].price}/-</span></div>
                                        <div class="col-3"><span>SHIPPED TO</span><span>${user.name}</span></div>
                                        <div class="col-4"><span>ORDER NUMBER</span><span>XXXXX</span></div>
                                        </div>
                                    </div>
                                    <div class="box"> 
                                        <div class="row">
                                        <div class="col-1">
                                            <img src="${orderImageUrl}" alt="">
                                        </div>
                                        <div class="col-2">
                                            <span class="product-title">${result.rows[i].name}<i class="fa fa-pencil-square-o" aria-hidden="true"></i></span>
                                            <p>Order Status: Delivered <br>
                                            Total Quantity 01 <br>
                                            Billed On: ${result.rows[i].date} </p>
                                        <a href="#" class="btn-default"><i class="fa fa-repeat" aria-hidden="true"></i> Re-Order</a>
                                        </div>
                                        <div class="col-3">
                                        <a href="#" class="btn-default"><i class="fa fa-download" aria-hidden="true"></i> Download Bill</a>
                                        </div>
                                        </div>
                                    </div>
                                    </div>`
            
            let number = result.rows[i].price
            number = parseInt(number.split(',').join(''));
            sum += number
            
        }
        let gst = (sum*(0.05)).toFixed(2)
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
                                                        <li class="oh selected"><a href="/order-history">Order History</a></li>
                                                        <li class="fo"><a href="/cart">Cart Deck</a></li>
                                                        </ul>
                                                    </div>
                                                    
                                                    <div class="row" id="order-history">
                                                    
                                                        <div class="row order-summary">
                                                        <div class="totalspent-orders">
                                                            <h2>Rs. ${sum}</h2>
                                                            <h3>Total Spent</h3>
                                                        </div>
                                                        <div class="printqty-orders">
                                                            <h2>${result.rows.length}</h2>
                                                            <h3>Total Orders</h3>
                                                        </div>
                                                        <div class="total_gst">
                                                            <h2>Rs. ${gst}</h2>
                                                            <h3>Total GST Paid</h3>
                                                        </div>
                                                        <div class="ytd-orders">
                                                            <h2>0</h2>
                                                            <h3>Refund Request</h3>
                                                        </div>
                                                        </div>
                                                            ${orderedProduct}
                                                    </div>      
                                                    </div>
                                                    <p class="copyright">&copy Copyrights. All rights reservered, 2021</p>  
                                                    </body>`

        return orderHistory
    }
    catch(err){
        console.log(err)
    }
}

async function sellerProductRender(user){
    const layoutOrderHistory = `<!DOCTYPE html>
    <html lang="en" >
    <head>
      <meta charset="UTF-8">
      <title>Product Sold/The-Monk-Store</title>
    <link rel="stylesheet" href="/css/product-sold.css">
    
    </head>`
    let orderedProduct = ``
    let sum = 0

    try{
        const result = await pool.query(`SELECT * FROM products WHERE seller = $1`, [user.email])
        for (let i = 0; i < result.rows.length; i++) {
            
            let orderImageUrl

            if(result.rows[i].category == 'laptop') orderImageUrl = 'https://images-na.ssl-images-amazon.com/images/I/61pwrivrfUS._SL1500_.jpg'
            else if(result.rows[i].category == 'smartphone') orderImageUrl = 'https://images-eu.ssl-images-amazon.com/images/I/31Qy4Tf82UL._SX300_SY300_QL70_FMwebp_.jpg'
            else orderImageUrl = 'https://images-eu.ssl-images-amazon.com/images/I/41RbYlMPpBL._SX300_SY300_QL70_FMwebp_.jpg'

            orderedProduct += `    <div class="order-container">
                                    <div class="header">
                                    <div class="row">
                                        <div class="col-2"><span>TOTAL</span><span>Rs. ${result.rows[i].price}/-</span></div>
                                    </div>
                                    </div>
                                    <div class="box">
                                    <div class="row">
                                        <div class="col-1">
                                        <img src=${orderImageUrl} alt="">
                                        </div>
                                        <div class="col-2">
                                        <span class="product-title">Product Name: ${result.rows[i].name}</span>
                                        <span class="product-title">Product Description: ${result.rows[i].description}</span>
                                        <form action="/remove-seller-product" method="POST">
                                        <input type="hidden" name="id" value=${result.rows[i].id} />
                                        <button type="submit" class="btn-default"><i class="fa fa-repeat" aria-hidden="true"></i> Remove</button>
                                        </div>
                                        </form>
                                    </div>
                                    </div>
                                </div>`
            
        }
        let orderHistory = layoutOrderHistory + `<body>
                                                <div class="container">
                                                
                                                <div class="row">
                                                    <div class="order-tittle">
                                                    <a href="/seller"><img src="/svg/The-Monk-store.svg" height="80px" width="250px"></a>
                                                    </div>
                                                </div>
                                                
                                                <div class="row title-row">
                                                    <div class="page-title">
                                                    <h1>Product Sold</h1>
                                                    </div>
                                                </div>  
                                                
                                                <div class="row order_sorter">
                                                    <ul id="toggle-orders">
                                                    <li class="first"></li>
                                                    <li class="oh selected"><a href="#">Products List</a></li>
                                                    </ul>
                                                </div>
                                                
                                                <div class="row" id="order-history">
                                                    ${orderedProduct}
                                                <p class="copyright">&copy Copyrights. All rights reservered, 2021</p>   
                                                </div>      
                                                </div>
                                                </body>
                                                </html>`

        return orderHistory
    }
    catch(err){
        console.log(err)
    }
}

async function cartHistoryRender(user){
    const layoutOrderHistory = `<!DOCTYPE html>
    <head>
    <meta charset="UTF-8">
    <title>The Monk Store</title>
    <link rel="stylesheet" href="css/order-history.css">
    <link rel="stylesheet" href="css/footer.css">
    </head>`
    let orderedProduct = ``
    let sum = 0

    try{
        const result = await pool.query(`SELECT * FROM cart WHERE useremail = $1`, [user.email])
        for (let i = 0; i < result.rows.length; i++) {
            
            let orderImageUrl

            if(result.rows[i].category == 'laptop') orderImageUrl = 'https://images-na.ssl-images-amazon.com/images/I/61pwrivrfUS._SL1500_.jpg'
            else if(result.rows[i].category == 'smartphone') orderImageUrl = 'https://images-eu.ssl-images-amazon.com/images/I/31Qy4Tf82UL._SX300_SY300_QL70_FMwebp_.jpg'
            else orderImageUrl = 'https://images-eu.ssl-images-amazon.com/images/I/41RbYlMPpBL._SX300_SY300_QL70_FMwebp_.jpg'

            orderedProduct += `<div class="order-container">
                                    <div class="header">
                                        <div class="row">
                                        <div class="col-1"><span>ADDED ON</span><span>${result.rows[i].date}</span></div>
                                        <div class="col-2"><span>TOTAL</span><span>Rs. ${result.rows[i].price}/-</span></div>
                                        <div class="col-3"><span>SHIPING TO</span><span>${user.name}</span></div>
                                        <div class="col-4"><span>ORDER NUMBER</span><span>XXXXX</span></div>
                                        </div>
                                    </div>
                                    <div class="box"> 
                                        <div class="row">
                                        <div class="col-1">
                                            <img src="${orderImageUrl}" alt="">
                                        </div>
                                        <div class="col-2">
                                            <span class="product-title">${result.rows[i].name}<i class="fa fa-pencil-square-o" aria-hidden="true"></i></span>
                                            <p>Total Quantity 01 <br>
                                            Added on: ${result.rows[i].date} </p>
                                        <a href="/product-view?id=${result.rows[i].productid}&category=${result.rows[i].category}" class="btn-default"><i class="fa fa-repeat" aria-hidden="true"></i> View Product</a>
                                        </div>
                                        <div class="col-3">
                                        <a href="/product-view?id=${result.rows[i].productid}&category=${result.rows[i].category}" class="btn-default"><i class="fa fa-download" aria-hidden="true"></i> Order Now</a>
                                        </div>
                                        </div>
                                    </div>
                                    </div>`
            
            let number = result.rows[i].price
            number = parseInt(number.split(',').join(''));
            sum += number
            
        }
        let gst = (sum*(0.05)).toFixed(2)
        let orderHistory = layoutOrderHistory + `<body>
                                                    <div class="container">
                                                    
                                                    <div class="row">
                                                        <div class="order-tittle">
                                                        <a href="/homepage"><img src="images/the-monk-store-order-history.png" class="main-logo" height="80px" width="250px"><a>
                                                        </div>
                                                    </div>
                                                    
                                                    <div class="row title-row">
                                                        <div class="page-title">
                                                        <h1>Cart History</h1>
                                                        </div>
                                                    </div>  
                                                    
                                                    <div class="row order_sorter">
                                                        <ul id="toggle-orders">
                                                        <li class="first"></li>
                                                        <li class="oh"><a href="/order-history">Order History</a></li>
                                                        <li class="fo selected"><a href="/cart">Cart Deck</a></li>
                                                        </ul>
                                                    </div>
                                                    
                                                    <div class="row" id="order-history">
                                                    
                                                        <div class="row order-summary">
                                                        <div class="totalspent-orders">
                                                            <h2>Rs. ${sum}</h2>
                                                            <h3>Cart Value</h3>
                                                        </div>
                                                        <div class="printqty-orders">
                                                            <h2>${result.rows.length}</h2>
                                                            <h3>Total Items</h3>
                                                        </div>
                                                        <div class="total_gst">
                                                            <h2>Rs. ${gst}</h2>
                                                            <h3>Total GST of cart value</h3>
                                                        </div>
                                                        <div class="ytd-orders">
                                                            <h2>0</h2>
                                                            <h3>Refund Request</h3>
                                                        </div>
                                                        </div>
                                                            ${orderedProduct}
                                                    </div>      
                                                    </div>
                                                    <p class="copyright">&copy Copyrights. All rights reservered, 2021</p>  
                                                    </body>`

        return orderHistory
    }
    catch(err){
        console.log(err)
    }
}

async function productView(message_type, message_text, user, product){
    if (message_type) {
        message_color = 'lightgreen'
    }
    else if (message_type == '') {
        message_color = 'transparent'
    }
    else{
        message_color = '#ff7271'
    }

    message = message_text

    layoutProductView = `<!DOCTYPE html>
                        <head>
                        <meta charset="UTF-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
                        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css">
                        <link rel="stylesheet" href="css/product-view.css" />
                        <link rel="stylesheet" href="css/spinner.css" />
                        <link rel="stylesheet" href="css/homepage-error.css" />
                        
                        <title>The Monk Store-Product View</title>
                        </head>`

    try{
        let result = await pool.query(`SELECT * FROM products WHERE id = $1`, [product.id])
        if(result.rows.length > 0){

            details = result.rows[0]

            let orderImageUrl
            let width

            if(details.category == 'laptop') {orderImageUrl = 'https://images-na.ssl-images-amazon.com/images/I/61pwrivrfUS._SL1500_.jpg'; width = '45%'}
            else if(details.category == 'smartphone') {orderImageUrl = 'https://images-eu.ssl-images-amazon.com/images/I/31Qy4Tf82UL._SX300_SY300_QL70_FMwebp_.jpg' ; width = '25%'}
            else {orderImageUrl = 'https://images-eu.ssl-images-amazon.com/images/I/41RbYlMPpBL._SX300_SY300_QL70_FMwebp_.jpg'; width = '35%'}

            let url1 = `/product-view?id=${result.rows[0].id}&category=${result.rows[0].category}`
            let url2 = `/review?id=${result.rows[0].id}&category=${result.rows[0].category}`
            let url3 = `/about-seller?id=${result.rows[0].id}&category=${result.rows[0].category}`
            let productView = layoutProductView + `<body>
                            <div class="notification">
                            <div class="notification-container" style="background-color: ${message_color};">${message}</div>
                            </div>
                            <script>
                            let div = document.getElementsByClassName('notification')[0];
                            let secDiv = document.getElementsByClassName('notification-container')[0];
                            if(secDiv.style["background-color"] != 'transparent'){
                                setTimeout(() => {
                                    div.style.animation = "slideBackToTop 250ms ease-in"
                                    setTimeout(() => {
                                    div.style["background-color"] = ""
                                    div.style.color = "transparent"
                                    setTimeout(() => {
                                        div.remove()
                                    }, 100);
                                    }, 250);
                                }, 5000);
                            }
                            else if (secDiv.style["background-color"] == 'transparent'){
                                div.remove();
                                console.log('removing');
                            }
                            </script>
                        
                            <header id="header" class="header">
                            <!-- Navigation -->
                            <div class="navigation">
                                <div class="container">
                                <nav class="nav__center">
                                    <div class="nav__header">
                                    <div class="nav__logo">
                                    <a href="/homepage"><img src="svg/The-Monk-store.svg"></a>
                                    </div>
                                        <div class="nav__hamburger">
                                        <span>
                                        <svg>
                                            <use xlink:href="./images/sprite.svg#icon-menu"></use>
                                        </svg>
                                        </span>
                                    </div>
                                    </div>
                        
                                    <div class="nav__menu">
                                    <div class="menu__top">
                                        <h1 class="nav__category">Monk<span>Store</span></h1>
                                        <div class="close__toggle">
                                        <svg>
                                            <use xlink:href="./images/sprite.svg#icon-cross"></use>
                                        </svg>
                                        </div>
                                    </div>
                                    <ul class="nav__list">
                                        <li class="nav__item">
                                        <a href="/homepage" class="nav__link scroll-link">Home</a>
                                        </li>
                        
                                        <li class="nav__item">
                                        <a href="/settings" class="nav__link scroll-link">Settings</a>
                                        </li>
                        
                                        <li class="nav__item">
                                        <a href="/order-history" class="nav__link scroll-link">Order History</a>
                                        </li>
                                    </ul>
                                    </div>
                                </nav>
                                </div>
                            </div>
                        
                            <section>
                                <div class="card">
                        
                                    <!-- Head Content -->
                        
                                    <div class="top-content">
                                        <div class="travel-image">
                                            <img src=${orderImageUrl} style="width: ${width};" alt="" >
                                        </div>
                        
                                <!--  Middle Content  -->
                        
                                    </div>  
                                    <div class="mid-content">
                                        <div class="short-detail">
                                            <h3>${details.name}</h3>
                                        </div>
                                    </div>
                                    <div class="desc-content">
                                        <div class="desc-nav">
                                            <span><a href="${url1}">Description</a></span>
                                            <span><a href="${url2}">Reviews</a></span>
                                            <span><a href="${url3}">About</a></span>
                                        </div>
                                        <p>${details.description}</p>
                                    </div>
                                
                                <!--  Bottom Content  -->
                        
                                    <div class="bottom-content">
                                        <div class="desc-nav">
                                            <p>Rs. ${details.price}/-</p>
                                        </div>
                                        <form action="/order" method="POST">
                                        <input type="hidden" name="id" value="${result.rows[0].id}">
                                        <input type="hidden" name="category" value="${result.rows[0].category}">
                                        <button type="submit" class="btn wishlist spinner-btn">Buy Now</button>
                                        </form>
                                        <form action="/add-cart" method="POST">
                                        <input type="hidden" name="id" value="${result.rows[0].id}">
                                        <input type="hidden" name="category" value="${result.rows[0].category}">
                                        <button type="submit" class="btn wishlist spinner-btn">Add To Cart</button>
                                        </form>
                                        
                                    </div>
                                </div>
                                ${homepageSpinner}
                            </section>
                        
                            <!-- Hero -->
                            </header>
                            <main>
                            
                        
                        
                                    
                            <!-- Footer -->
                            <footer id="footer" class="section footer">
                                <div class="container">
                                <div class="footer__top">
                                    <div class="footer-top__box">
                                    <h3>EXTRAS</h3>
                                    <a href="#">Brands</a>
                                    <a href="#">Gift Cards</a>
                                    <a href="#">Specials</a>
                                    <a href="#">Support</a>
                                    </div>
                                    <div class="footer-top__box">
                                    <h3>INFORMATION</h3>
                                    <a href="#">About Us</a>
                                    <a href="#">Privacy Policy</a>
                                    <a href="#">Terms & Conditions</a>
                                    <a href="#">Contact Us</a>
                                    </div>
                        
                                    <div class="footer-top__box">
                                    <h3>MY ACCOUNT</h3>
                                    <a href="#">My Account</a>
                                    <a href="#">Order History</a>
                                    <a href="#">Cart</a>
                                    <a href="#">FeedBack</a>
                                    <a href="#">Returns</a>
                                    </div>
                                    <div class="footer-top__box">
                                    <h3>CONTACT US</h3>
                                    <div>
                                    B8-Jabalpur, 482002
                                    </div>
                                    <div>
                                        keplons@outlook.com
                                    </div>
                                    <div>
                                    +91-9878881179
                                    </div>
                                    <div>
                                    Madhya Pradesh, India.
                                    </div>
                                    </div>
                                    <div class="footer_last">&copy; Copyright 2021 All Rights Reserved by 
                                    <strong>
                                        <a href="#">The Monk Store.Inc</a>
                                    </strong>
                                    </div>
                                </div>
                                </div>
                                </div>
                            </footer>
                            <!-- End Footer -->
                            </main>
                        </body>
                        `

        return productView
        }
    }
    catch(err){
        console.log(err)
    }
    
}

async function reviewRender(message_type, message_text, user, product){
    if (message_type) {
        message_color = 'lightgreen'
    }
    else if (message_type == '') {
        message_color = 'transparent'
    }
    else{
        message_color = '#ff7271'
    }

    message = message_text
    let reviews = ``

    layoutProductView = `<!DOCTYPE html>
                        <head>
                        <meta charset="UTF-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
                        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css">
                        <link rel="stylesheet" href="css/product-view.css" />
                        <link rel="stylesheet" href="css/review.css" />
                        <link rel="stylesheet" href="css/spinner.css" />
                        <link rel="stylesheet" href="css/homepage-error.css" />
                        
                        <title>The Monk Store-Product View</title>
                        </head>`

    try{
        let result = await pool.query(`SELECT * FROM products WHERE id = $1`, [product.id])
        if(result.rows.length == 1){
        try{
            let reviewsGiven = await pool.query(`SELECT * FROM reviews WHERE productid = $1`, [product.id])
            for (let i = 0; i < reviewsGiven.rows.length; i++) {
                 details = reviewsGiven.rows[i]
                 reviews += `<div class="reviews">
                 <p>${details.username}:</p>
                 <p>${details.review}</p>
                 <p>${details.date}</p>
                 </div>` 
            }
        } catch(err){
            console.log(err)
        }

            let orderImageUrl
            let width

            let url1 = `/product-view?id=${result.rows[0].id}&category=${result.rows[0].category}`
            let url2 = `/review?id=${result.rows[0].id}&category=${result.rows[0].category}`
            let url3 = `/about-seller?id=${result.rows[0].id}&category=${result.rows[0].category}`
            let productView = layoutProductView + `<body>
                            <div class="notification">
                            <div class="notification-container" style="background-color: ${message_color};">${message}</div>
                            </div>
                            <script>
                            let div = document.getElementsByClassName('notification')[0];
                            let secDiv = document.getElementsByClassName('notification-container')[0];
                            if(secDiv.style["background-color"] != 'transparent'){
                                setTimeout(() => {
                                    div.style.animation = "slideBackToTop 250ms ease-in"
                                    setTimeout(() => {
                                    div.style["background-color"] = ""
                                    div.style.color = "transparent"
                                    setTimeout(() => {
                                        div.remove()
                                    }, 100);
                                    }, 250);
                                }, 5000);
                            }
                            else if (secDiv.style["background-color"] == 'transparent'){
                                div.remove();
                                console.log('removing');
                            }
                            </script>
                        
                            <header id="header" class="header">
                            <!-- Navigation -->
                            <div class="navigation">
                                <div class="container">
                                <nav class="nav__center">
                                    <div class="nav__header">
                                    <div class="nav__logo">
                                    <a href="/homepage"><img src="svg/The-Monk-store.svg"></a>
                                    </div>
                                        <div class="nav__hamburger">
                                        <span>
                                        <svg>
                                            <use xlink:href="./images/sprite.svg#icon-menu"></use>
                                        </svg>
                                        </span>
                                    </div>
                                    </div>
                        
                                    <div class="nav__menu">
                                    <div class="menu__top">
                                        <h1 class="nav__category">Monk<span>Store</span></h1>
                                        <div class="close__toggle">
                                        <svg>
                                            <use xlink:href="./images/sprite.svg#icon-cross"></use>
                                        </svg>
                                        </div>
                                    </div>
                                    <ul class="nav__list">
                                        <li class="nav__item">
                                        <a href="/homepage" class="nav__link scroll-link">Home</a>
                                        </li>
                        
                                        <li class="nav__item">
                                        <a href="/settings" class="nav__link scroll-link">Settings</a>
                                        </li>
                        
                                        <li class="nav__item">
                                        <a href="/order-history" class="nav__link scroll-link">Order History</a>
                                        </li>
                                    </ul>
                                    </div>
                                </nav>
                                </div>
                            </div>
                        
                            <section>
                                <div class="card" style="height: 500px;">
                        
                                    <!-- Head Content -->
                        
                                    
                                    <div class="desc-content">
                                        <div class="desc-nav">
                                            <span><a href="${url1}">Description</a></span>
                                            <span><a href="${url2}">Reviews</a></span>
                                            <span><a href="${url3}">About</a></span>
                                        </div>

                                        <div class="write-review">
                                        <form action="/review" method="POST">
                                        <input type="hidden" name="id" value="${result.rows[0].id}">
                                        <input type="hidden" name="category" value="${result.rows[0].category}">
                                        <input type="text" name="review" placeholder="write your review">
                                        <button type="submit" class="btn wishlist spinner-btn">Add Review</button>
                                        </form>
                                        </div>

                                        <div class="review-card">
                                        ${reviews}
                                        </div>
                                    </div>
                                
                                <!--  Bottom Content  -->
                        
                                   
                                </div>
                                ${homepageSpinner}
                            </section>
                        
                            <!-- Hero -->
                            </header>
                            <main>
                            
                        
                        
                                    
                            <!-- Footer -->
                            <footer id="footer" class="section footer">
                                <div class="container">
                                <div class="footer__top">
                                    <div class="footer-top__box">
                                    <h3>EXTRAS</h3>
                                    <a href="#">Brands</a>
                                    <a href="#">Gift Cards</a>
                                    <a href="#">Specials</a>
                                    <a href="#">Support</a>
                                    </div>
                                    <div class="footer-top__box">
                                    <h3>INFORMATION</h3>
                                    <a href="#">About Us</a>
                                    <a href="#">Privacy Policy</a>
                                    <a href="#">Terms & Conditions</a>
                                    <a href="#">Contact Us</a>
                                    </div>
                        
                                    <div class="footer-top__box">
                                    <h3>MY ACCOUNT</h3>
                                    <a href="#">My Account</a>
                                    <a href="#">Order History</a>
                                    <a href="#">Cart</a>
                                    <a href="#">FeedBack</a>
                                    <a href="#">Returns</a>
                                    </div>
                                    <div class="footer-top__box">
                                    <h3>CONTACT US</h3>
                                    <div>
                                    B8-Jabalpur, 482002
                                    </div>
                                    <div>
                                        keplons@outlook.com
                                    </div>
                                    <div>
                                    +91-9878881179
                                    </div>
                                    <div>
                                    Madhya Pradesh, India.
                                    </div>
                                    </div>
                                    <div class="footer_last">&copy; Copyright 2021 All Rights Reserved by 
                                    <strong>
                                        <a href="#">The Monk Store.Inc</a>
                                    </strong>
                                    </div>
                                </div>
                                </div>
                                </div>
                            </footer>
                            <!-- End Footer -->
                            </main>
                        </body>
                        `

        return productView
        
        }
    }
    catch(err){
        console.log(err)
    }
    
}

async function aboutSellerRender(message_type, message_text, user, product){
    if (message_type) {
        message_color = 'lightgreen'
    }
    else if (message_type == '') {
        message_color = 'transparent'
    }
    else{
        message_color = '#ff7271'
    }

    message = message_text
    let sellerDetails

    layoutProductView = `<!DOCTYPE html>
                        <head>
                        <meta charset="UTF-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
                        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css">
                        <link rel="stylesheet" href="css/product-view.css" />
                        <link rel="stylesheet" href="css/about-seller.css" />
                        <link rel="stylesheet" href="css/spinner.css" />
                        <link rel="stylesheet" href="css/homepage-error.css" />
                        
                        <title>The Monk Store-Product View</title>
                        </head>`

    try{
        let result = await pool.query(`SELECT * FROM products WHERE id = $1`, [product.id])
        if(result.rows.length == 1){
            let orderImageUrl
            let width

            try {
                let result_seller = await pool.query(`SELECT name, email FROM users WHERE email = $1`, [result.rows[0].seller])
                if(!result_seller.rows[0]){
                    sellerDetails = {
                        name: `The Monk Store`,
                        email: `keplons@outlook.com`
                    }
                }
                else{
                    sellerDetails = {
                        name: result_seller.rows[0].name,
                        email: result_seller.rows[0].email
                    }
                }
            } catch (error) {
                console.log(error)
            }

            let url1 = `/product-view?id=${result.rows[0].id}&category=${result.rows[0].category}`
            let url2 = `/review?id=${result.rows[0].id}&category=${result.rows[0].category}`
            let url3 = `/about-seller?id=${result.rows[0].id}&category=${result.rows[0].category}`
            console.log(sellerDetails)
            let productView = layoutProductView + `<body>
                            <div class="notification">
                            <div class="notification-container" style="background-color: ${message_color};">${message}</div>
                            </div>
                            <script>
                            let div = document.getElementsByClassName('notification')[0];
                            let secDiv = document.getElementsByClassName('notification-container')[0];
                            if(secDiv.style["background-color"] != 'transparent'){
                                setTimeout(() => {
                                    div.style.animation = "slideBackToTop 250ms ease-in"
                                    setTimeout(() => {
                                    div.style["background-color"] = ""
                                    div.style.color = "transparent"
                                    setTimeout(() => {
                                        div.remove()
                                    }, 100);
                                    }, 250);
                                }, 5000);
                            }
                            else if (secDiv.style["background-color"] == 'transparent'){
                                div.remove();
                                console.log('removing');
                            }
                            </script>
                        
                            <header id="header" class="header">
                            <!-- Navigation -->
                            <div class="navigation">
                                <div class="container">
                                <nav class="nav__center">
                                    <div class="nav__header">
                                    <div class="nav__logo">
                                    <a href="/homepage"><img src="svg/The-Monk-store.svg"></a>
                                    </div>
                                        <div class="nav__hamburger">
                                        <span>
                                        <svg>
                                            <use xlink:href="./images/sprite.svg#icon-menu"></use>
                                        </svg>
                                        </span>
                                    </div>
                                    </div>
                        
                                    <div class="nav__menu">
                                    <div class="menu__top">
                                        <h1 class="nav__category">Monk<span>Store</span></h1>
                                        <div class="close__toggle">
                                        <svg>
                                            <use xlink:href="./images/sprite.svg#icon-cross"></use>
                                        </svg>
                                        </div>
                                    </div>
                                    <ul class="nav__list">
                                        <li class="nav__item">
                                        <a href="/homepage" class="nav__link scroll-link">Home</a>
                                        </li>
                        
                                        <li class="nav__item">
                                        <a href="/settings" class="nav__link scroll-link">Settings</a>
                                        </li>
                        
                                        <li class="nav__item">
                                        <a href="/order-history" class="nav__link scroll-link">Order History</a>
                                        </li>
                                    </ul>
                                    </div>
                                </nav>
                                </div>
                            </div>
                        
                            <section>
                                <div class="card" style="height: 500px;">
                        
                                    <!-- Head Content -->
                        
                                    
                                    <div class="desc-content">
                                        <div class="desc-nav">
                                            <span><a href="${url1}">Description</a></span>
                                            <span><a href="${url2}">Reviews</a></span>
                                            <span><a href="${url3}">About</a></span>
                                        </div>

                                        <div>
                                        <p>Seller: ${sellerDetails.name}</p>
                                        <p>Contact: ${sellerDetails.email}</p>
                                        </div>
                                    </div>
                                
                                <!--  Bottom Content  -->
                        
                                   
                                </div>
                                ${homepageSpinner}
                            </section>
                        
                            <!-- Hero -->
                            </header>
                            <main>
                            
                        
                        
                                    
                            <!-- Footer -->
                            <footer id="footer" class="section footer">
                                <div class="container">
                                <div class="footer__top">
                                    <div class="footer-top__box">
                                    <h3>EXTRAS</h3>
                                    <a href="#">Brands</a>
                                    <a href="#">Gift Cards</a>
                                    <a href="#">Specials</a>
                                    <a href="#">Support</a>
                                    </div>
                                    <div class="footer-top__box">
                                    <h3>INFORMATION</h3>
                                    <a href="#">About Us</a>
                                    <a href="#">Privacy Policy</a>
                                    <a href="#">Terms & Conditions</a>
                                    <a href="#">Contact Us</a>
                                    </div>
                        
                                    <div class="footer-top__box">
                                    <h3>MY ACCOUNT</h3>
                                    <a href="#">My Account</a>
                                    <a href="#">Order History</a>
                                    <a href="#">Cart</a>
                                    <a href="#">FeedBack</a>
                                    <a href="#">Returns</a>
                                    </div>
                                    <div class="footer-top__box">
                                    <h3>CONTACT US</h3>
                                    <div>
                                    B8-Jabalpur, 482002
                                    </div>
                                    <div>
                                        keplons@outlook.com
                                    </div>
                                    <div>
                                    +91-9878881179
                                    </div>
                                    <div>
                                    Madhya Pradesh, India.
                                    </div>
                                    </div>
                                    <div class="footer_last">&copy; Copyright 2021 All Rights Reserved by 
                                    <strong>
                                        <a href="#">The Monk Store.Inc</a>
                                    </strong>
                                    </div>
                                </div>
                                </div>
                                </div>
                            </footer>
                            <!-- End Footer -->
                            </main>
                        </body>
                        `

        return productView
        
        }
    }
    catch(err){
        console.log(err)
    }
    
}


module.exports = {
    notificationRender, 
    pageRender,
    productRender
}