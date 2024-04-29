const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const sellerSchema = new Schema({
    firstName:String,
    lastName:String,
    gender:String,
    dateOfBirth:Date,
    avatar:String,
    email:String,
    phoneNumber:Number,
    password:String,
    commerceRegistrNumber:Number,
    age:Number,
    isProffestionalAccount:{
        type : Boolean,
        default : false
    },
    isAccepted:{
        type : Boolean,
        default : false
    }
});
module.exports = mongoose.model("seller", sellerSchema);
