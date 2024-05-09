const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema({
    name : String,
    creatorName : String,
    weight : String,
    category : String,
    dimensions : String,
    price : Number,
    colors : [String],
    brand : String,
    images  : [String],
    reviews : [Object],
    tagsOrKeywords : [String],
    description :String
});
module.exports = mongoose.model("product", productSchema);
