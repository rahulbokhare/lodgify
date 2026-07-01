const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const listingSchema = new Schema ({
    title : String,
    description : String,
    location : String,
    country : String,
    price : Number,
})

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;
 
