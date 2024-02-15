const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const storeSchema = new Schema({
    seller:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "seller",
    },
    products:[{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "product",
    }],
    visitors : [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "client",
    }],
    folows : [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "client",
    }],
    name : String,
    logo : String,
    allowedPaymentTypes : [String]
});
module.exports = mongoose.model("store", storeSchema);
