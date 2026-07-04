const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing")
const ejs = require("ejs");
const path = require("path");
const methodOverride = require("method-override");
const listingRoute = require("./routes/listing")

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


app.use("/home", listingRoute);