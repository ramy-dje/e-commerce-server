const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const containsSchema = new Schema({
    product : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "product",
    },
    store : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "store",
    },
    description : String ,
    tagsKeyWords : [String],
    colors : [String],
    images : [String],
    vidios : [String],
    // 3dModel 
});
module.exports = mongoose.model("contains", containsSchema);
