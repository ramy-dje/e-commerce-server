const reviews =require('../models/reviews');

const createReview = async (req,res) =>{
    
            try{
                const {
                    store,
                    product,
                    client,
                    reviewText
                }= req.body;
              
                if(!(       
                    store &&
                    product &&
                    client &&
                    reviewText
                    )){
                        res.json ({success:false,message:"data is missing"});    
                    }else{
    
                        let create =await new reviews ({
                            store,
                            product,
                            client,
                            reviewText
                        });
    
                        await create.save();
                        res.json ({success:true});
                    }
                }catch(e){
                    console.log(e)
                res.json ({success:false});
            }
}
    
const getReviewsOfProduct= async (req,res)=>{
    try{
    const {store , product} = req.params;
    if(store && product){
        let result = await reviews.find({ $and:[{ product: product },{ store: store }]});
        res.json(result);
    }else{
        res.json ({success:false,message:"data is missing"});    
    }
    }catch{
        res.json ({success:false});
    }
}
    
// you have to pass id of product and client
const addLike = async (req,res) =>{  
        try{
                let {product,client} =req.params;
    
    
                if(!(product && client))
                {
                    res.json ({success:false,message:"data is missing"});    
                }else{
                        await reviews.updateOne({ $and:[{ product: product },{ client: client }]},
                        { $set: {reviewLikes :true}});
                 res.json ({success:true});
            }
        }catch(e){
        console.log(e)
        res.json ({success:false});
    }
}

const removeLike = async (req,res) =>{  
    try{
            let {product,client} =req.params;


            if(!(product && client))
            {
                res.json ({success:false,message:"data is missing"});    
            }else{
                    await reviews.updateOne({ $and:[{ product: product },{ client: client }]},
                    { $set: {reviewLikes :false}});
             res.json ({success:true});
        }
    }catch(e){
    console.log(e)
    res.json ({success:false});
}
}

// you have to pass id of product and client in params and rating number in body
const addRating = async (req,res) =>{
    try{
        const {product,client} =req.params;
        const {raiting} = req.body;

        if(!(product && client && raiting))
        {
            res.json ({success:false,message:"data is missing"});    
        }else{
                await reviews.updateOne({ $and:[{ product: product },{ client: client }]},
                { $set: {raiting :raiting}});
         res.json ({success:true});
    }
}catch(e){
console.log(e)
res.json ({success:false});
}
}

const deleteReview = async (req,res) =>{
    try{
        let id = req.params.id;
        if(id){
            await reviews.findByIdAndDelete(id);
            res.json ({success:true});
        }else{
            res.json ({success:false,message:"data is missing"});    
        }
    }catch(e){
        res.json ({success:false});
    }
}
module.exports = {
    createReview,
    addLike,
    addRating,
    removeLike,
    getReviewsOfProduct,
    deleteReview
}