const Spam= require('../models/spam');

const getAllSpams = async (req,res)=>{
    try{
        const spams = await Spam.find();
        res.json({success:true,spams});
    }catch(err){
        res.json ({success:false , error : err});
    }
}

const createSpam= async (req,res)=>{
    try{
        const {clientId,sellerId,productId,reason} = req.body;
        if( !(clientId && sellerId && productId && reason)){
            res.json({success:false,message:"data is missing"});
        }
            const newSpam= await Spam.create({clientId,sellerId,productId,reason,isAccepted:null}); 
            newSpam.save();
            res.json({success:true});
    }catch(err){
        res.json ({success:false , error : err});
    }
}

const deleteSpam= async (req,res)=>{
    try{
        const {id} = req.params;
        if(!id){
            res.json({success:false,message:"data is missing"});       
        }
        await Spam.deleteOne({_id : id});
        res.json({success:true});
    }catch(err){
        res.json ({success:false , error : err});
    }
    
}

const acceptSpam= async (req,res)=>{
    try{
        const { id } = req.params;
        if (!id) {
            res.json({ success: false, message: "data is missing" });       
        }
        try {
            await Spam.findByIdAndUpdate(id, { isAccepted: true });
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error updating spam" });
        }
        
    }catch(err){
        res.json ({success:false , error : err});
    }
    
}

module.exports = {
    getAllSpams,
    createSpam,
    deleteSpam,
    acceptSpam
}