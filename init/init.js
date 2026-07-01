const mongoose = require("mongoose");
const { data } = require("./data");
const Listing = require("../models/listing")

async function connectDB (){
   try{
     await mongoose.connect('mongodb://127.0.0.1:27017/lodgifyDB')
     console.log("connected to database")
     initDB();
   }catch (e){
    console.log(e)
   }
};

const initDB = async() => {
    await Listing.deleteMany();
    await Listing.insertMany( data );
    console.log("database was initialized");
}

connectDB();



