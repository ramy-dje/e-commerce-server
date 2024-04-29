const product =require('../models/product');

const addProduct = async (req,res) =>{

        try{
            let {
                name,
                creatorName,
                weight,
                category,
                dimensions,
                price,
                colors,
                brand,
                images,
                videos,
                models3D,
                tagsOrKeywords,
                description
            }= req.body;
          
            if(!(       
                name &&
                creatorName &&
                weight &&
                category &&
                dimensions &&
                price &&
                colors &&
                brand &&
                images &&
                videos &&
                models3D &&
                tagsOrKeywords &&
                description
                )){
                    res.json ({success:false,message:"data is missing"});    
                }else{

                    let create =await new product ({
                        name,
                        creatorName,
                        weight,
                        category,
                        dimensions,
                        price,
                        colors,
                        brand,
                        images,
                        videos,
                        models3D,
                        tagsOrKeywords,
                        description
                    });

                    await create.save();
                    res.json ({success:true});
                }
            }catch(err){
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

const getAllProductsByCreatorName = async (req,res)=>{
    try{
        const {creatorName} = req.body ;
        let result = await product.find({creatorName : creatorName});
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
            creatorName,
            weight,
            category,
            dimensions,
            price,
            colors,
            brand,
            images,
            videos,
            models3D,
            tagsOrKeywords,
            description
        }= req.body;
        

            let id =req.params.id;


            if(!(id && (
                name ||
                creatorName ||
                weight ||
                category ||
                dimensions ||
                price ||
                colors ||
                brand ||
                images ||
                videos ||
                models3D ||
                tagsOrKeywords ||
                description
            )))
            {
                res.json ({success:false,message:"data is missing"});    
            }else{


                    await product.updateOne({ _id: id }, { $set: 
                        {
                            name,
                            creatorName,
                            weight,
                            category,
                            dimensions,
                            price,
                            colors,
                            brand,
                            images,
                            videos,
                            models3D,
                            tagsOrKeywords,
                            description
                        }
                    });
                

                res.json ({success:true});
            }

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
module.exports = {
    addProduct,
    getAllProducts,
    getOneProduct,
    getAllProductsByCategory,
    getAllProductsByCreatorName,
    updateProduct,
    deleteProduct
}