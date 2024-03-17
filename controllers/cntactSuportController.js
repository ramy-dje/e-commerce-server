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
            }catch(e){
                console.log(e)
            res.json ({success:false});
        }
}

const getSuportMessages = async (req,res)=>{
    try{
        const {sender,reciver} = req.params;
        let result = await cntactSuport.find({$and :[{ sender: sender },{ reciver: reciver}]});
        res.json(result);
    }catch{
        res.json ({success:false});
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
    }catch(e){
        res.json ({success:false});
    }
}

module.exports = {
    sendSuportMessage,
    getSuportMessages,
    deleteSuportMessage
}