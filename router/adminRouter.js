const adminCont= require("../controllers/adminController");
const express = require('express');
const router = express.Router();
/**
admin :
    post : createAdmin(firstName,lastName,gender,dateOfBirth,avatar,email,phoneNumber,password)=>
    put : updateAdmin(firstName,lastName,gender,dateOfBirth,avatar,email,phoneNumber,password)=>
    get : getAdmins()=>admin[]
    get : getAdmin(id)=>admin[]
    delete : delete(id)=>
 */

// ########### CREATE
router.post("/create",adminCont.createAdmin);

// ########## GET 
// you have to admin id in params
router.get("/get/all",adminCont.getAllAdmins);
router.get("/get/:id" , adminCont.getOneAdmin);

// ########## UPDATE
router.put('/update/:id' , adminCont.updateAdmin);
// ######### DELETE
// you have to send the id of Survey in params
router.delete("/delete/:id", adminCont.deleteAdmin);

module.exports=router;