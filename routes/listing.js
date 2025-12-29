const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require('../models/listing.js');
const listingController=require("../controllers/listings.js");
// Import all required middleware from the utility file
const { isLoggedIn, isOwner, validateListing } = require("../utils/middleware.js"); 

// Image Upload Setup: Import Multer and Cloudinary Config
const multer = require('multer');
const { storage, cloudinary } = require('../cloudinary'); 
const upload = multer({ storage }); 

// -----------------------------------------------------------
// Index and Create Route (Consolidated using router.route())
// -----------------------------------------------------------
router.route("/")
    // Index Route: /listings
    .get(wrapAsync(listingController.index))
    // Create Route: POST /listings 
    .post(
        isLoggedIn, 
        upload.single('listing[image]'), 
        validateListing,                 
        wrapAsync(listingController.createListing)
    );

// New Route 
router.get("/new", isLoggedIn, listingController.renderNewForm);

// -----------------------------------------------------------
// Show, Update, Delete Routes (Consolidated using router.route())
// -----------------------------------------------------------
router.route("/:id")
    // Show Route: /listings/:id
    .get(wrapAsync(listingController.showListing))
    // Update Route: PUT /listings/:id
    .put(
        isLoggedIn, 
        isOwner,                         
        upload.single('listing[image]'), 
        validateListing,                 
        wrapAsync(listingController.updateListing)
    )
    // Delete Route: DELETE /listings/:id
    .delete(
        isLoggedIn, 
        isOwner,                         
        wrapAsync(listingController.destroyListing)
    );


// Edit Route - must include authorization and optional image resizing preview
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));


module.exports = router;