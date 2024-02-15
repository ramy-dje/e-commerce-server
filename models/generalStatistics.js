const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const generalStatisticsSchema = new Schema({
    mostSelledItems : [
        {
            product:{
                type: mongoose.SchemaTypes.ObjectId,
                ref: "product",
            },
            numberOfSelling : Number
        }
    ],
    mostSeccessfulSellers : [
        {
            seller:{
                type: mongoose.SchemaTypes.ObjectId,
                ref: "seller",
            },
        }
    ],
    mostViewedProducts : [
        {
            product:{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "product",
        },
    }
    ],
    productsAddedToCart : [
        {
            product:{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "product",
        },
    }
    ],
    productsRemovedFromCart : [
        {
            product:{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "product",
        },
    }
    ],
});
module.exports = mongoose.model("generalStatistics", generalStatisticsSchema);
