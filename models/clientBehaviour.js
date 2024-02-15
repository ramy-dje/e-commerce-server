const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const clientBehaviourSchema = new Schema({
    client:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "client",
    },
    timeSpendInApp:Date,  
    timeSpendInEachCategory :Date,
    threeMostLikedStores : [
        {
            store : {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "store",
            }
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
module.exports = mongoose.model("clientBehaviour", clientBehaviourSchema);
