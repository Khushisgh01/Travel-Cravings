const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const ExpressError = require("./ExpressError.js");
// Assuming schema.js exists and exports listingSchema and reviewSchema
const { listingSchema, reviewSchema } = require("../schema.js"); 

// --- Joi Validation Middlewares ---

module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(", ");
        throw new ExpressError(400, errMsg);
    }
    next();
};

module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(", ");
        throw new ExpressError(400, errMsg);
    }
    next();
};

// --- Authentication Middleware ---

// Checks if a user is logged in
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        // Save redirect URL to session before redirecting to login
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to proceed!");
        return res.redirect("/login");
    }
    next();
};

// Saves the user's intended URL for redirection after successful login
module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

// --- Authorization Middlewares ---

// Check if the logged-in user is the owner of the listing
module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    
    if (!listing) {
        req.flash("error", "Listing not found.");
        return res.redirect("/listings");
    }
    
    // Check if the current user ID is NOT equal to the listing owner ID
    if (!listing.owner.equals(res.locals.currUser._id)) {
        req.flash("error", "You do not have permission to modify this listing.");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

// Check if the logged-in user is the author of the review
module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    
    if (!review) {
        req.flash("error", "Review not found.");
        return res.redirect(`/listings/${id}`);
    }
    
    if (!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You do not have permission to delete this review.");
        return res.redirect(`/listings/${id}`);
    }
    next();
};