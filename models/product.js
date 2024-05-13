const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema({
    name : String,
    creatorId : {
        type:[mongoose.Types.ObjectId],
        ref:'user'
    },
    category : String,
    price : Number,
    colors : [String],
    brand : String,
    images  : [Object],
    reviews : [Object],
    description :String,
    sizes : [String],
    quantity: Number
});
module.exports = mongoose.model("product", productSchema);
