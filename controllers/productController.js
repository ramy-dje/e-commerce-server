const product =require('../models/product');
const {addProductIntoStore} = require('./storeController');
const cloudinary = require('cloudinary');
const {sendNotification} = require('./notificationController')



const addProduct = async (req,res) =>{
        const creatorId = req.user.id;
        try{
            let {
                name,
                category,
                price,
                colors,
                brand,
                images,
                description,
                sizes,
                quantity,
                store
            }= req.body;
                if(images.length > 0){
                    images =await Promise.all(images.map(async(image)=>{
                        const myCloud = await cloudinary.v2.uploader.upload(image, {
                            folder: "avatars2",
                            width: 150,
                        });
                        const public_id = myCloud.public_id;
                        const url = myCloud.url;
                        image = {
                            public_id,
                            url
                        }
                        console.log({
                            public_id,
                            url
                        })
                        return image
                    })
                )
                }
                
    
            if(!(       
            name &&
            creatorId
            )){
                res.json ({success:false,message:"data is missing"});    
            }else{

                let create = new product ({
                    name,
                    creatorId,
                    category,
                    price,
                    colors,
                    brand,
                    images,
                    description,
                    sizes,
                    quantity,
                    store
                });

                    const s = await create.save();
                    const theStore = await addProductIntoStore(create._id,creatorId);
                    console.log(theStore)
                    await Promise.all(
                        theStore.folowers.map(async(e)=>{
                            await sendNotification(e,'new product from '+theStore.name+' is added go check it',creatorId)
                        })
                    )
                    res.json ({success:true});
                }
            }catch(err){
                console.log(err)
                res.json ({success:false , error : err});
            }
}

const getOneProduct= async (req,res)=>{
try{
    let id = req.params.id;
    if(id){
        let result = await product.findById(id);
        res.json(result);
    }else{
        res.json ({success:false,message:"data is missing"});    
    }
}catch(err){
    res.json ({success:false , error : err});
}
}

const getAllProducts = async (req,res)=>{
    try{
        let result = await product.find();
        res.json(result);
    }catch(err){
        res.json ({success:false , error : err});
    }
}

const getAllProductsByCreator = async (req,res)=>{
    try{
        const {creatorId} = req.body ;
        let result = await product.find({creatorId });
        res.json(result);
    }catch(err){
        res.json ({success:false , error : err});
    }
}

const getAllProductsByCategory = async (req,res)=>{
    try{
        const {category} = req.body ;
        let result = await product.find({category : category});
        res.json(result);
    }catch(err){
        res.json ({success:false , error : err});
    }
}

const updateProduct = async (req,res) =>{

    try{

        let {
            name,
            creatorId,
            category,
            price,
            colors,
            brand,
            images,
            description,
            sizes,
            quantity
        }= req.body;
        let id =req.params.id;
        await product.updateOne({ _id: id }, { $set: 
            {
                name,
                creatorId,
                category,
                price,
                colors,
                brand,
                images,
                description,
                sizes,
                quantity
            }
        });
        res.json ({success:true});
    }catch(err){
        res.json ({success:false , error : err});
    }
}

const deleteProduct = async (req,res) =>{
    try{
        let id = req.params.id;
        if(id){
            await product.findByIdAndDelete(id);
            res.json ({success:true});
        }else{
            res.json ({success:false,message:"data is missing"});    
        }
    }catch(err){
        res.json ({success:false , error : err});
    }
}

///// added
const reviewProduct = async (req,res) => {
    try {
      const userId = req.user.id;
      const {review,productId} = req.body;
      const Product = await product.findById(productId);
      if (!Product) {
        throw new Error("the product does not exist");
      }
      Product.reviews.push({userId,review});
      await Product.save();
      res.status(200).json({ success: true ,message:'product saved'});
    } catch (err) {
      ErrorHandler(err, 400, res);
    }
  };

const handleDiscount = async (req,res) =>{
    try{
        let {id} = req.params;
        const {discount} = req.body
        if(discount > 70){
            return res.json({success:false,message:"discount must be less than 70%"})
        }
        if(id){
            await product.findByIdAndUpdate(id,{
                $set:{
                    discount : discount
                }
            });
            res.json ({success:true,message:"discount changed to "+discount+"%"});
        }else{
            res.json ({success:false,message:"data is missing"});    
        }
    }catch(err){
        res.json ({success:false , error : err});
    }
}


module.exports = {
    addProduct,
    getAllProducts,
    getOneProduct,
    getAllProductsByCategory,
    getAllProductsByCreator,
    updateProduct,
    deleteProduct,
    reviewProduct,
    handleDiscount
}