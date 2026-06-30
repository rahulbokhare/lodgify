const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const listingSchema = new Schema ({
    title:{
        type: String
    },
    description:{
        type: String
    },
    loaction:{
        type: String
    },
    country:{
        type: String
    },
    price:{
        type: Number
    },
})

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;


const newListing = new Listing({
    title : "naman",
})

newListing.save();