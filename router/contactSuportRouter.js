const cntactSuportCont= require("../controllers/cntactSuportController");
const express = require('express');
const router = express.Router();

/**
 * 
contactSupport :
    post : sendMessage(sender,reciever,message)
    get : getMessages(sender,reciver)=>messages[]
    delete : deleteMessage(id) 
 */

// ########### CREATE
router.post("/create/:sender/:reciver",cntactSuportCont.sendSuportMessage);

// ########## GET 
router.get("/get/:sender/:reciver" , cntactSuportCont.getSuportMessages);



// ######### DELETE
router.delete("/delete/:id", cntactSuportCont.deleteSuportMessage);

module.exports=router;