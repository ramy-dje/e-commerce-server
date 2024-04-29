const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const spamSchema = new Schema({
    client:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "client",
    },
    type : String , // seller || product
    idType : {
        type: mongoose.SchemaTypes.ObjectId,
        //ref : ['seller', 'product'],
    },
    reason : String,
    date : Date,
    isAccepted : Boolean
});
module.exports = mongoose.model("spam", spamSchema);
