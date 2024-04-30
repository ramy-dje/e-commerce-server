const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const buySchema = new Schema({
    client : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "client",
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
    shippingSupplier: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "deliver",
    },
    paymentMode : String,
    price : Number,
    date : Date,
});
module.exports = mongoose.model("buy", buySchema);
