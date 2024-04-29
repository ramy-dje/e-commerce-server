const express = require ("express");
const mongoose = require ("mongoose");

const admin = require("./router/adminRouter");
const seller = require("./router/sellerRouter");
const client = require("./router/clientRouter");
const store = require("./router/storeRouter");
const deliver = require("./router/deliverRouter");
const delivery = require("./router/deliveryRouter");
//const spam = require("./router/spamRouter");
const buy = require("./router/buyRouter");
const review = require("./router/reviewRouter");
const refund = require("./router/refundRouter");
const cntactSuport =require("./router/contactSuportRouter");
const QandA = require("./router/Q&ARouter");
const couponDiscount =require("./router/couponDiscountRouter");
const timedDiscount = require("./router/timedDiscountRouter");
const message = require("./router/messageRouter");
const auth = require("./router/auth");


require('dotenv').config();
const app = express();
app.use(express.json());
mongoose.connect(process.env.DATABASE).then(
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

app.use("/admin",admin);
app.use("/seller",seller);
app.use("/client",client);
app.use("/store",store);
app.use("/deliver",deliver);
app.use("/delivery",delivery);
//app.use("/spam",spam);
app.use("/buy",buy);
app.use("/review",review);
app.use("/refund",refund);
app.use("/cntactSuport",cntactSuport);
app.use("/QandA",QandA);
app.use("/couponDiscount",couponDiscount);
app.use("/timedDiscount",timedDiscount);
app.use("/message",message);
app.use("/",auth);