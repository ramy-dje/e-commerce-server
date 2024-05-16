const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const notificationSchema = new Schema({
    destination : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "user",
    },
    content:String
},{
    timestamps:true
});
module.exports = mongoose.model("notification", notificationSchema);
