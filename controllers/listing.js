
const Listing = require("../models/listing")
const ExpressError = require("../utils/ExpressError")
const wrapAsync = require("../utils/wrapAsync");


module.exports.index = wrapAsync(async(req, res) => {
    let listings = await Listing.find();
    res.render("listings/index.ejs", { listings });
})

module.exports.newGet = (req, res) => {
    res.render("listings/new.ejs")
}

module.exports.newPost = wrapAsync(async(req, res) => {
    let newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    res.redirect("/home");
})

module.exports.show = wrapAsync(async(req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate("owner");
    res.render("listings/show.ejs",{ listing })
})

module.exports.editGet = wrapAsync(
    async(req, res) => {
    let { id } = req.params;
    listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
}
)

module.exports.editPut = wrapAsync(async(req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, req.body.listing);
    console.log(listing);
    res.redirect(`/home/${id}`)
})

module.exports.deleteRoute = wrapAsync(
    async(req, res) => {
    try{
        let { id } = req.params;
        await Listing.findByIdAndDelete(id);
        res.redirect("/home");
    }catch (e) {
        console.log(e)
    }
}
)