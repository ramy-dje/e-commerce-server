const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const spamSchema = new Schema({
    clientId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "client",
    },
    sellerId : {
        type: mongoose.SchemaTypes.ObjectId,
    },
    productId : {
        type: mongoose.SchemaTypes.ObjectId,
    },
    reason : String,
    date : Date,
    isAccepted : Boolean
});
module.exports = mongoose.model("spam", spamSchema);
