
const Listing = require("../models/listing")


module.exports.index = async(req, res) => {
    let listings = await Listing.find();
    res.render("index.ejs", { listings });
}

module.exports.newGet = (req, res) => {
    res.render("new.ejs")
}

module.exports.newPost = async(req, res) => {
    let newListing = new Listing(req.body.listing);
    await newListing.save();
    console.log(newListing)
    res.redirect("/home");
}

module.exports.show = async(req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("show.ejs",{ listing })
}

module.exports.editGet = async(req, res) => {
    let { id } = req.params;
    listing = await Listing.findById(id);
    res.render("edit.ejs", { listing });
}

module.exports.editPut = async(req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, req.body.listing);
    console.log(listing);
    res.redirect(`/home/${id}`)
}

module.exports.deleteRoute = async(req, res) => {
    try{
        let { id } = req.params;
        await Listing.findByIdAndDelete(id);
        res.redirect("/home");
    }catch (e) {
        console.log(e)
    }
}