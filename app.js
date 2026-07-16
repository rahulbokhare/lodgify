const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing")
const User = require("./models/user")
const ejs = require("ejs");
const path = require("path");
const methodOverride = require("method-override");
const listingRoute = require("./routes/listing")
const userRoute = require("./routes/user");
const reviewRoute = require("./routes/review");
const ExpressError = require("./utils/ExpressError");
const joi = require("joi");
const wrapAsync = require("./utils/wrapAsync");
const ejsMate = require("ejs-mate");
const passport = require('passport');
const passportLocal = require("passport-local");
const session = require("express-session");
const flash = require("connect-flash");
const middleware = require("./middleware");

app.engine("ejs", ejsMate)
app.set("view engine", "ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname,"public")))
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

const sessionOptions = {
    secret : "mysupersecretkey",
    resave : false,
    saveUninitialized : false,
    cookie : {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
}
app.use(session(sessionOptions));
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error")
    res.locals.currUser = req.user;
    let currUser = req.user;
    if(currUser){
        let { username } = req.user;
    res.locals.name = username;
    }
    next()
})

app.use("/home", listingRoute);
app.use("/" , userRoute);
app.use("/", reviewRoute);


app.use(middleware.errorHandlar);
