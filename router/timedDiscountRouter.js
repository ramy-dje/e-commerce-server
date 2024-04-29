const timedDiscountCont= require("../controllers/timedDiscountController");
const express = require('express');
const router = express.Router();

/**
 * 
timedDiscount : 
    post : createDiscount(seller,product,discountPercentage,timeToEnd)
    delete : deleteDiscount(id)
    put : changeExpireTime(id,timeToEnd)
    put : changePercentage(id,percentage)
 */

// ########### CREATE
router.post("/create",timedDiscountCont.createDiscount);

// ########## GET 
router.get("/get/all" , timedDiscountCont.getAllTimedDiscounts);
router.get("/get/:id" , timedDiscountCont.getOneTimedDiscount);

// ########## UPDATE
router.post("/update/expireTime/:id" ,timedDiscountCont.changeExpireTime);
router.post("/update/percentage/:id" ,timedDiscountCont.changePercentage);

// ######### DELETE
router.delete("/delete/:id", timedDiscountCont.deleteDiscount);

module.exports=router;