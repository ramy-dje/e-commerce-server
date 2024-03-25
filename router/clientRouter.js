const clientCont= require("../controllers/clientController");
const express = require('express');
const router = express.Router();

/**
 
client :
    post : createClient(firstName,lastName,gender,dateOfBirth,avatar,email,phoneNumber,password)
    put : updateClient(id,firstName,lastName,gender,dateOfBirth,avatar,email,phoneNumber,password)
    deleteAccount : deleteClient(id)
    get : getClientData(id)=>client
    get : getAllClients()=>client[]
    get : getAllClientsByfilter(filter)=>client[]
    put : changeStar(id,star) //scheduler
    get : getStar(id)
 */

// ########### CREATE
router.post("/create",clientCont.createClient);

// ########## GET 
// you have to admin id in params
router.get("/get/all",clientCont.getAllClients);
router.get("/get/:id" , clientCont.getOneClient);
router.post("/get/filter" , clientCont.getAllClientsByFilter);
router.get("/get/:id" , clientCont.getOneClient);
router.get("/get/star/:id" , clientCont.getStar);

// ########## UPDATE
router.put('/update/:id' , clientCont.updateClient);
router.put('/update/star/:id' , clientCont.changeStar);

// ######### DELETE
// you have to send the id of Survey in params
router.delete("/delete/:id", clientCont.deleteClient);

module.exports=router;