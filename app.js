const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing")
const ejs = require("ejs");
const path = require("path");
const methodOverride = require("method-override");
const listingRoute = require("./routes/listing")
const ExpressError = require("./utils/ExpressError")

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
app.all("/*splat", (req, res, next) => {
    next(new ExpressError(404, "Page not found"));
});

app.use((err, req, res, next)=>{
    let { statusCode = 500 , message = "some error happened"} = err;
    return res.render("error.ejs", { err })

})


