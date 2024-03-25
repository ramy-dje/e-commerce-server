const couponDiscountCont= require("../controllers/couponDiscountController");
const express = require('express');
const router = express.Router();

/**
 * couponDiscount : 
    post : createDiscount(seller,product,discountPercentage,code)
    delete : deleteDiscount(id)
    put : changeCode(id,code)
    put : changePercentage(id,percentage)
 */

// ########### CREATE
router.post("/create",couponDiscountCont.createCuponDiscount);

// ########## GET 
router.get("/get/all" , couponDiscountCont.getAllCouponDiscounts);
router.get("/get/:id" , couponDiscountCont.getOneCouponDiscount);

// ########## UPDATE
router.post("/update/code/:id" ,couponDiscountCont.changeCuponCode);
router.post("/update/percentage/:id" ,couponDiscountCont.changeCuponPercentage);

// ######### DELETE
router.delete("/delete/:id", couponDiscountCont.deleteCuponDiscount);

module.exports=router;