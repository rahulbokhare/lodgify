module.exports.validateListing = (req, res, next)=>{
    let { error } = rulesForListing.validate(req.body);
    if(error){
        throw new ExpressError(404, error.message)
    }else{
        next();
    }
};

module.exports.errorHandlar = (err, req, res, next)=>{
    let { statusCode = 500 , message = "some error happened"} = err;
    console.log(err)
    return res.render("error.ejs", { err })
}


module.exports.isLoggedIn = (req, res, next ) => {
    let currUser = req.user;
    if(!currUser){
        req.flash("error", "Please signup or login before starting")
        return res.redirect("/login")
    }
    next()
}