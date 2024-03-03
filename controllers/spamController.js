const Spam= require('../models/spam');

const getAllSpams = async (req,res)=>{
    try{
        const spams = await Spam.find();
        return res.json({success:true,spams});
    }catch(e){
        return res.json({success:false,message:e});
    }
}
const createSpam= async (req,res)=>{
    try{
        const {clientId,sellerId,productId,reason} = req.body;
        if( !(clientId && sellerId && productId && reason)){
            return res.json({success:false,message:"data is missing"});
        }
        const newSpam= await Spam.create({clientId,sellerId,productId,reason,isAccepted:null}); 
    }catch(e){
        return res.json({success:false,message: e});
    }
}

const deleteSpam= async (req,res)=>{
    try{
        const {id} = req.params;
        if(!id){
            return res.json({success:false,message:"data is missing"});       
        }
        await Spam.deleteOne({id});
        return res.json({success:true});
    }catch(e){
        return res.json({success:false,message: e});
    }
    
}
const acceptSpam= async (req,res)=>{
    try{
        const {id} = req.params;
        if(!id){
            return res.json({success:false,message:"data is missing"});       
        }
        await Spam.findByIdAndUpdate({id},{isAccepted:true});
        return res.json({success:true});
    }catch(e){
        return res.json({success:false,message: e});
    }
    
}