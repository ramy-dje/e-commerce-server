const Refunds = require('../models/refunds');

const getRefundsList = async (req,res)=>{
    try{
        const refunds = await Refunds.find();
        return res.json({success:true,refunds});
    }catch(e){
        return res.json({success:false,message:e});
    }
}
const getRefundsByFilter = async (req,res)=>{
    try{
        const {id,filter} = req.body;
        if(!id){
            return res.json({success:false,message:"data is missing"});
        }
        let refunds;
        if(filter == "client"){
            refunds = await Refunds.find({client : id});
        }else if(filter == "seller"){
            refunds = await Refunds.find({seller : id});
        }
        return res.json({success:true,refunds});
    }catch(e){
        return res.json({success:false,message:e});
    }
}
const createRefund = async (req,res)=>{
    try{
        const {clientId,sellerId,productId,reason ,refundPrice} = req.body;
        if( !(clientId && sellerId && productId && reason && refundPrice)){
            return res.json({success:false,message:"data is missing"});
        }
        const newSpam = await Refunds.create({clientId,sellerId,productId,reason,isAccepted:null,refundPrice}); 
    }catch(e){
        return res.json({success:false,message: e});
    }
}

const deleteRefund = async (req,res)=>{
    try{
        const {id} = req.params;
        if(!id){
            return res.json({success:false,message:"data is missing"});       
        }
        await Refunds.deleteOne({id});
        return res.json({success:true});
    }catch(e){
        return res.json({success:false,message: e});
    }
    
}
const acceptRefund = async (req,res)=>{
    try{
        const {id} = req.params;
        if(!id){
            return res.json({success:false,message:"data is missing"});       
        }
        await Refunds.findByIdAndUpdate({id},{isAccepted:true});
        return res.json({success:true});
    }catch(e){
        return res.json({success:false,message: e});
    }
    
}