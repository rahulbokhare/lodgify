const mongoose = require("mongoose");


const demoSchema = new mongoose.Schema({
    image : {
        url : String,
        filename : String
    },
    name : String
})

const Demo = mongoose.model("Demo", demoSchema);

module.exports = Demo;