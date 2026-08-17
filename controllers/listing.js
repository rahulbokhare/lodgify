
const Listing = require("../models/listing")
const ExpressError = require("../utils/ExpressError")
const wrapAsync = require("../utils/wrapAsync");


module.exports.index = wrapAsync(async(req, res) => {
    let listings = await Listing.find().populate("owner");
    res.render("listings/index.ejs", { listings });
})

//New Listing
module.exports.newGet = (req, res) => {
    res.render("listings/new.ejs")
}
module.exports.newPost =  wrapAsync(async(req, res) => {
    
    let newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    if(req.file){
        newListing.image = {
            url : req.file.path,
            filename : req.file.filename
        }
    }
    await newListing.save();
    console.log(req.file)
    res.redirect("/home");
})

module.exports.show = wrapAsync(async(req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate({path : "reviews",populate : { path : "author"}}).populate("owner")
    if(!listing){
        throw new ExpressError( 404 , "Listing not found");
    }else{
         res.render("listings/show.ejs",{ listing })
    }
})

module.exports.editGet = wrapAsync(async(req, res) => {
    let { id } = req.params;
    listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
}
)

module.exports.editPut = wrapAsync(async(req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, req.body.listing);
    if(req.file){
        listing.image = {
            url : req.file.path,
            filename : req.file.filename
        }
        await listing.save();
    }
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