const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productDataSchema = new Schema({
    seller:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "seller",
    },
    acceptedProducts : [
        {
            product:{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "product",
        },
    }
    ],
    rejectedProducts: [
        {
            product:{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "product",
        },
        reasonToReject : String
    }
    ],
});
module.exports = mongoose.model("productData", productDataSchema);
