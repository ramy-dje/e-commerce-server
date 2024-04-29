const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const deliverySchema = new Schema({
    client:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "client",
    },
    deliver:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "deliver",
    },
    product : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "product",
    },
    store:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "store",
    },
    date :{
        type : Date,
        default : Date.now()
    },
    payedPrice : Number ,
    timeOfDelivery : Date ,
    productTracking : String
});
module.exports = mongoose.model("delivery", deliverySchema);
