const bcrypt = require('bcrypt');
const token = require('../utils/jwt');
const clientSchema = require('../models/client')
const userSchema = require('../models/User')
const Product = require('../models/product')



const login = async(req,res)=>{
    try{
        const {email,password} = req.body ;
        if(!email || !password){
            return res.json({success:false,message:"data is missing"});
        }
        const client  = await userSchema.findOne({email});
        if(!client){
            return res.json({success:false,message:"client not found"});
        }

        const isPasswordMatch =  await bcrypt.compare(password,client.password); 
        if(!isPasswordMatch){
            return res.json({success:false,message:"password is wrong"});
        }
        const tkn = token.createToken(email);
        res.cookie("token",tkn)
        res.json({success:true,message:"client logged in successfully"});
    }catch(e){
        res.status(404).json({success:false,message:e});
    }
}

const signUp = async (req, res) => {
    try {
      const { firstName, lastName, dateOfBirth, phoneNumber, email, password } = req.body;
      let image = null;
      if (req.file) {
        image = req.file?.filename;
      }
      const existingUser = await userSchema.findOne({ email });
      if (existingUser) {
        return res.json({ success: false, message: 'this email already exists' });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await userSchema.create({
        firstName,
        lastName,
        dateOfBirth,
        phoneNumber,
        email,
        image,
        password: hashedPassword,
      });
      const tkn = token.createToken(email);
      res.cookie("token",tkn)
      return res.json({ success: true, user, token });
    } catch (err) {
      console.log(err);
      return res.json({ success: false, message: err });
    }
  };



const updateUser = async (req,res) =>{

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
                    await userSchema.updateOne({ _id: id }, { $set: 
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

                    await userSchema.updateOne({ _id: id }, { $set: 
                        {
                            firstName,
                            lastName,
                            gender,
                            dateOfBirth,
                            avatar,
                            email,
                            phoneNumber,
                            password,
                        }
                    });
                }

                res.json ({success:true});
            }

        }catch(err){
            res.json ({success:false , error : err});
        }
}

const getAllusers= async (req,res)=>{
    try{
        let result = await userSchema.find();
        res.json(result);
    }catch(err){
        res.json ({success:false , error : err});
    }
}

const getOneUser = async (req , res) =>{
    try{
        let id = req.params.id;
        if(id){
            let result = await userSchema.findById(id);
            res.json(result);
        }else{
            res.json ({success:false,message:"data is missing"});    
        }
    }catch(err){
        res.json ({success:false , error : err});
    }
}



const deleteUser = async (req,res) =>{
    try{
        let id = req.params.id;
        if(id){
            await userSchema.findByIdAndDelete(id);
            res.json ({success:true});
        }else{
            res.json ({success:false,message:"data is missing"});    
        }
    }catch(err){
        res.json ({success:false , error : err});
    }
}
///// added controllers
const likeProduct = async (req,res) => {
    try {
      const userId = req.userId;
      const product = await Product.findById(req.params.id);
      if (!product) {
        throw new Error("the product does not exist");
      }
      const index = product.likedProducts.findIndex((id) => id == userId);
      if (index == -1) {
        product.likedProducts.push(userId);
      } else {
        product.likedProducts.filter((e)=>e == userId)
      }
      await product.save();
      res.status(200).json({ success: true ,message:'product saved'});
    } catch (err) {
      ErrorHandler(err, 400, res);
    }
  };

    


module.exports = {
    login,
    signUp    
}
