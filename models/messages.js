const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const messagesSchema = new Schema({
    sender:{
        type: mongoose.SchemaTypes.ObjectId,
        //ref : ['seller', 'client'],
    },
    reciver:{
        type: mongoose.SchemaTypes.ObjectId,
        //ref : ['seller', 'client'],
    },
    message : String ,
    date : {
        type :Date,
        default : Date.now()
    }
});
module.exports = mongoose.model("messages", messagesSchema);
