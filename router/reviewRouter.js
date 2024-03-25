const reviewCont= require("../controllers/reviewsController");
const express = require('express');
const router = express.Router();

/**
 * review :
    post : createReview(client,seller,product,reviewMsg)
    put : addLike(id,client)
    put : addRating(id,client,rating)
    put : removeLike(id,client)
    get : getReviewsOfProduct(product,seller)=>review[]
    delete : deleteReview(id)
 */

// ########### CREATE
router.post("/create",reviewCont.createReview);

// ########## GET 
router.get("/get/all/:store/:product" , reviewCont.getReviewsOfProduct);

// ########## UPDATE
router.put('/update/add/like/:product/:client' , reviewCont.addLike);
router.put('/update/add/rating/:product/:client' , reviewCont.addRating);
router.put('/update/remove/like/:product/:client' , reviewCont.removeLike);

// ######### DELETE
router.delete("/delete/:id", reviewCont.deleteReview);

module.exports=router;