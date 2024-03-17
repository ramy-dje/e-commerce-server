const buy = require('../models/buy');

const addOrder = async (req,res) =>{
/**
 * order = [{
 * store,
 * product,
 * quantity
 * }]
 */
        try{
            let {
               client,
               order,
               shippingSupplier,
               paymentMode,
               price,
               estimatedDelivryTime,
               date
            }= req.body;
          
            if(!(       
               client &&
               order &&
               shippingSupplier &&
               paymentMode &&
               price &&
               estimatedDelivryTime &&
               date
                )){
                    res.json ({success:false,message:"data is missing"});    
                }else{

                    let create =await new buy ({
                        client,
                        order,
                        shippingSupplier,
                        paymentMode,
                        price,
                        estimatedDelivryTime,
                        date
                    });

                    await create.save();
                    res.json ({success:true});
                }
            }catch(e){
            res.json ({success:false});
        }
}

// you need to pass client id in params
const getClientPurchases= async (req,res)=>{
    try{
    let id = req.params.id;
    if(id){
        let result = await buy.find({client :id});
        res.json(result);
    }else{
        res.json ({success:false,message:"data is missing"});    
    }
}catch{
    res.json ({success:false});
}
}

// you need to pass product id in params
const getProductPurchases= async (req,res)=>{
   try{
   let id = req.params.id;
   if(id){
       let result = await buy.find({order:{$elemMatch:{product :id}}});
       res.json(result);
   }else{
       res.json ({success:false,message:"data is missing"});    
   }
}catch{
   res.json ({success:false});
}
}

const getStorePurchases= async (req,res)=>{
   try{
   let id = req.params.id;
   if(id){
       let result = await buy.find({order:{$elemMatch:{store :id}}});
       res.json(result);
   }else{
       res.json ({success:false,message:"data is missing"});    
   }
}catch{
   res.json ({success:false});
}
}

//you have to pass shippingSupplier in params like id
const getPurchasesByShippingSupplier= async (req,res)=>{
   try{
   const {shippingSupplier} = req.params ;
   if(shippingSupplier){
       let result = await buy.find({shippingSupplier :shippingSupplier});
       res.json(result);
   }else{
       res.json ({success:false,message:"data is missing"});    
   }
}catch{
   res.json ({success:false});
}
}

// the same  but use paymentMode
const getPurchasesByPaymentMode= async (req,res)=>{
   try{
   const {paymentMode} = req.params ;
   if(paymentMode){
       let result = await buy.find({paymentMode :paymentMode});
       res.json(result);
   }else{
       res.json ({success:false,message:"data is missing"});    
   }
}catch{
   res.json ({success:false});
}
}
const deletePurshase = async (req,res) =>{
    try{
        let id = req.params.id;
        if(id){
            await buy.findByIdAndDelete(id);
            res.json ({success:true});
        }else{
            res.json ({success:false,message:"data is missing"});    
        }
    }catch(e){
        res.json ({success:false});
    }
}
module.exports = {
   addOrder,
   getClientPurchases,
   getProductPurchases,
   getStorePurchases,
   getPurchasesByShippingSupplier,
   getPurchasesByPaymentMode,
   deletePurshase
}