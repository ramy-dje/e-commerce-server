const client = require('../models/client');
const bcrypt = require('bcrypt');

// we use bcrypt to hashing password at secuer way
// the age is created automatic
const createClient = async (req,res) =>{

        try{
            let {
                firstName,lastName,gender,
                dateOfBirth,avatar,email,
                phoneNumber,password,
                star
            }= req.body;

            if(!(firstName && lastName && gender &&
                dateOfBirth && avatar && email && 
                phoneNumber && password && 
                star)){
                    res.json ({success:false,message:"data is missing"});    
                }else{
                    password = await bcrypt.hash(password, 10);
                    let dob = new Date(dateOfBirth);
                    let dd =new Date (Date.now());
                    let age = dd.getFullYear() - dob.getFullYear();
                    let create =await new client ({
                        firstName,lastName,gender,
                        dateOfBirth,avatar,email,
                        phoneNumber,password,
                        star,age
                    });
                    await create.save();
                    res.json ({success:true});
                }
            }catch(err){
                res.json ({success:false , error : err});
            }
}

const updateClient = async (req,res) =>{

    try{

        let {
            firstName,lastName,gender,
            dateOfBirth,avatar,email,
            phoneNumber,password
        }= req.body;


            let id =req.params.id;


            if(!(id && (firstName || lastName || gender ||
            dateOfBirth || avatar || email || 
            phoneNumber || password )))
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
                    await client.updateOne({ _id: id }, { $set: 
                        {
                            firstName,
                            lastName,
                            gender,
                            dateOfBirth,
                            avatar,
                            email,
                            phoneNumber,
                            password,
                            star,
                            age
                        }
                    });
                }else{

                    await client.updateOne({ _id: id }, { $set: 
                        {
                            firstName,
                            lastName,
                            gender,
                            dateOfBirth,
                            avatar,
                            email,
                            phoneNumber,
                            password,
                            star
                        }
                    });
                }

                res.json ({success:true});
            }

        }catch(err){
            res.json ({success:false , error : err});
        }
}

const changeStar = async (req ,res) =>{
    try{

        let {star}= req.body;
        let id =req.params.id;


            if(!(id && star))
            {
                res.json ({success:false,message:"data is missing"});    
            }else{

                await client.updateOne({ _id: id }, { $set: {star} });

                res.json ({success:true});
            }

        }catch(err){
            res.json ({success:false , error : err});
        }
}
const getAllClients= async (req,res)=>{
    try{
        let result = await client.find();
        res.json(result);
    }catch(err){
        res.json ({success:false , error : err});
    }
}

const getOneClient = async (req , res) =>{
    try{
        let id = req.params.id;
        if(id){
            let result = await client.findById(id);
            res.json(result);
        }else{
            res.json ({success:false,message:"data is missing"});    
        }
    }catch(err){
        res.json ({success:false , error : err});
    }
}

/**
 * filter = age || gender
 * gender = male || female
 * age = 20,21,22 ...etc
 */
// you have to pass filter and filter value 
const getAllClientsByFilter = async (req , res) =>{
    try{
        const {filter , filterValue} = req.body;
        if(filter && filterValue){
            let result = "";

            switch (filter){
                case 'age':
                    result = await client.find({age : filterValue});
                break;
                case 'gender':
                    result = await client.find({gender : filterValue});
                break;
            }

            res.json(result);
        }else{
            res.json ({success:false,message:"data is missing"});    
        }
    }catch(err){
        res.json ({success:false , error : err});
    }
}

const getStar = async (req,res) =>{
    try{
        let id = req.params.id;
        if(id){
            let result = await client.findById(id);
            res.json(result.star);
        }else{
            res.json ({success:false,message:"data is missing"});    
        }
    }catch(err){
        res.json ({success:false , error : err});
    }
}

const deleteClient = async (req,res) =>{
    try{
        let id = req.params.id;
        if(id){
            await client.findByIdAndDelete(id);
            res.json ({success:true});
        }else{
            res.json ({success:false,message:"data is missing"});    
        }
    }catch(err){
        res.json ({success:false , error : err});
    }
}

module.exports = {
    createClient,
    getOneClient,
    getAllClients,
    updateClient,
    getStar,
    deleteClient,
    getAllClientsByFilter,
    changeStar
}