const Review = require("../models/review");
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");

module.exports.postReview = wrapAsync(async(req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    let newReview =  new Review(req.body.review);
    console.log(req.body.review)
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    console.log(newReview);
    console.log(listing);
    await newReview.save();
    await listing.save();
   
    req.flash("success","review added successfully");
    res.redirect(`/home/${id}`);
});

