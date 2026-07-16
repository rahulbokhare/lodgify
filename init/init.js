const mongoose = require("mongoose");
const { data } = require("./data");
const Listing = require("../models/listing");
const User = require("../models/user");

const initDB = async() => {
    await Listing.deleteMany();
    const user = await User.find();
    for(let listing of data){
      const randomUser = user[Math.floor(Math.random()* user.length)];
      listing.owner = randomUser._id;
      console.log(listing)
    }
    await Listing.insertMany(data);
    console.log("database was initialized");
}

async function connectDB (){
   try{
     await mongoose.connect('mongodb://127.0.0.1:27017/lodgifyDB')
     console.log("connected to database")
     initDB();
   }catch (e){
    console.log(e)
   }
};



connectDB();



