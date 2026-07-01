const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing")
const ejs = require("ejs");
const path = require("path");

app.set("view engine", "ejs")
app.set("views",path.join(__dirname,"views"))


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

//index route
app.get("/home", async(req ,res) => {
    let listings = await Listing.find();
    res.render("index.ejs", { listings })
})


//show route

app.get("/home/:id", async(req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    console.log(listing)
    res.render("show.ejs", { listing })
})


