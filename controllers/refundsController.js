const Refunds = require('../models/refunds');

const getRefundsList = async (req,res)=>{
    try{
        const refunds = await Refunds.find();
        res.json({success:true,refunds});
    }catch(err){
        res.json ({success:false , error : err});
    }
}

const getRefundsByFilter = async (req,res)=>{
    try{
        const {id,filter} = req.params;
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
    }catch(err){
        res.json ({success:false , error : err});
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
    }catch(err){
        res.json ({success:false , error : err});
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
    }catch(err){
        res.json ({success:false , error : err});
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
    }catch(err){
        res.json ({success:false , error : err});
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