const express = require ("express");
const mongoose = require ("mongoose");
const deliver = require ('./controllers/deliverController');
const spam = require("./controllers/spamController");
const refund = require('./controllers/refundsController');
require('dotenv').config();
const app = express();
app.use(express.json());
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
app.get('/', (req,res)=>{
    res.sendFile('./index.html',{root:__dirname});
})
app.get('/test/:id',deliver.deleteDeliver);
app.post('/add/:id',deliver.updateDeliver);

/**############################################### */
app.post('/spam/create' , spam.createSpam);
app.get('/spam/get' , spam.getAllSpams);
app.post('/spam/accept/:id' , spam.acceptSpam)
app.delete('/spam/delete/:id' ,spam.deleteSpam)


/**############################################### */
app.post('/refund/create' , refund.createRefund) ;
app.get('/refund/get' , refund.getRefundsList);
app.post('/refund/pget' , refund.getRefundsByFilter);
app.delete("/refund/delete/:id" , refund.deleteRefund);
app.post("/acceptRefund/:id", refund.acceptRefund)