const bcrypt = require('bcrypt');
const token = require('../utils/jwt');
const clientSchema = require('../models/client');
const userSchema = require('../models/User');
const Product = require('../models/product');
const cloudinary = require('cloudinary');

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
       const tkn =await token.createToken({id:client._id,email:client.email,role:client.role});
        res.cookie("token",tkn)
        res.json({success:true,message:"client logged in successfully",user:client,tkn});
    }catch(e){
        res.status(404).json({success:false,message:e});
    }
}

const signUp = async (req, res) => {
    try {
      const { firstName, lastName,gender, email, password } = req.body;
    
      const existingUser = await userSchema.findOne({ email });
      if (existingUser) {
        return res.json({ success: false, message: 'this email already exists' });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await userSchema.create({
        firstName,
        lastName,
        gender,
        email,
        password: hashedPassword,
      });
      const tkn = token.createToken({id:user._id,email,role:user.role});
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
            dateOfBirth,email,
            phoneNumber,password
        }= req.body;
        let id =req.params.id;

        if(password){
            password = await bcrypt.hash(password, 10);
        }
        const user = await userSchema.findOneAndUpdate({ _id: id }, { $set: 
            {
                firstName,
                lastName,
                gender,
                dateOfBirth,
                email,
                phoneNumber,
                password,
            }
        },{new:true});
        res.json ({success:true,message:'user updated',user});
        }catch(err){
            res.json ({success:false , error : err});
        }
}
const updateUserSecurity = async (req,res) =>{
  try{
      let {email,oldPassword,newPassword}= req.body;
      const existingUser = await clientSchema.findOne({email});
      const isEqual = await bcrypt.compare(oldPassword, existingUser.password);
      if(!isEqual){
        return res.json({success:false,message:'the old password is wrong'})
      }
      if(newPassword){
        newPassword = await bcrypt.hash(newPassword, 10);
      }
      const user = await userSchema.findOneAndUpdate({ email }, { $set: 
          {
              email,
              password:newPassword
          }
      },{new:true});
      res.json ({success:true,message:'user security updated',user});
      }catch(err){
        console.log(err)
          res.json ({success:false , error : err});
      }
}
const updateUserImage = async(req,res)=>{
  try{
    let {image}= req.body;
    let id =req.params.id;
    const userExists = await clientSchema.find({_id:id})
    if (userExists.image?.public_id)
      await cloudinary.v2.uploader.destroy(userExists.image.public_id);
    if (image) {
      const myCloud = await cloudinary.v2.uploader.upload(image, {
        folder: "avatars",
        width: 150,
      });
      public_id = myCloud.public_id;
      url = myCloud.url;
    }
    const user = await userSchema.findOneAndUpdate({ _id: id }, { $set: 
      {
          image:{public_id,url},
      }
  },{new:true});
  res.json ({success:true,message:'user image updated',user});
  }catch(e){
    console.log(e)
    res.json({success:false,message:'image did not uploaed'})
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
      const productId = req.params.id;  
      const userId = req.user.id;
      const user = await userSchema.findById(userId);
      if(!user){
        return res.json({success:false,message:'user does not existes'})
      }
      const index = user.likedProducts.findIndex((id) => id == userId);
      
      if (index == -1) {
        user.likedProducts.push(productId)
      } else {
        user.likedProducts.filter((e)=>e == productId)
      }
      await user.save();
      res.status(200).json({ success: true ,message:'product saved'});
    } catch (err) {
      res.json({ success: false ,message:err});
    }
  };
  const getLikedProduct = async (req,res) => {
    try {  
      const userId = req.user.id;
      const user = await userSchema.findById(userId).populate('likedProducts');
      if(!user){
        return res.json({success:false,message:'user does not existes'})
      }
      await user.save();
      const {likedProducts} = user
      res.status(200).json({ success: true ,likedProducts});
    } catch (err) {
      res.json({ success: false ,message:err});
    }
  };

  const addWishList = async (req,res) => {
    try {
        const productId = req.params.id;  
        const userId = req.user.id;
        const user = await userSchema.findById(userId);
        if(!user){
          return res.json({success:false,message:'user does not existes'})
        }
        const index = user.wishList.findIndex((id) => id == userId);
        
        if (index == -1) {
          user.wishList.push(productId)
        } else {
          user.wishList.filter((e)=>e == productId)
        }
        await user.save();
        res.status(200).json({ success: true ,message:'product saved'});
      } catch (err) {
        res.json({ success: false ,message:err});
      }
  };
  const getWishList = async (req,res) => {
    try {  
      const userId = req.user.id;
      const user = await userSchema.findById(userId).populate({
        path:'wishList',
        select: "_id name images price"
      });
      if(!user){
        return res.json({success:false,message:'user does not existes'})
      }
      await user.save();
      const {wishList} = user
      res.status(200).json({ success: true ,wishList});
    } catch (err) {
      res.json({ success: false ,message:err});
    }
  };

    
    


module.exports = {
    login,
    signUp,
    updateUser,
    deleteUser,
    getAllusers,
    getOneUser,
    likeProduct,
    addWishList,
    getLikedProduct,
    getWishList,
    updateUserImage,
    updateUserSecurity
}
