const express = require ("express");
const mongoose = require ("mongoose");
const deliver = require ('./controllers/deliverController');
const spam = require("./controllers/adminController");
const refund = require('./controllers/refundsController');
const bcrypt = require('bcrypt');

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

/**ààààààààààààààààààààààààà */
//$2b$10$RedFqh.QmOY5KLzJiaeqRuPOh1Qp0ZRAIEQGWwSl.JCnfGAq6nPNa
app.post('/client/:id' , spam.updateAdmin);
app.get('/all' , spam.getAllAdmins);
app.get('/:id' , spam.getOneAdmin);
app.delete('/:id' , spam.deleteAdmin);