if (process.env.NODE_ENV != "production") {
    require('dotenv').config(); 
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
// Use environment variable for Mongo URL 
const dbUrl = process.env.ATLASDB_URL; // Kept your exact variable name
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");

// IMPORTS FOR AUTHENTICATION/SESSION/FLASH
const session = require("express-session"); 

// --- FIX START: robust import for connect-mongo ---
// This handles the import safely regardless of Node version
const MongoStoreRaw = require("connect-mongo");
const MongoStore = MongoStoreRaw.default || MongoStoreRaw;
// --- FIX END ---

const flash = require("connect-flash"); 
const passport = require("passport");
const LocalStrategy = require("passport-local"); 
const User = require("./models/user.js"); 

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

// Configure MongoStore
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error", (err) => {
    console.log("ERROR IN MONGO SESSION STORE", err);
});

// Configure Session
const sessionOptions = {
    store,
    secret: process.env.SECRET,
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

// Passport Initialization
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Locals Middleware
app.use((req, res, next) => {
    res.locals.currUser = req.user; 
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.get("/", (req, res) => {
    res.send("HI, I am root");
});

// Use Routers
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