const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const contactSuportSchema = new Schema({
    admin: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "admin",
      },
      seller:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "seller",
      },
      date:Date
    
});
module.exports = mongoose.model("contactSuport", contactSuportSchema);
