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
    folowers : [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "user",
    }],
    likes:[{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "user",
    }],
    name : String,
    logo : Object,
    backgroundImage:Object,
    allowedPaymentTypes : [String]
});
module.exports = mongoose.model("store", storeSchema);
