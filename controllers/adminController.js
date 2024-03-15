const admin = require('../models/admin');
const bcrypt = require('bcrypt');
/**
 *  
    delete : delete(id)=>
 */



// we use bcrypt to hashing password at secuer way
const createAdmin = async (req,res) =>{

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

            if(!(firstName && lastName && gender &&
                dateOfBirth && avatar && email && 
                phoneNumber && password)){
                    res.json ({success:false,message:"data is missing"});    
                }else{
                    password = await bcrypt.hash(password, 10);

                    let dob = new Date(dateOfBirth);
                    let dd =new Date (Date.now());
                    let age = dd.getFullYear() - dob.getFullYear();

                    let create =await new admin ({
                        firstName,lastName,gender,
                        dateOfBirth,avatar,email,
                        phoneNumber,password,age
                    });

                    await create.save();
                    res.json ({success:true});
                }
            }catch{
            res.json ({success:false});
        }
}

const updateAdmin = async (req,res) =>{

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
                    await admin.updateOne({ _id: id }, { $set: 
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

                    await admin.updateOne({ _id: id }, { $set: 
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

        }catch(e){
            console.log(e)
        res.json ({success:false});
    }
}

const getAllAdmins= async (req,res)=>{
    try{
        let result = await admin.find();
        res.json(result);
    }catch{
        res.json ({success:false});
    }
}

const getOneAdmin = async (req , res) =>{
    try{
        let id = req.params.id;
        if(id){
            let result = await admin.findById(id);
            res.json(result);
        }else{
            res.json ({success:false,message:"data is missing"});    
        }
    }catch{
        res.json ({success:false});
    }
}


const deleteAdmin = async (req,res) =>{
    try{
        let id = req.params.id;
        if(id){
            await admin.findByIdAndDelete(id);
            res.json ({success:true});
        }else{
            res.json ({success:false,message:"data is missing"});    
        }
    }catch(e){
        res.json ({success:false});
    }
}

module.exports = {
    createAdmin,
    getAllAdmins,
    getOneAdmin,
    updateAdmin,
    deleteAdmin
}