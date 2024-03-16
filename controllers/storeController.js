const store =require('../models/store');
/**
    delete : deleteStore(id)
 */
/**
 * seller 65f55113043c0011ebd4d59b
 * client 65f46a7ed0016a11fa857dbc
 * product 65f55a55b588557ddc8e0f90
*/
/**
 *  seller,
    products,
    visitors,
    folows,
    name,
    logo,
    allowedPaymentTypes
 */

const getAllStores = async (req,res)=>{
    try{
        let result = await store.find();
        res.json(result);
    }catch{
        res.json ({success:false});
    }
}

const getOneStore = async (req,res)=>{
    try{
        let id =req.params.id;
        let result = await store.findById(id);
        res.json(result);
    }catch{
        res.json ({success:false});
    }
}

const addStore = async (req,res) =>{

    try{
        let {
            name,
            seller,
            logo
        }= req.body;
      
        if(!(name && logo && seller)){
                res.json ({success:false,message:"data is missing"});    
            }else{
                let create =await new store ({name,logo,seller});
                await create.save();
                res.json ({success:true});
            }
        }catch(e){
            console.log(e)
        res.json ({success:false});
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
    }catch(e){
        console.log(e)
    res.json ({success:false});
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
        }catch(e){
            console.log(e)
        res.json ({success:false});
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
        }catch(e){
            console.log(e)
        res.json ({success:false});
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
        }catch(e){
            console.log(e)
        res.json ({success:false});
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
        }catch(e){
            console.log(e)
        res.json ({success:false});
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
        }catch(e){
            console.log(e)
        res.json ({success:false});
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
    }catch(e){
        res.json ({success:false});
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