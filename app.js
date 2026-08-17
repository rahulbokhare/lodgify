if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}
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
const multer  = require('multer');
const crypto = require("crypto");

const Demo = require('./models/demo');
const {storage} = require("./utils/cloudConfig");
const upload = multer({ storage });


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
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});




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




app.get("/upload" ,async(req, res) => {
    let demoImage = await Demo.findOne();
    res.render("upload.ejs", { demoImage });
})

app.post("/upload", upload.single("demo[image]"), async(req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    let newDemo = new Demo(req.body.demo);
    newDemo.image = { url , filename};
    await newDemo.save();
    console.log(newDemo);;
    res.redirect("/upload")
})


app.use("/home", listingRoute);
app.use("/" , userRoute);
app.use("/", reviewRoute);


app.use(middleware.errorHandlar);
