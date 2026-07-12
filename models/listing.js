const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const listingSchema = new Schema ({
    title : String,
    description : String,
    location : String,
    country : String,
    price : Number,
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }
})

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;
 
