const delivery =require('../models/delivery');

/**
    delete :deleteDelivery(id)=>
 */

    /**
    client,
    deliver,
    product,
    store,
    payedPrice,
    timeOfDelivery,
    productTracking
     */
const makeDelivery = async (req,res) =>{
    
            try{
                let {
                    client,
                    deliver,
                    product,
                    store,
                    payedPrice,
                    timeOfDelivery
                }= req.body;
              
                if(!(       
                        client &&
                        deliver &&
                        product &&
                        store &&
                        payedPrice &&
                        timeOfDelivery
                    )){
                        res.json ({success:false,message:"data is missing"});    
                    }else{
    
                        let create =await new delivery ({
                            client,
                            deliver,
                            product,
                            store,
                            payedPrice,
                            timeOfDelivery
                        });
    
                        await create.save();
                        res.json ({success:true});
                    }
                }catch(err){
                    res.json ({success:false , error : err});
                }
}
    
const getDeliveries = async (req,res)=>{
        try{
            let result = await delivery.find();
            res.json(result);
        }catch(err){
            res.json ({success:false , error : err});
        }
}
    
// filter = client|store|deliver
const getDeliveryByFilter = async (req,res)=>{
        try{
            const {filter} = req.body ;
            const id =req.params.id;
            if(filter && id){
                let result ="";
                switch (filter){
    
                    case "client":
                        result = await delivery.find({client : id});
                        res.json(result);
                    break;
    
                    case "store":
                        result = await delivery.find({store : id});
                        res.json(result);
                    break;
    
                    case "deliver":
                        result = await delivery.find({deliver : id});
                        res.json(result);
                    break;
                    default :
                        res.json ({success:false , reason : ' wrong filter input'});
                    break;
                }
            }else{
                res.json ({success:false});
            }
        }catch(err){
            res.json ({success:false , error : err});
        }
}
    

    
const setTracking = async (req,res) =>{
    
        try{
    
            const {
                productTracking
            }= req.body;
            
    
                let id =req.params.id;
    
    
                if(!(id && productTracking))
                {
                    res.json ({success:false,message:"data is missing"});    
                }else{
    
    
                        await delivery.updateOne({ _id: id }, { $set: 
                            {
                                productTracking
                            }
                        });
                    
    
                    res.json ({success:true});
                }
    
            }catch(err){
                res.json ({success:false , error : err});
            }
}
    
const deleteDelivery = async (req,res) =>{
        try{
            let id = req.params.id;
            if(id){
                await delivery.findByIdAndDelete(id);
                res.json ({success:true});
            }else{
                res.json ({success:false,message:"data is missing"});    
            }
        }catch(err){
            res.json ({success:false , error : err});
        }
}
module.exports = {
    makeDelivery,
    setTracking,
    getDeliveries,
    getDeliveryByFilter,
    deleteDelivery
}