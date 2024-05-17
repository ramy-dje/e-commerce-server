const buyCont= require("../controllers/buyController");
const express = require('express');
const router = express.Router();
const {isAuthentificated} = require('../middlewares/auth')

/**
 * buy :
    post : createPurchase(client,seller,product,shippingSupplier,paymentMode)
    get : getClientPurchases(client)=>buy[]
    get : getproductPurchases(product)=>buy[]
    get : getSellerPurchases(seller)=>buy[]
    get : getPurchasesByShippingSupplier(shippingSupplier)=>buy[]
    get : getPurchasesByPaymentMode(paymentMode)=>buy[]
    delete : deletePurshase (id)=>
 */

// ########### CREATE
router.post("/create",isAuthentificated,buyCont.addOrder);

// ########## GET 
router.get("/client/:id" , buyCont.getClientPurchases);
router.get("/store/:id",buyCont.getStorePurchases);
router.get("/product/:id",buyCont.getProductPurchases);
router.get("/shippingSupplier/:shippingSupplier",buyCont.getPurchasesByShippingSupplier);
router.get("/paymentMode/:paymentMode",buyCont.getPurchasesByPaymentMode);

// ########## UPDATE
//router.put('/update/accept/:id' , buyCont.acceptSpam);


// ######### DELETE
router.delete("/delete/:id", buyCont.deletePurshase);

module.exports=router;