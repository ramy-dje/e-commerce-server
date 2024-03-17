const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const contactSuportSchema = new Schema({
      sender: {
        type: mongoose.SchemaTypes.ObjectId,
        //ref: "admin",
      },
      reciver:{
        type: mongoose.SchemaTypes.ObjectId,
        //ref: "seller",
      },
      message : String ,
      date: {
        type :Date,
        default : Date.now()
    }
    
});
module.exports = mongoose.model("contactSuport", contactSuportSchema);
