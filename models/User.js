const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstName:String,
    lastName:String,
    gender:String,
    dateOfBirth:Date,
    image:Object,
    email:String,
    phoneNumber:Number,
    password:String,
    likedProducts:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'product'
    }],
    wishList:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'product'
    }],
    role:{
        type:String,
        default:'client'
    }
});
module.exports = mongoose.model("user", userSchema);
