const product= require("../models/product");
const buy= require("../models/buy");
const store= require("../models/store");
const express = require('express');
const router = express.Router();
const {authorizedRoles,isAuthentificated} = require('../middlewares/auth')

async function generatelast6MonthsDate(model) {
    const last6Months = [];
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate()+1);
    for(let i = 5;i>=0;i--){
        const endDate = new Date(currentDate.getFullYear(),currentDate.getMonth(),currentDate.getDate()-i*28);
        const startDate = new Date(currentDate.getFullYear(),currentDate.getMonth(),currentDate.getDate()-28);
        const monthYear = endDate.toLocaleString('default',{day:'numeric',month:'short',year:'numeric'});
        const count = await model.countDocuments({
            createdAt : {
                $gte : startDate,
                $lt : endDate
            }
        });
        last6Months.push({month:monthYear,count});

    }
    return {last6Months};
}


router.get('/productsCount',async(req,res)=>{
    try{
        console.log('hello')
        const products =await product.countDocuments({});
        res.json({success:true,message:products})
    }catch(e){
        console.log(e);
        res.json({success:false,message:e})
    }
})
router.get('/BuysCount',async(req,res)=>{
    try{
      
        const buys =await buy.countDocuments({});
        res.json({success:true,message:buys})
    }catch(e){
        console.log(e);
        res.json({success:false,message:e})
    }
})
router.get('/storesCount',async(req,res)=>{
    try{
        const stores =await store.countDocuments({});
        res.json({success:true,message:stores})
    }catch(e){
        console.log(e);
        res.json({success:false,message:e})
    }
})
router.get('/buyCountt',async(req,res)=>{
    try{
        const stores =await generatelast6MonthsDate(buy)
        res.json({success:true,message:stores})
    }catch(e){
        console.log(e);
        res.json({success:false,message:e})
    }
})
module.exports=router;