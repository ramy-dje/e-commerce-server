const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const QandASchema = new Schema({
    product : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "product",
    },
    store : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "store",
    },
    question : String ,
    answer : String

});
module.exports = mongoose.model("QandA", QandASchema);
