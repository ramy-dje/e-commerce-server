const productCont= require("../controllers/productController");
const express = require('express');
const router = express.Router();
const {authorizedRoles,isAuthentificated} = require('../middlewares/auth')

/**
 * product :
    post : addProduct(productName,creatorName,desciption,images,videos,3dModles,colors,dimenstions,weight,category,tagsOrKeyWords)
    put : updateProduct(id,productName,creatorName,desciption,images,videos,3dModles,colors,dimenstions,weight,category,tagsOrKeyWords)
    get : getProduct()=>product[]
    get : getProductByCategory()=>product[]
    get : getProductByCreatorName()=>product[]
    delete : deleteProduct(id)=>
 */

// ########### CREATE
router.post("/create",productCont.addProduct);

// ########## GET 
// you have to admin id in params
router.get("/:id" , productCont.getOneProduct);
router.get("/get/latest" , productCont.getLatestProducts);
router.get("/get/liked" , productCont.getProductsSortedByLikedProducts);
router.get("/get/discount" , productCont.getProductsInDiscount);
router.get("/get/all",productCont.getAllProducts);
router.post("/creator" , productCont.getAllProductsByCreator);
router.post("/category" ,productCont.getAllProductsByCategory);
router.put('/review' ,isAuthentificated,productCont.reviewProduct);
router.put('/discount/:id' ,productCont.handleDiscount);
// ########## UPDATE
router.put('/update/:id' , productCont.updateProduct);


// ######### DELETE
router.delete("/delete/:id", productCont.deleteProduct);

module.exports=router;