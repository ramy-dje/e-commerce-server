const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const buySchema = new Schema({
    client : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "user",
    },
    order : [
        {
            store:{
                type: mongoose.SchemaTypes.ObjectId,
                ref: "store",
            },
            product:{
                type: mongoose.SchemaTypes.ObjectId,
                ref: "product",
            },
            quantity : Number, 
        },
    ],
    paymentMode : String,
    price : Number,
},{timestamps:true});
module.exports = mongoose.model("buy", buySchema);
