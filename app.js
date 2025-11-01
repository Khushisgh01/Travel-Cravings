const express=require("express");
const app=express();
const mongoose=require ("mongoose");
const Listing = require('./models/listing.js');
const path=require("path");
const MONGO_URL="mongodb://127.0.0.1:27017/travelCravings";
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
const {listingSchema,reviewSchema}=require("./schema.js");
const Review= require('./models/review.js');

const listings=require("./routes/listing.js");
const reviews=require("./routes/review.js");
main().then(()=>{
    console.log("connected to DB")
}).catch(err=>{
    console.log(err);
})
//for database
async function main(){
    await mongoose.connect(MONGO_URL);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


app.get("/",(req,res)=>{
    res.send("HI, I am root");
});


app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);

//Page not found
//agr upar kisike sath match uhua to execute hoga else ye execute hoga
app.use((req, res, next) => {
    next(new ExpressError(404,"Page Not Found!"));
})

//Error handling middleware (FIXED)
app.use((err, req, res, next) => {
    // Extract error details, using defaults for safety
    let { statusCode = 500, message = "Something went wrong! Check the server logs." } = err;
    
    // Set response status code
    res.status(statusCode);

    // Render the error template, passing the variables it expects
    res.render("error.ejs", { 
        statusCode, 
        message, 
        stack: err.stack 
    });
});

app.listen(8080,()=>{
    console.log("server is listening to port 8080 ");
});