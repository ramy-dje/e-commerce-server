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
    shippingSupplier: String,
    paymentMode : String,
    price : Number,
    estimatedDelivryTime : Date,
    date : Date,
});
module.exports = mongoose.model("buy", buySchema);
