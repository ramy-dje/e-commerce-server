const seller = require('../models/seller');
const bcrypt = require('bcrypt');

// we use bcrypt to hashing password at secuer way
const createSeller = async (req,res) =>{
    
            try{
                let {
                    firstName,
                    lastName,
                    gender,
                    dateOfBirth,
                    avatar,
                    email,
                    phoneNumber,
                    password,
                    commerceRegistrNumber
                }= req.body;
    
                if(!(firstName && lastName && gender &&
                    dateOfBirth && avatar && email && 
                    phoneNumber && password && commerceRegistrNumber)){
                        res.json ({success:false,message:"data is missing"});    
                    }else{
                        password = await bcrypt.hash(password, 10);
    
                        let dob = new Date(dateOfBirth);
                        let dd =new Date (Date.now());
                        let age = dd.getFullYear() - dob.getFullYear();
    
                        let create =await new seller ({
                            firstName,
                            lastName,
                            gender,
                            dateOfBirth,
                            avatar,
                            email,
                            phoneNumber,
                            password,
                            age,
                            commerceRegistrNumber
                        });
    
                        await create.save();
                        res.json ({success:true});
                    }
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
            await seller.updateOne({ _id: id }, { $set: {isAccepted : true}});
            res.json ({success:true});
        }
    }catch(err){
        res.json ({success:false , error : err});
    }
}
   
const setProfestionalSeller = async (req,res) =>{
    
    try{
        let id =req.params.id;
        if(!id)
        {
            res.json ({success:false,message:"data is missing"});    
        }else{
            await seller.updateOne({ _id: id }, { $set: {isProffestionalAccount : true}});
            res.json ({success:true});
        }
    }catch(err){
        res.json ({success:false , error : err});
    }
}

const updateSeller = async (req,res) =>{

    try{

        let {
            firstName,
            lastName,
            gender,
            dateOfBirth,
            avatar,
            email,
            phoneNumber,
            password
        }= req.body;
        

            let id =req.params.id;


            if(!(id && (firstName || lastName || gender ||
            dateOfBirth || avatar || email || 
            phoneNumber || password)))
            {
                res.json ({success:false,message:"data is missing"});    
            }else{
                if(password){
                    password = await bcrypt.hash(password, 10);
                }
                if(dateOfBirth){
                    let dob = new Date(dateOfBirth);
                    let dd =new Date (Date.now());
                    let age = dd.getFullYear() - dob.getFullYear();
                    await seller.updateOne({ _id: id }, { $set: 
                        {
                            firstName,
                            lastName,
                            gender,
                            dateOfBirth,
                            avatar,
                            email,
                            phoneNumber,
                            password,
                            age
                        }
                    });
                }else{

                    await seller.updateOne({ _id: id }, { $set: 
                        {
                            firstName,
                            lastName,
                            gender,
                            dateOfBirth,
                            avatar,
                            email,
                            phoneNumber,
                            password
                        }
                    });
                }

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
 
const getProfestionalSellers= async (req,res)=>{
    try{
        let result = await seller.find({isProffestionalAccount : true});
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
    getProfestionalSellers,
    setProfestionalSeller,
    updateSeller,
    deleteSeller
}