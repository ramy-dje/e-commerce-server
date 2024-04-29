const deliverCont= require("../controllers/deliverController");
const express = require('express');
const router = express.Router();


/**
 * 
**deliver :
    post : createDeliver(name,logo,priceByKm,estimedDeliverTime,areaToDeliver)=>
    get : getDelivers()=>deliver[]
    get : getdeliver(id)=>deliver
    put : updateDeliver(id)=>deliver
    delete : deleteDeliver(id)=>
 */

// ########### CREATE
router.post("/create",deliverCont.createDeliver);

// ########## GET 
router.get("/get/:id" , deliverCont.getOneDeliver);
router.get("/get/all",deliverCont.getDelivers);

// ########## UPDATE
router.put('/update/:id' , deliverCont.updateDeliver);


// ######### DELETE
router.delete("/delete/:id", deliverCont.deleteDeliver);

module.exports=router;