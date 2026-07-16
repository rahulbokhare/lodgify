const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");


const listingSchema = new Schema ({
    title : String,
    description : String,
    location : String,
    country : String,
    price : Number,
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    reviews : [
        {
        type : Schema.Types.ObjectId,
        ref : "Review"
    }
    ]
})

listingSchema.post("findOneAndDelete", async(listing) => {
    if(listing && listing.reviews.length > 0){
        await Review.deleteMany({
            _id : { $in : listing.reviews}
        })
    }
})

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;
 
