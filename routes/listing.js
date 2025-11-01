const express=require ("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const Listing = require('../models/listing.js');

const {listingSchema,reviewSchema}=require("../schema.js");

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
router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}));

//New Route
router.get("/new",(req,res)=>{
    res.render("listings/new.ejs");
});

//Show route
router.get("/:id", wrapAsync(async (req, res) => {
    let {id}=req.params;
    const listing=await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs",{listing});
}));

//Create route
//whenever we do changes in database tabhi hum async and await use krte hai
router.post("/", validateListing,wrapAsync(async (req, res, next) => {
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
router.get("/:id/edit", wrapAsync(async (req, res) => {
    const {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
}));

//Update Route
router.put("/:id",validateListing, wrapAsync(async (req, res) => {
    if(!req.body.listing){
        throw new ExpressError(400,"Send Valid data for listing")
    }
    const {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
}));

//Delete route - CORRECTED
router.delete("/:id", wrapAsync(async (req, res) => {
    const {id}=req.params;
    // Find and delete the document. It returns the deleted document.
    let deletedListing=await Listing.findByIdAndDelete(id);

    // START FIX: Check if the listing has an associated image and if it's NOT the default image.
    if (deletedListing && deletedListing.image && deletedListing.image.filename && deletedListing.image.filename !== "default-listing-image") {
        // This is where you would call your cloud storage API (e.g., Cloudinary) 
        // to actually delete the file using the stored 'filename'.
        // Example (requires Cloudinary setup):
        // await cloudinary.uploader.destroy(deletedListing.image.filename); 
        console.log(`Image with filename ${deletedListing.image.filename} successfully removed from DB entry. Add cloud storage deletion logic here.`);
    }
    // END FIX

    console.log(deletedListing);
    res.redirect("/listings");
}));

module.exports=router;