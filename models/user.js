const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema= new Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    profilePic : {
        url : {
            type : String,
            default : "https://res.cloudinary.com/dnmly4mkv/image/upload/v1786737073/lodgify_DEV/myed1ofiyszuzwudi9vo.jpg"
        },
        filename : {
            type : String,
            default : "defaultUser"
        }
    },
})
userSchema.plugin(passportLocalMongoose)

const User = mongoose.model("User", userSchema)

module.exports = User;