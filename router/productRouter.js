const productCont= require("../controllers/productController");
const express = require('express');
const router = express.Router();

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
router.get("/get/:id" , productCont.getOneProduct);
router.get("/get/all",productCont.getAllProducts);
router.post("/get/all/creator" , productCont.getAllProductsByCreator);
router.post("/get/all/category" ,productCont.getAllProductsByCategory);


// ########## UPDATE
router.put('/update/:id' , productCont.updateProduct);


// ######### DELETE
router.delete("/delete/:id", productCont.deleteProduct);

module.exports=router;