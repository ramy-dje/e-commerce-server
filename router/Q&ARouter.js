const QandACont= require("../controllers/Q&AController");
const express = require('express');
const router = express.Router();

/**
 * Q&A:
    post : createQ&A(product,store)
    post : addQ&A(id,question,store)
    put : updateQ&A(id,question,answer)
    get : getQ&A(product,store)
 */

// ########### CREATE
router.post("/create",QandACont.createQandA);

// ########## GET 
router.get("/get/:product/:store" , QandACont.getQandA);

// ########## UPDATE
router.post("/update/add/QandA/answer/:id/:store" ,QandACont.addAnswer);
router.post("/update/add/QandA/question/:id/:store" ,QandACont.addQuestion);
router.post("/update/:id" ,QandACont.updateQandA);

// ######### DELETE
router.delete("/delete/:id", QandACont.deleteQandA);

module.exports=router;