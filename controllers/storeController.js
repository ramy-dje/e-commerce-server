const store =require('../models/store');
const cloudinary = require('cloudinary');
const mongoose = require('mongoose')


const getAllStores = async (req,res)=>{
    try{
        let result = await store.find();
        res.json(result);
    }catch(err){
        res.json ({success:false , error : err});
    }
}

const getOneStore = async (req,res)=>{
    try{
     
        let id =req.params.id;
        let result = await store.findById(id).populate({
            path:"products",
            select:"name price discount images"
        });
        console.log(result)
        res.json(result);
    }catch(err){
        res.json ({success:false , error : err});
    }
}
const getStoreByCreator = async (req,res)=>{
    try{
   
        let id =req.params.id;
        let result = await store.findOne({creatorId:new mongoose.Types.ObjectId(id)})
        console.log(result._id)
        res.json(result);
    }catch(err){
        res.json ({success:false , error : err});
    }
}
const addStore = async (name,seller,logo) =>{

    try{
        
        if(!(seller)){
                console.log('error')   
        }else{
            let create =await new store ({name,logo,seller});
            await create.save();
            console.log('store created') 
        }
    }catch(err){
        console.log('error') 
    }
}

// you have put in body only one product
const addProductIntoStore = async (product,id) =>{
try{
        if(!(id && product))
        {
            console.log('data missing');  
        }else{
                const theStore = await store.findOneAndUpdate({ seller: id }, { $push: { products:product}},{new:true});
                console.log('added to store')
                return theStore
        }
    }catch(err){
        console.log('not added');
        console.log(err);
    }
}

const updateStore = async (req,res) =>{
    try{
    
        let {
            name,
            seller,
            logo
            }= req.body;

            let id =req.params.id;
            if(!(id && (name || seller || logo)))
            {
                res.json ({success:false,message:"data is missing"});    
            }else{
                await store.updateOne({ _id: id }, {name,seller,logo});
                res.json ({success:true});
            }
        }catch(err){
            res.json ({success:false , error : err});
        }
}

// you have put in body only one visitor
const addVisitorsIntoStore = async (req,res) =>{
    try{
    
        let {visitor}= req.body;
            let id =req.params.id;
            if(!(id && visitor))
            {
                res.json ({success:false,message:"data is missing"});    
            }else{
                    await store.updateOne({ _id: id }, { $push: { visitors:visitor}});
                res.json ({success:true});
            }
        }catch(err){
            res.json ({success:false , error : err});
        }
}

const addFolowsIntoStore = async (req,res) =>{
    try{
    
        let folow= req.user.id;
        let id =req.params.id;
        if(!(id && folow))
        {
            res.json ({success:false,message:"data is missing"});    
        }else{
            const s = await store.updateOne({ _id: id }, { $push: { folowers:folow}});
            res.json ({success:true});
        }
    }catch(err){
        console.log(err)
        res.json ({success:false , error : err});
    }
}
const getFolowers = async (req,res) =>{
    try{
        let id =req.params.id;
        const data = await store.findOne({_id:id}).populate({
            path:"folowers",
            select:"firstName lastName image dateOfBirth"
        });
        const {folowers} =data
        res.json ({success:true,folowers});
    }catch(err){
        console.log(err)
        res.json ({success:false , error : err});
    }
}
const getProducts = async (req,res) =>{
    try{
        let id =req.params.id;
        const folowers = await store.find({_id:id}).populate({
            path:"products",
            select:"name price discount images"
        });
        res.json ({success:true,folowers});
    }catch(err){
        console.log(err)
        res.json ({success:false , error : err});
    }
}

const setPaymentWay = async (req,res) =>{
    try{
    
        let {allowedPaymentType}= req.body;
            let id =req.params.id;
            if(!(id && allowedPaymentType))
            {
                res.json ({success:false,message:"data is missing"});    
            }else{
                    await store.updateOne({ _id: id }, { $push: { allowedPaymentTypes:allowedPaymentType}});
                res.json ({success:true});
            }
        }catch(err){
            res.json ({success:false , error : err});
        }
}

// you have put in body the product id 
const deleteProductFromStore = async (req , res)=>{
    try{

        let {product}= req.body;
            let id =req.params.id;
            if(!(id && product))
            {
                res.json ({success:false,message:"data is missing"});    
            }else{
                await store.updateOne({ _id: id }, { $pull: { products:product}});
                res.json ({success:true});
            }
        }catch(err){
            res.json ({success:false , error : err});
        }
}

const deleteStore = async (req,res) =>{
    try{
        let id = req.params.id;
        if(id){
            await store.findByIdAndDelete(id);
            res.json ({success:true});
        }else{
            res.json ({success:false,message:"data is missing"});    
        }
    }catch(err){
        res.json ({success:false , error : err});
    }
}

const updateStoreLogo = async(req,res)=>{
    try{
      let {logo}= req.body;
      let id =req.params.id;
      const storeExists = await store.find({_id:id})
      if (storeExists.logo?.public_id)
        await cloudinary.v2.uploader.destroy(storeExists.logo.public_id);
      if (logo) {
        const myCloud = await cloudinary.v2.uploader.upload(logo, {
          folder: "avatars",
          width: 150,
        });
        public_id = myCloud.public_id;
        url = myCloud.url;
      }
       await store.findOneAndUpdate({ _id: id }, { $set: 
        {
            logo:{public_id,url},
        }
    },{new:true});
    res.json ({success:true,message:'user image updated'});
    }catch(e){
      console.log(e)
      res.json({success:false,message:'image did not uploaed'})
    }
}

const updateStoreBckgoundImage = async(req,res)=>{
    try{
      let {bgImage}= req.body;
      let id =req.params.id;
      const storeExists = await store.find({_id:id})
      if (storeExists.bgImage?.public_id)
        await cloudinary.v2.uploader.destroy(storeExists.bgImage.public_id);
      if (bgImage) {
        const myCloud = await cloudinary.v2.uploader.upload(bgImage, {
          folder: "avatars",
          width: 150,
        });
        public_id = myCloud.public_id;
        url = myCloud.url;
      }
       await store.findOneAndUpdate({ _id: id }, { $set: 
        {
            backgroundImage:{public_id,url},
        }
    },{new:true});
    res.json ({success:true,message:'user image updated'});
    }catch(e){
      console.log(e)
      res.json({success:false,message:'image did not uploaed'})
    }
}


module.exports = {
    addStore,
    addProductIntoStore,
    addVisitorsIntoStore,
    setPaymentWay,
    deleteProductFromStore,
    addFolowsIntoStore,
    updateStore,
    getAllStores,
    getOneStore,
    deleteStore,
    getFolowers,
    updateStoreLogo,
    updateStoreBckgoundImage,
    getProducts,
    getStoreByCreator

}