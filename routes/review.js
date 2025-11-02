const express=require ("express");
const router=express.Router({ mergeParams: true }); // FIX: Added { mergeParams: true }
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {reviewSchema}=require("../schema.js");
const Review= require('../models/review.js');
const Listing = require('../models/listing.js'); // FIX: Added missing Listing import


const validateReview=(req,res,next)=>{
    //this below line checks kya req ki body inn saari cindition ko satisfy krti hai hai ki nhi
    let {error}=reviewSchema.validate(req.body);
    //If result ke andr error exist krta hai toh hum error throw krdenge
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};
//Reviews
//Post Review route
router.post("/",validateReview,wrapAsync(async(req,res)=>{
    // req.params.id is now accessible and contains the listing ID
    let listing=await Listing.findById(req.params.id);
    let newReview=new Review(req.body.review);

    //now pushing this new review to reviews array created on the listing schema
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    res.redirect(`/listings/${listing._id}`)
}));

//Delete Review Route - CORRECTED
router.delete("/:reviewId",wrapAsync(async(req,res)=>{
    let {id,reviewId}=req.params;
    // CORRECTED: Use findByIdAndUpdate with $pull to remove the reviewId from the listing's reviews array
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    // Now delete the actual Review document
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`)
}));

module.exports=router;