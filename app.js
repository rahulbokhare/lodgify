const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing")
const ejs = require("ejs");
const path = require("path");
const methodOverride = require("method-override");

app.set("view engine", "ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({ extended : true }))
app.use(methodOverride("_method"))


async function main(){
    try{
    await mongoose.connect('mongodb://127.0.0.1:27017/lodgifyDB');
    console.log("connected to database")
    app.listen(8080, () => {
         console.log("server is listening through port 8080");
})}catch (err){
    console.error(err);
}};
main();


//Index route
app.get("/home", async(req, res) => {
    let listings = await Listing.find();
    res.render("index.ejs", { listings });
});
//New Route
app.get("/home/new", (req, res) => {
    res.render("new.ejs")
})
app.post("/home/new", async(req, res) => {
    let newListing = new Listing(req.body.listing);
    await newListing.save();
    console.log(newListing)
    res.redirect;
});
//show route
app.get("/home/:id", async(req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("show.ejs",{ listing })
})

//edit route
app.get("/home/:id/edit", async(req, res) => {
    let { id } = req.params;
    listing = await Listing.findById(id);
    res.render("edit.ejs", { listing });
})
app.put("/home/:id", async(req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, req.body.listing);
    console.log(listing);
    res.redirect(`/home/${id}`)
})
//delete route
app.delete("/home/:id", async(req, res) => {
    try{
        let { id } = req.params;
        await Listing.findByIdAndDelete(id);
        res.redirect("/home");
    }catch (e) {
        console.log(e)
    }
})