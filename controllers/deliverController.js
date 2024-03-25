const deliver = require('../models/deliver');

//#####POST
const createDeliver = async (req,res) =>{
    try{
        const {logo,name,pricePerKM, estimatedTimeToDeliver,areasToDeliver}= req.body;
        
        if(!(logo && name && estimatedTimeToDeliver && 
            pricePerKM  && areasToDeliver)){
            res.json ({success:false,message:"data is missing"});    
        }else{
            let create =await new deliver (req.body);
            await create.save();
            res.json ({success:true});
        }
    }catch(err){
        res.json ({success:false , error : err});
    }
}

const getDelivers = async (req,res)=>{
    try{
        let result = await deliver.find();
        res.json(result);
    }catch(err){
        res.json ({success:false , error : err});
    }
}

const getOneDeliver = async (req,res)=>{
    try{
        let id = req.params.id;
        if(id){
            let result = await deliver.findById(id);
            res.json(result);
        }else{
            res.json ({success:false,message:"data is missing"});    
        }
    }catch(err){
        res.json ({success:false , error : err});
    }
}

const updateDeliver = async (req,res)=>{
    try{
        let id =req.params.id;
        if (id && req.body){
            await deliver.updateOne({ _id: id }, { $set: req.body });
            res.json ({success:true});
        }else{
            res.json ({success:false,message:"data is missing"});    
        }
    }catch(err){
        res.json ({success:false , error : err});
    }
}

const deleteDeliver = async (req,res) =>{
    try{
        let id = req.params.id;
        if(id){
            await deliver.findByIdAndDelete(id);
            res.json ({success:true});
        }else{
            res.json ({success:false,message:"data is missing"});    
        }
    }catch(err){
        res.json ({success:false , error : err});
    }
}
module.exports = {
    createDeliver,
    getDelivers,
    getOneDeliver,
    updateDeliver,
    deleteDeliver
}