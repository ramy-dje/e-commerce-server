const refundCont= require("../controllers/refundsController");
const express = require('express');
const router = express.Router();

/**
 * 
**refund :
    post : createRefund(client,seller,product,reason,price)
    get : getRefundsList()=>refund[]
    get : getrefundsByFilter(filter)=>refund (filter : client|product|seller)
    post : setAccepted(id,isAccepted:boolean)=>
 */

// ########### CREATE
router.post("/create",refundCont.createRefund);

// ########## GET 
router.get("/get/all" , refundCont.getRefundsList);
router.get("/get/:id/:filter" , refundCont.getRefundsByFilter);

// ########## UPDATE
router.put('/update/accept/:id' , refundCont.acceptRefund);

// ######### DELETE
router.delete("/delete/:id", refundCont.deleteRefund);

module.exports=router;