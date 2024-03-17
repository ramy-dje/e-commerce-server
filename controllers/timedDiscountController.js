const timedDiscount =require('../models/timedDiscount');

const createDiscount = async (req,res) =>{

        try{
            const {
                store,
                product,
                percentage,
                timeToEndDiscount
            }= req.body;
          
            if(!(       
                    store &&
                    product &&
                    percentage &&
                    timeToEndDiscount
                )){
                    res.json ({success:false,message:"data is missing"});    
                }else{

                    let create =await new timedDiscount ({
                        store,
                        product,
                        percentage,
                        timeToEndDiscount
                    });

                    await create.save();
                    res.json ({success:true});
                }
            }catch(e){
                console.log(e)
            res.json ({success:false});
        }
}

const getOneTimedDiscount= async (req,res)=>{
try{
    let id = req.params.id;
    if(id){
        let result = await timedDiscount.findById(id);
        res.json(result);
    }else{
        res.json ({success:false,message:"data is missing"});    
    }
}catch{
    res.json ({success:false});
}
}

const getAllTimedDiscounts = async (req,res)=>{
    try{
        let result = await timedDiscount.find();
        res.json(result);
    }catch{
        res.json ({success:false});
    }
}

const changeExpireTime = async (req,res) =>{

    try{

        const {
            timeToEndDiscount
        }= req.body;
        

            const id =req.params.id;


            if(!(id && timeToEndDiscount))
            {
                res.json ({success:false,message:"data is missing"});    
            }else{


                    await timedDiscount.updateOne({ _id: id }, { $set: 
                        {
                            timeToEndDiscount
                        }
                    });
                

                res.json ({success:true});
            }

        }catch(e){
            console.log(e)
        res.json ({success:false});
    }
}

const changePercentage = async (req,res) =>{

    try{

        const {
            percentage
        }= req.body;
        

            const id =req.params.id;


            if(!(id && percentage))
            {
                res.json ({success:false,message:"data is missing"});    
            }else{


                    await timedDiscount.updateOne({ _id: id }, { $set: 
                        {
                            percentage
                        }
                    });
                

                res.json ({success:true});
            }

        }catch(e){
            console.log(e)
        res.json ({success:false});
    }
}

const deleteDiscount = async (req,res) =>{
    try{
        let id = req.params.id;
        if(id){
            await timedDiscount.findByIdAndDelete(id);
            res.json ({success:true});
        }else{
            res.json ({success:false,message:"data is missing"});    
        }
    }catch(e){
        res.json ({success:false});
    }
}
module.exports = {
    createDiscount,
    changeExpireTime,
    changePercentage,
    deleteDiscount,
    getAllTimedDiscounts,
    getOneTimedDiscount
}