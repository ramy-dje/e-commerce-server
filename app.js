const express = require ("express");
const mongoose = require ("mongoose");
const http = require('http')
require('dotenv').config();


const app = express();
const server = http.createServer(app)

app.use(express.json());


const store = require("./router/storeRouter");
const buy = require("./router/buyRouter");
const refund = require("./router/refundRouter");
const message = require("./router/messageRouter");
const auth = require("./router/auth");
const product = require("./router/productRouter");

app.use("/store",store);
app.use("/buy",buy);
app.use("/refund",refund);
app.use("/message",message);
app.use("/",auth);


mongoose.connect(process.env.database).then(
    ()=>{
    console.log("acces to database");
    app.listen(process.env.PORT,(err)=>{
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



module.exports={
    server
}