const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const deliverSchema = new Schema({
    name:String,
    areasToDeliver:[String],
    pricePerKM:Number,
    logo:String,
    estimatedTimeToDeliver:Date,
});
module.exports = mongoose.model("deliver", deliverSchema);
