const bcrypt = require('bcrypt');
const token = require('../utils/jwt');
const clientSchema = require('../models/client')



const login = async(req,res)=>{
    try{
        const {email,password} = req.body ;
        if(!email || !password){
            return res.json({success:false,message:"data is missing"});
        }
        const client  = await clientSchema.findOne({email});
        if(!client){
            return res.json({success:false,message:"client not found"});
        }

        const isPasswordMatch =  await bcrypt.compare(password,client.password); 
        if(!isPasswordMatch){
            return res.json({success:false,message:"password is wrong"});
        }
        const tkn = token.createToken(email);
        res.cookie("token",token)
        res.json({success:true,message:"client logged in successfully"});
    }catch(e){
        res.status(404).json({success:false,message:e});
    }
}

module.exports = {
    login    
}
