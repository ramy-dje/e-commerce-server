const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ratingSchema = new Schema({
    client:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "client",
    },
    seller: {
        type: mongoose.SchemaTypes.ObjectId,
        ref : 'seller',
    },
    product : {
        type: mongoose.SchemaTypes.ObjectId,
        ref : 'product',
    },
    rating: Number,
    date : Date,
});
module.exports = mongoose.model("rating", ratingSchema);
