const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const clientSchema = new Schema({
    firstName:String,
    lastName:String,
    gender:String,
    dateOfBirth:Date,
    avatar:String,
    email:String,
    phoneNumber:Number,
    password:String,
    star : Number
});
module.exports = mongoose.model("client", clientSchema);
