const Refunds = require('../models/refunds');

const getRefundsList = async (req,res)=>{
    try{
        const refunds = await Refunds.find();
        res.json({success:true,refunds});
    }catch(e){
        res.json({success:false,message:e});
    }
}

const getRefundsByFilter = async (req,res)=>{
    try{
        const {id,filter} = req.body;
        if(!id){
            res.json({success:false,message:"data is missing"});
        }
        let refunds;
        if(filter == "client"){
            refunds = await Refunds.find({client : id});
        }else if(filter == "seller"){
            refunds = await Refunds.find({seller : id});
        }
        res.json({success:true,refunds});
    }catch(e){
        res.json({success:false,message:e});
    }
}

const createRefund = async (req,res)=>{
    try{
        const {clientId,sellerId,productId,reason ,refundPrice} = req.body;
        if( !(clientId && sellerId && productId && reason && refundPrice)){
            res.json({success:false,message:"data is missing"});
        }
        const newRefund = await Refunds.create({clientId,sellerId,productId,reason,isAccepted:null,refundPrice}); 
        newRefund.save();
        res.json({success:true});
    }catch(e){
        console.log(e)
        res.json({success:false,message: e});
    }
}

const deleteRefund = async (req,res)=>{
    try{
        const {id} = req.params;
        if(!id){
            res.json({success:false,message:"data is missing"});       
        }
        await Refunds.deleteOne({_id :id});
        res.json({success:true});
    }catch(e){
        res.json({success:false,message: e});
    }
    
}

const acceptRefund = async (req,res)=>{
    try{
        const {id} = req.params;
        if(!id){
            res.json({success:false,message:"data is missing"});       
        }else{
            await Refunds.findByIdAndUpdate(id,{isAccepted:true});
            res.json({success:true});
        }
    }catch(e){
        res.json({success:false,message: e});
    }
    
}

module.exports = {
    getRefundsList,
    getRefundsByFilter,
    createRefund,
    deleteRefund,
    deleteRefund,
    acceptRefund
}