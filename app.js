const express = require ("express");
const mongoose = require ("mongoose");
require('dotenv').config();
const app = express();
mongoose.connect(process.env.database).then(
    ()=>{
    console.log("acces to database");
    app.listen(process.env.port,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("listening succec !!");
    }

})
}).catch((err)=>{
console.log("can't acces to database");
console.log(err)
}
);