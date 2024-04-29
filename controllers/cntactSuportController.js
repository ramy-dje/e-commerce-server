const cntactSuport =require('../models/cntactSuport');

const sendSuportMessage= async (req,res) =>{
    
        try{
            const {sender,reciver} = req.params;
            const {
                message
            }= req.body;
          
            if(!(sender && reciver && message)){
                    res.json ({success:false,message:"data is missing"});    
                }else{

                    let create =await new cntactSuport ({
                        sender,
                        reciver,
                        message
                    });

                    await create.save();
                    res.json ({success:true});
                }
            }catch(err){
                res.json ({success:false , error : err});
            }
}

const getSuportMessages = async (req,res)=>{
    try{
        const {sender,reciver} = req.params;
        let result = await cntactSuport.find({$and :[{ sender: sender },{ reciver: reciver}]});
        res.json(result);
    }catch(err){
        res.json ({success:false , error : err});
    }
}

const deleteSuportMessage = async (req,res) =>{
    try{
        let id = req.params.id;
        if(id){
            await cntactSuport.findByIdAndDelete(id);
            res.json ({success:true});
        }else{
            res.json ({success:false,message:"data is missing"});    
        }
    }catch(err){
        res.json ({success:false , error : err});
    }
}

module.exports = {
    sendSuportMessage,
    getSuportMessages,
    deleteSuportMessage
}