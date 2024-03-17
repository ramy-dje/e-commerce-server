const QandA =require('../models/Q&A');

const createQandA= async (req,res) =>{

        try{
            const {
                product,
                store
            }= req.body;
          
            if(!(       
                    product &&
                    store
                )){
                    res.json ({success:false,message:"data is missing"});    
                }else{

                    let create =await new QandA ({
                        product,
                        store
                    });

                    await create.save();
                    res.json ({success:true});
                }
            }catch(e){
                console.log(e)
            res.json ({success:false});
        }
}

// you have to pass the id and store in params
const addQuestion= async (req,res) =>{
    try{

        const {
            question
        }= req.body;
        

            const {id,store} =req.params;


            if(!(id &&  store && question))
            {
                res.json ({success:false,message:"data is missing"});    
            }else{


                    await QandA.updateOne({$and :[{ _id: id },{ store: store}]}, { $set: 
                        {
                            store,
                            question
                        }
                    });
                

                res.json ({success:true});
            }

    }catch(e){
            console.log(e)
        res.json ({success:false});
    }

}

const addAnswer= async (req,res) =>{
    try{

        const {
            answer
        }= req.body;
        

            const {id,store} =req.params;


            if(!(id &&  store && answer))
            {
                res.json ({success:false,message:"data is missing"});    
            }else{


                    await QandA.updateOne({$and :[{ _id: id },{ store: store}]}, { $set: 
                        {
                            answer
                        }
                    });
                

                res.json ({success:true});
            }

    }catch(e){
            console.log(e)
        res.json ({success:false});
    }

}

const getQandA = async (req,res)=>{
    try{
        const {product,store} =req.params;
        let result = await QandA.find({$and :[{ product: product },{ store: store}]});
        res.json(result);
    }catch{
        res.json ({success:false});
    }
}

const updateQandA = async (req,res) =>{

    try{

        const {
            question,
            answer
        }= req.body;
        

            const id =req.params.id;


            if(!(id && (question || answer)))
            {
                res.json ({success:false,message:"data is missing"});    
            }else{


                    await QandA.updateOne({ _id: id }, { $set: 
                        {
                            question,
                            answer
                        }
                    });
                

                res.json ({success:true});
            }

        }catch(e){
            console.log(e)
        res.json ({success:false});
    }
}

const deleteQandA = async (req,res) =>{
    try{
        let id = req.params.id;
        if(id){
            await QandA.findByIdAndDelete(id);
            res.json ({success:true});
        }else{
            res.json ({success:false,message:"data is missing"});    
        }
    }catch(e){
        res.json ({success:false});
    }
}
module.exports = {
    createQandA,
    addQuestion,
    addAnswer,
    getQandA,
    updateQandA,
    deleteQandA
}