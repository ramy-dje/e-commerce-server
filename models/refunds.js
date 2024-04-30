const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const refundsSchema = new Schema({
    seller:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "seller",
    },
    client : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "user",
    },
    product:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "product",
    },
    date : Date,
    reason : String ,
    refundPrice : Number,
    isAccepted :Boolean
});
module.exports = mongoose.model("refunds", refundsSchema);
