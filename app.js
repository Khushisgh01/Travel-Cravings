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
const {listingSchema}=require("./schema.js");

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

const validateListing=(req,res,next)=>{
    //this below line checks kya req ki body inn saari cindition ko satisfy krti hai hai ki nhi
    let {error}=listingSchema.validate(req.body);
    //If result ke andr error exist krta hai toh hum error throw krdenge
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

//Index route
app.get("/listings", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}));

//New Route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});

//Show route
app.get("/listings/:id", wrapAsync(async (req, res) => {
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
}));

//Create route
//whenever we do changes in database tabhi hum async and await use krte hai
app.post("/listings", validateListing,wrapAsync(async (req, res, next) => {
    // if(!req.body.listing){
    //     throw new ExpressError(400,"Send Valid data for listing")
    // }
    
    //hum data nikal rhe hai form me jo fill kiya tha and then we will use that data to basically form a listing on the listings page
    let listing=req.body.listing;
    const newListing=new Listing(listing);
    // if(!newListing.title){
    //     throw new ExpressError(400,"title is missing")
    // }
    // if(!newListing.description){
    //     throw new ExpressError(400,"Description is missing")
    // }
    // if(!newListing.location){
    //     throw new ExpressError(400,"Location is missing")
    // }


    //The work of Joi is to validate Schema-Schema for Server side validations
    await newListing.save();
    res.redirect("/listings");
}));

//Edit Route
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
    const {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
}));

//Update Route
app.put("/listings/:id",validateListing, wrapAsync(async (req, res) => {
    if(!req.body.listing){
        throw new ExpressError(400,"Send Valid data for listing")
    }
    const {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
}));

//Delete route
app.delete("/listings/:id", wrapAsync(async (req, res) => {
    const {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
}));

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
