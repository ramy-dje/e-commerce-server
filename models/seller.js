const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const sellerSchema = new Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },
    isAccepted:{
        type : Boolean,
        default : false
    },
    registerCommerce:String,
    store:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'store'
    }
});
module.exports = mongoose.model("seller", sellerSchema);
