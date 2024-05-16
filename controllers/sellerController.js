const seller = require('../models/seller');
const user = require('../models/User');
const bcrypt = require('bcrypt');

// we use bcrypt to hashing password at secuer way
const createSeller = async (req,res) =>{
    
            try{
                let {
                    userId,
                    registerCommerce
                }= req.body;
                let create =await new seller ({
                    userId,
                    registerCommerce,
                });
                await user.findOneAndUpdate({_id:userId},{ $set: 
                    {
                        role:"seller",
                    }
                })

                await create.save();
                res.json ({success:true,message:'seller created'});
                }catch(err){
                    res.json ({success:false , error : err});
                }
}
    
const acceptSeller = async (req,res) =>{
    
    try{
        let id =req.params.id;
        if(!id)
        {
            res.json ({success:false,message:"data is missing"});    
        }else{
            await seller.updateOne({ userId: id }, { $set: {isAccepted : true}});
            res.json ({success:true});
        }
    }catch(err){
        res.json ({success:false , error : err});
    }
}
   


const getAllSellers= async (req,res)=>{
        try{
            let result = await seller.find();
            res.json(result);
        }catch(err){
            res.json ({success:false , error : err});
        }
}
 

const getOneSeller = async (req , res) =>{
        try{
            let id = req.params.id;
            if(id){
                let result = await seller.findById(id);
                res.json(result);
            }else{
                res.json ({success:false,message:"data is missing"});    
            }
        }catch(err){
            res.json ({success:false , error : err});
        }
}
    
    
const deleteSeller = async (req,res) =>{
        try{
            let id = req.params.id;
            if(id){
                await seller.findByIdAndDelete(id);
                res.json ({success:true});
            }else{
                res.json ({success:false,message:"data is missing"});    
            }
        }catch(err){
            res.json ({success:false , error : err});
        }
}
    
module.exports = {
    createSeller,
    getAllSellers,
    acceptSeller,
    getOneSeller,    
    deleteSeller
}