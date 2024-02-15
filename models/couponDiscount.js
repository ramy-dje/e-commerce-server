const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const couponDiscountSchema = new Schema({
    store:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "store",
    },
    product:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "product",
    },
    percentage : Number,
    code : String,
    isRuning : Boolean
});
module.exports = mongoose.model("couponDiscount", couponDiscountSchema);
