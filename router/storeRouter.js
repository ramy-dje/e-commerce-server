const storeCont= require("../controllers/storeController");
const express = require('express');
const router = express.Router();
const {isAuthentificated} = require('../middlewares/auth')

/**
 * store :
    post : createStore(seller,name,logo)
    post : addProduct(productName,creatorName,desciption,images,videos,3dModles,colors,dimenstions,weight,category,tagsOrKeyWords,storeId)
    put : updateProduct(id,productName,creatorName,desciption,images,videos,3dModles,colors,dimenstions,weight,category,tagsOrKeyWords,storeId)
    put : addVisit(id,client)
    get : getStoreData(store)
    put : setPaymentWay(paymentWay)=>
    delete : deleteProduct(id,productName)
    delete : deleteStore(id)
 */

// ########### CREATE
router.post("/create",storeCont.addStore);

// ########## GET 
// you have to admin id in params
router.get("/all",storeCont.getAllStores);
router.get("/:id" , storeCont.getOneStore);
router.get("/creator/:id" , storeCont.getStoreByCreator);


// ########## UPDATE
router.put('/update/:id' , storeCont.updateStore);
//visitors need to  ad the date of the visit
router.put("/update/add/visitors/:id" , storeCont.addVisitorsIntoStore);
router.put("/update/add/paymentWay/:id" , storeCont.setPaymentWay);
router.put("/folow/:id" ,isAuthentificated,storeCont.addFolowsIntoStore);
router.put("/logo/:id" ,storeCont.updateStoreLogo);
router.put("/bgImage/:id" ,storeCont.updateStoreBckgoundImage);

// ######### DELETE
router.delete("/delete/:id", storeCont.deleteStore);
router.delete("/delete/product/:id", storeCont.deleteProductFromStore);

router.get("/folowers/:id", storeCont.getFolowers);
router.get("/products/:id", storeCont.getProducts);

module.exports=router;