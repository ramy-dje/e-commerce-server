const messagesCont= require("../controllers/messagesController");
const express = require('express');
const router = express.Router();
/**
 * 
messages :
    post : sendMessage(sender,reciever,message)
    get : getMessages(sender,reciver)=>messages[]
    delete : deleteMessage(id)
 */

// ########### CREATE
router.post("/send/:sender/:reciver",messagesCont.sendMessage);

// ########## GET 
router.get("/get/all/:sender/:reciver" , messagesCont.getMessages);

// ######### DELETE
router.delete("/delete/:id", messagesCont.deleteMessage);

module.exports=router;