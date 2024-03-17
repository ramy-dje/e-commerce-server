const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timedDiscountSchema = new Schema({
    store:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "store",
    },
    product:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "product",
    },
    percentage : Number,
    timeToEndDiscount : Date,
    isRuning : {
        type :Boolean,
        default : true
    }
});
module.exports = mongoose.model("timedDiscount", timedDiscountSchema);
