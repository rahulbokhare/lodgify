const ExpressError = require("../utils/ExpressError")
const wrapAsync = require("../utils/wrapAsync")
const User = require("../models/user");


module.exports.getSignUp = wrapAsync(async(req, res) =>{
    res.render("user/signup.ejs");
})

module.exports.postSingUp = wrapAsync((async(req, res) =>{
    let user = new User(req.body.user);
    let { password } = req.body.user;
    let userr = await User.register(user, password)
    console.log(userr)
    req.flash("success", "user registered successfully")
    res.redirect("/home")
}));

module.exports.getLogin = wrapAsync(async(req, res) => {
    res.render("user/login.ejs")
})

module.exports.postLogin = async(req, res) => {
    console.log("inside post login route")
    req.flash("success", " user logged in successfully")
   return  res.redirect("/home")
}

module.exports.logoutUser = (req, res, next) =>{
     req.logout((err) => {
        console.log(err);
    
    if(err){
       return next(err);
    }})
    console.log("user logged out successsfully");
    req.flash("success","User logged Out successfully");
    res.redirect("/home")
}