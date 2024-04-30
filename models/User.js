const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstName:String,
    lastName:String,
    gender:String,
    dateOfBirth:Date,
    image:String,
    email:String,
    phoneNumber:Number,
    password:String,
    likedProducts:[{
        type:[mongoose.Types.ObjectId],
        ref:'product'
    }],
    wishList:[{
        type:mongoose.Types.ObjectId,
        ref:'product'
    }],
    role:{
        type:String,
        default:'client'
    }
});
module.exports = mongoose.model("user", userSchema);
