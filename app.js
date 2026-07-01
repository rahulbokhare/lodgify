const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing")
const {data } = require("./data")

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


app.get("/home", (req ,res) => {
    res.send("hey I'm Home")
})



let firstListing = new Listing({data})


const saveListing = () => {
    firstListing.save();
    console.log(Listing.collection.name);
}


saveListing();
