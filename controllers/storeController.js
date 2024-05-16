const store =require('../models/store');

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
        let result = await store.findById(id);
        res.json(result);
    }catch(err){
        res.json ({success:false , error : err});
    }
}

const addStore = async (req,res) =>{

    try{
        let {
            name,
            seller,
            logo
        }= req.body;
      
        if(!(name && seller)){
                res.json ({success:false,message:"data is missing"});    
            }else{
                let create =await new store ({name,logo,seller});
                await create.save();
                res.json ({success:true});
            }
        }catch(err){
            res.json ({success:false , error : err});
        }
}

// you have put in body only one product
const addProductIntoStore = async (req,res) =>{
try{

    let {product}= req.body;
        let id =req.params.id;
        if(!(id && product))
        {
            res.json ({success:false,message:"data is missing"});    
        }else{
                await store.updateOne({ _id: id }, { $push: { products:product}});
            res.json ({success:true});
        }
    }catch(err){
        res.json ({success:false , error : err});
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
    
        let {folow}= req.body;
            let id =req.params.id;
            if(!(id && folow))
            {
                res.json ({success:false,message:"data is missing"});    
            }else{
                    await store.updateOne({ _id: id }, { $push: { folows:folow}});
                res.json ({success:true});
            }
        }catch(err){
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
    deleteStore
}