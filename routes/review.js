const express = require ("express");
// FIX: Added { mergeParams: true } 
const router = express.Router({ mergeParams: true }); 
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require('../models/review.js');
const Listing = require('../models/listing.js'); 
const { validateReview, isLoggedIn, isReviewAuthor } = require("../utils/middleware.js"); 
const reviewController=require("../controllers/reviews.js");

// Reviews Post Route (Refactored with router.route)
router.route("/")
    .post(
        isLoggedIn, 
        validateReview, 
        wrapAsync(reviewController.createReview)
    );


// Delete Review Route 
router.delete("/:reviewId",
    isLoggedIn, 
    isReviewAuthor, // Authorization middleware
    wrapAsync(reviewController.destroyReview)
);

module.exports = router;