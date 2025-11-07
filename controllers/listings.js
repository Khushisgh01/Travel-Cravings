const Listing = require("../models/listing");

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

module.exports.createListing = async (req, res) => {
    // If Multer middleware fails, it will skip to error handler, so req.file should be present on success.
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;

    // Assign image data from Cloudinary response
    if (req.file) {
        newListing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }

    await newListing.save();
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
    // Create optimized URL for display in edit form
    let originalImageUrl = listing.image.url.replace("/upload", "/upload/w_250,h_250,c_fill");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    // Handle new image upload
    if (req.file) {
        // Delete old image from Cloudinary
        if (listing.image.filename && listing.image.filename !== "default-listing-image") {
            await cloudinary.uploader.destroy(listing.image.filename);
        }

        // Set new image URL and filename
        const newImage = {
            url: req.file.path,
            filename: req.file.filename
        };

        // Update only the image field in the database
        await Listing.findByIdAndUpdate(id, { image: newImage });
    }

    req.flash("success", "Listing Updated Successfully! ✅");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    const { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);

    // Delete image from Cloudinary
    if (deletedListing && deletedListing.image.filename && deletedListing.image.filename !== "default-listing-image") {
        await cloudinary.uploader.destroy(deletedListing.image.filename);
    }

    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};