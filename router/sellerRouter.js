const sellerCont= require("../controllers/sellerController");
const express = require('express');
const router = express.Router();

/**
 * 
seller :
    post : createSeller(firstName,lastName,gender,dateOfBirth,avatar,email,phoneNumber,password,commerceRegisterNumber)
    put : updateSeller(id,firstName,lastName,gender,dateOfBirth,avatar,email,phoneNumber,password)
    deleteAccount : deleteSeller(id,password)
    put : acceptSeller(id,isAccepted) 
    put : setIsProfestionalAccount(id,isProfestional)
    get : getSellers()=>seller[]
    get : getProfestionalSeller(isProfestional)=>sellers[]
 */

// ########### CREATE
router.post("/create",sellerCont.createSeller);

// ########## GET 
// you have to admin id in params
router.get("/get/all",sellerCont.getAllSellers);
router.get("/get/:id" , sellerCont.getOneSeller);
router.get("/get/all/pro" , sellerCont.getProfestionalSellers)

// ########## UPDATE
router.put('/update/:id' , sellerCont.updateSeller);
router.put('/update/accept/:id' , sellerCont.acceptSeller);
router.put('/update/pro/:id' , sellerCont.setProfestionalSeller);
// ######### DELETE
// you have to send the id of Survey in params
router.delete("/delete/:id", sellerCont.deleteSeller);

module.exports=router;