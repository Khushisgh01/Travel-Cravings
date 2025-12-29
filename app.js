if (process.env.NODE_ENV != "production") {
    require('dotenv').config(); 
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
// Use environment variable for Mongo URL 
// const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/travelCravings";
const dbUrl= process.env.ATLASDB_URL;
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");

// IMPORTS FOR AUTHENTICATION/SESSION/FLASH (Ensure these are installed)

const session = require("express-session"); 
const MongoStore= require('connect-mongo');
const flash = require("connect-flash"); 
const passport = require("passport");
const LocalStrategy = require("passport-local"); 
const User = require("./models/user.js"); // Assuming User model path

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const users = require("./routes/user.js"); 

main().then(() => {
    console.log("connected to DB");
}).catch(err => {
    console.log(err);
});

async function main() {
    await mongoose.connect(dbUrl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// Configure Session
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: { 
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
};

app.use(session(sessionOptions)); 
app.use(flash()); 

// Passport Initialization (MUST come after session middleware)
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// FIX: Flash & Locals Middleware (MUST come BEFORE any route rendering EJS)
app.use((req, res, next) => {
    // This line makes req.user (if logged in) available as currUser in all EJS templates.
    res.locals.currUser = req.user; 
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.get("/", (req, res) => {
    res.send("HI, I am root");
});

// Use Routers (MUST come AFTER locals middleware)
app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);
app.use("/", users); 

// Page not found middleware
app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
})

// Error handling middleware
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong! Check the server logs." } = err;
    res.status(statusCode);
    res.render("error.ejs", { 
        statusCode, 
        message, 
        stack: err.stack 
    });
});

app.listen(8080, () => {
    console.log("server is listening to port 8080 ");
});