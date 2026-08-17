const {rulesForListing} = require("./schema");
const Listing = require("./models/listing");
const ExpressError = require("./utils/ExpressError")


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
    if(!req.isAuthenticated()){
        req.flash("error", "Please signup or login before starting")
        return res.redirect("/login")
    }
    next()
}

module.exports.isOwner = async(req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id)
    if(!listing.owner.equals(req.user._id)){
        req.flash("error", " you're not owner of this listing")
        return res.redirect(`/home/${id}`);
    }
    next();
}