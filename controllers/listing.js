
const Listing = require("../models/listing")
const ExpressError = require("../utils/ExpressError")
const wrapAsync = require("../utils/wrapAsync")

module.exports.index = wrapAsync(async(req, res) => {
    let listings = await Listing.find();
    res.render("index.ejs", { listings });
})

module.exports.newGet = (req, res) => {
    res.render("new.ejs")
}

module.exports.newPost = wrapAsync(async(req, res) => {
    let {id} = req,params;
    let listing = await Listing.findById(id);
    let newListing = new Listing(req.body.listing);
    await newListing.save();
    console.log(newListing)
    res.redirect("/home");
})

module.exports.show = wrapAsync(async(req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("show.ejs",{ listing })
})

module.exports.editGet = wrapAsync(
    async(req, res) => {
    let { id } = req.params;
    listing = await Listing.findById(id);
    res.render("edit.ejs", { listing });
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