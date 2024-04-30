const spamCont= require("../controllers/spamController");
const express = require('express');
const router = express.Router();

/**
 * **spam : 
    post : createSpam(client,typeId,type,reason)=>
    get : getAllSpams()=>spam[]
    delete : deleteSpam(spam)=>
    post : accepteSpam(id,isAccepted:boolean)=>
 */

// ########### CREATE
router.post("/create",spamCont.createSpam);

// ########## GET 
//router.get("/get/:id" , spamCont.getOneDeliver);
router.get("/get/all",spamCont.getAllSpams);

// ########## UPDATE
router.put('/update/accept/:id' , spamCont.acceptSpam);


// ######### DELETE
router.delete("/delete/:id", spamCont.deleteSpam);

module.exports=router;