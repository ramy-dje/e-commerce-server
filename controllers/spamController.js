const Spam= require('../models/spam');

const getAllSpams = async (req,res)=>{
    try{
        const spams = await Spam.find();
        res.json({success:true,spams});
    }catch(e){
        res.json({success:false,message:e});
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
    }catch(e){
            res.json({success:false,message: e});
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
    }catch(e){
        res.json({success:false,message: e});
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
        
    }catch(e){
        res.json({success:false,message: e});
    }
    
}

module.exports = {
    getAllSpams,
    createSpam,
    deleteSpam,
    acceptSpam
}