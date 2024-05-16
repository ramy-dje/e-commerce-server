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
router.get("/",sellerCont.getAllSellers);
router.get("/:id" , sellerCont.getOneSeller);


// ########## UPDATE

router.put('/accept/:id' , sellerCont.acceptSeller);

// ######### DELETE
// you have to send the id of Survey in params
router.delete("/:id", sellerCont.deleteSeller);

module.exports=router;