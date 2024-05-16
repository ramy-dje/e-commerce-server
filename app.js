const express = require ("express");
const mongoose = require ("mongoose");
const http = require('http')
const cookieParser = require('cookie-parser');
const cors = require('cors')
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDE_NAME,
    api_key: process.env.CLOUD_API_NAME,
    api_secret: process.env.CLOUDE_KEY,
});
  
  


const app = express();
const server = http.createServer(app)


app.use(express.json({
    limit:'50mb'
}));
app.use(cookieParser())
app.use(cors({
    origin:'*'
}))

const store = require("./router/storeRouter");
const buy = require("./router/buyRouter");
const refund = require("./router/refundRouter");
const auth = require("./router/auth");
const product = require("./router/productRouter");

app.use("/store",store);
app.use("/buy",buy);
app.use("/refund",refund);
app.use("/product",product);
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