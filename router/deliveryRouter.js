const deliveryCont= require("../controllers/deliveryController");
const express = require('express');
const router = express.Router();

/**
 * delivery :
    post : makeDelivery(deliver,store,client,product,payedPrice,timeOfDelivery)=>
    get : getDeliveries()=>delivery[]
    get : getDeliveryByFilter(filter)=>delivery client|store|deliver 
    delete :deleteDelivery(id)=>
    put : setTracking(id,productTracking)=>
 */

// ########### CREATE
router.post("/create",deliveryCont.makeDelivery);

// ########## GET 
router.post("/get/filter/:id" , deliveryCont.getDeliveryByFilter);
router.get("/get/all",deliveryCont.getDeliveries);

// ########## UPDATE
router.put('/update/:id' , deliveryCont.setTracking);


// ######### DELETE
router.delete("/delete/:id", deliveryCont.deleteDelivery);

module.exports=router;