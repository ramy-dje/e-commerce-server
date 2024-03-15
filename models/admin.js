const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const adminSchema = new Schema({
    firstName:String,
    lastName:String,
    gender:String,
    dateOfBirth:Date,
    avatar:String,
    email:String,
    phoneNumber:Number,
    password:String,
    age:Number
});
module.exports = mongoose.model("admin", adminSchema);
