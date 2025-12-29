const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });
const { cloudinary } = require("../cloudinary");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate({
        path: "reviews",
        populate: { path: "author" }
    }).populate("owner");

    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
    // 1. Calculate Geometry using Mapbox
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
    }).send();

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.geometry = response.body.features[0].geometry;

    if (req.file) {
        newListing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }

    let savedListing = await newListing.save();
    console.log(savedListing);
    req.flash("success", "New Listing Created! 🎉");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url.replace("/upload", "/upload/w_250,h_250,c_fill");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    
    // 1. Recalculate Geometry when updating (Fixes the wrong map location)
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
    }).send();
    
    // 2. Prepare update data with new geometry
    let updatedData = { 
        ...req.body.listing, 
        geometry: response.body.features[0].geometry 
    };

    let listing = await Listing.findByIdAndUpdate(id, updatedData);

    if (req.file) {
        if (listing.image.filename && listing.image.filename !== "default-listing-image") {
            await cloudinary.uploader.destroy(listing.image.filename);
        }
        const newImage = {
            url: req.file.path,
            filename: req.file.filename
        };
        await Listing.findByIdAndUpdate(id, { image: newImage });
    }

    req.flash("success", "Listing Updated Successfully! ✅");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    const { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);

    if (deletedListing && deletedListing.image.filename && deletedListing.image.filename !== "default-listing-image") {
        await cloudinary.uploader.destroy(deletedListing.image.filename);
    }

    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};