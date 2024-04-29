const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reviewsSchema = new Schema({
    store:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "store",
    },
    product:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "product",
    },
    client : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "client",
    },
    reviewText : String,
    reviewLikes : {
        type : Boolean,
        default : false
    },
    raiting : Number
});
module.exports = mongoose.model("reviews", reviewsSchema);
