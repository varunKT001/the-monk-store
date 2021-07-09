# THE MONK STORE
---
## Description
The Monk Store is an online store which facilitates the easy online purchasing of gadgets like Smartphones, Laptops and Storage devices. The main aim of Monk Store is to provide quality products to its customers in a transparent manner. We always try to work upon customer needs and their requirements. We are continuously working on our interface to make it more attractive.

## Screenshots
Link to screenshots and video: [DRIVE LINK](https://drive.google.com/drive/folders/1a9aKDEmQS6xDlDykMyMslMFQWDcVYcn_?usp=sharing)

## Youtube video
Link to the youtube video for website Demo: [YOUTUBE LINK](https://youtu.be/BR4GLcENSGM)

## Hosted URL
Link of the Website: [THE MONK STORE](https://webkriti-the-monk-store.herokuapp.com/)

## Features implemented
* #### Log in/ Sign up: 
    The first thing the user needs to do is to register himself on the store so that he/she can do purchasing and also avail other facilities like profile updating, order history, sell products(if the user is a seller) etc. It is mandatory to use a verified email-address while registering a new user account, so that user can verify themself from the email which was sent by the monk store. User can use any password while registering. Every login session is of 20 minutes. If the user logs out, the session terminates. But, if the user doesn't logout and closes the tab, then the sessions will not terminate and user can visit the homepage without any login. But, if he tries to visit the site after 20 minutes, he/she needs to login again with the verified credentials. In case the user forgets his/her password, he/she can change the password using the registered email-address without any hassle.

* #### Email verification:
    Every step of knowing our customer has an email verification in it so that nobody else except the user can change or delete information about that account. This way we give  full-proof security to our customer’s details. The email verification link is active only for 2 minutes. So it is requested to verify within 2 minutes.

* #### Profile view and update:
    Once the user has registered, his profile will be saved in our database. The user can update their profile whenever they want. This new profile gets updated and the old one cannot be retrieved. 

* #### Order-History:
    After ordering a product the user can see his product and amount spent along with with GST on Order history page. Also all the previous orders will also be listed there itself.

* #### Cart-History:
    Sometimes a user wants to save the product to view it later. To achieve this we have a Cart History page where the user can see his saved products and can view and buy the product from there also.

* #### Seller account:
    The store also offers the businessmen to collaborate with us and sell their products online. To become a seller, the user needs to fill his credentials on the seller login page and accept the terms and conditions. This way the users can login into their seller account. The seller can add/remove any product(s) offered by them. This way we are able to offer a variety of products and also help the small businesses grow fast.

* #### Logout:
    The customer can logout from the store whenever he/she wants. This allows them to use the website with different accounts on the same device.

* #### Feedback:
    The Monk Store is a continuous improvement platform. We don’t want to leave any stone unturned. Hence we encourage our users to give us the feedback of our work so that we can improve and give our customers a well served platform. All complaints and suggestions are always welcomed.  


* #### Separate product lists:
    All types of products that we have, are grouped to their category products so that the user has a well sorted product view. Also it becomes easy to compare products and buy the best suited one.

* #### About us section:
    The store allows users to know more about the Monk Store through the about us page.

## Technologies/Libraries/Packages used
* #### Front-End: 
    For the front end of our website we have used HTML , CSS to make it attractive and Javascript to make it functioning.


* #### Back-End: 
    For creating the server, we have used Node.js with the express.js module and for the Database, we have used PostgreSQL.


* #### Libraries/Packages:
    connect-flash, cookie-parser, dotenv(For loading environment variables), express, express-session(For using connect-flash module), jsonwebtoken(For creating user sessions), nodemailer(For sending emails to the user), nodemon, pg(To connect the postgreSQL Database with our app).

## Local Setup
To setup the application locally, the user must have:
1. Node.js installed on the local machine
2. A local or remote postgreSQL database

After ensuring that the requirements are fulfilled, the user can clone the app to the local machine from github. After cloning the repository, the user needs to install the required npm packages using the command:

`$ npm install`

After installing the necessary packages the user needs to create a .env file to store all the environment variables needed for the app to work. The contents of the .env file are: 
1. EMAIL = EMAIL_ID_TO_SEND_MAILS
2. PASS = EMAIL_ID_PASSWORD
3. EMAIL_SERVICE = EMAIL_SERVICE_USED (example: outlook)
4. DBUSER = LOCAL_DB_USERNAME
5. DBPASSWORD = LOCAL_DB_PASSWORD
6. DBHOST = localhost
7. DBPORT = LOCAL_DB_PORT
8. NODE_ENV=development(For: local DB)/production(For: remote DB)
9. SITE_URL=LOCAL_HOST_URL (localhost:5000, if you want to change the local port you can change it in the server.js file)
10. NODE_TLS_REJECT_UNAUTHORIZED=0
11. DATABASE_URL=REMOTE_DB_URL (if using remote DB)

After doing this, the user must create 4 tables in the postgreSQL database: 
1. Users
2. Products
3. Orders
4. cart

These tables can be created using the .sql files provided in the ‘tables’ folder. User can Copy the table schema and paste in the DB terminal.
After creating the .env file and the tables, the user can run the app using the script: 

`$ npm start`

Or can use the node command: 

`$ node server.js`

The user can open the app by entering the site url in the browser and use the app.

## Team Members
1. Ansh Rusia (2020IMT-012)
2. Shubhajeet Pradhan (2020IMT-097)
3. Varun Kumar Tiwari (2020IMT-112)
