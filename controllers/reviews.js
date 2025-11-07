const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    if (!listing) {
        req.flash("error", "Listing not found to add review.");
        return res.redirect(`/listings/${req.params.id}`);
    }

    let newReview = new Review(req.body.review);
    newReview.author = req.user._id; // Set the review author

    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    req.flash("success", "New Review Created! ✨");
    res.redirect(`/listings/${listing._id}`)
};

module.exports.destroyReview=async(req, res)=> {
    let { id, reviewId } = req.params;
    // Corrected: Use $pull to remove the reviewId from the listing's reviews array
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    // Now delete the actual Review document
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`)
};