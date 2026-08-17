const mongoose = require("mongoose");
const { sampleListings } = require("./data");
const Listing = require("../models/listing");
const User = require("../models/user");
const Review = require("../models/review");
const sampleListing = require("./sampleUsers");

const initDB = async() => {
    const users = await User.find();

    for(let listing of sampleListings){
        const newListing = new Listing({
            title : listing.title,
            description : listing.description,
            location : listing.location,
            country : listing.country,
            price : listing.price
        });

        let randomIdx = Math.floor(Math.random()  * users.length);
        newListing.owner =  users[randomIdx]._id;
        await newListing.save()
        console.log("added sample listings")
    }
}

async function connectDB (){
   try{
     await mongoose.connect('mongodb://127.0.0.1:27017/lodgifyDB')
     console.log("connected to database")
     await initDB();
   }catch (e){
    console.log(e)
   }
};

connectDB();



