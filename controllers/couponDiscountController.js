const couponDiscount =require('../models/couponDiscount');

const createCuponDiscount = async (req,res) =>{

        try{
            const {
                store,
                product,
                percentage,
                code
            }= req.body;
          
            if(!(       
                    store &&
                    product &&
                    percentage &&
                    code
                )){
                    res.json ({success:false,message:"data is missing"});    
                }else{

                    let create =await new couponDiscount ({
                        store,
                        product,
                        percentage,
                        code
                    });

                    await create.save();
                    res.json ({success:true});
                }
            }catch(err){
                res.json ({success:false , error : err});
            }
}

const getOneCouponDiscount= async (req,res)=>{
try{
    let id = req.params.id;
    if(id){
        let result = await couponDiscount.findById(id);
        res.json(result);
    }else{
        res.json ({success:false,message:"data is missing"});    
    }
}catch(err){
    res.json ({success:false , error : err});
}
}

const getAllCouponDiscounts = async (req,res)=>{
    try{
        let result = await couponDiscount.find();
        res.json(result);
    }catch(err){
        res.json ({success:false , error : err});
    }
}

const changeCuponCode = async (req,res) =>{

    try{

        const {
            code
        }= req.body;
        

            const id =req.params.id;


            if(!(id && code))
            {
                res.json ({success:false,message:"data is missing"});    
            }else{


                    await couponDiscount.updateOne({ _id: id }, { $set: 
                        {
                            code
                        }
                    });
                

                res.json ({success:true});
            }

        }catch(err){
            res.json ({success:false , error : err});
        }
}

const changeCuponPercentage = async (req,res) =>{

    try{

        const {
            percentage
        }= req.body;
        

            const id =req.params.id;


            if(!(id && percentage))
            {
                res.json ({success:false,message:"data is missing"});    
            }else{


                    await couponDiscount.updateOne({ _id: id }, { $set: 
                        {
                            percentage
                        }
                    });
                

                res.json ({success:true});
            }

        }catch(err){
            res.json ({success:false , error : err});
        }
}

const deleteCuponDiscount = async (req,res) =>{
    try{
        let id = req.params.id;
        if(id){
            await couponDiscount.findByIdAndDelete(id);
            res.json ({success:true});
        }else{
            res.json ({success:false,message:"data is missing"});    
        }
    }catch(err){
        res.json ({success:false , error : err});
    }
}
module.exports = {
    createCuponDiscount,
    changeCuponCode,
    changeCuponPercentage,
    deleteCuponDiscount,
    getAllCouponDiscounts,
    getOneCouponDiscount
}