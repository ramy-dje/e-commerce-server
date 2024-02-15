const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema({
    name : String,
    creatorName : String,
    weight : String,
    category : String,
    dimenstions : String
});
module.exports = mongoose.model("product", productSchema);
