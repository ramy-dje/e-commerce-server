const messages =require('../models/messages');

const sendMessage= async (req,res) =>{
    
            try{
                const {sender,reciver} = req.params;
                const {
                    message
                }= req.body;
              
                if(!(sender && reciver && message)){
                        res.json ({success:false,message:"data is missing"});    
                    }else{
    
                        let create =await new messages ({
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
  

const getMessages = async (req,res)=>{
        try{
            const {sender,reciver} = req.params;
            let result = await messages.find({$and :[{ sender: sender },{ reciver: reciver}]});
            res.json(result);
        }catch(err){
            res.json ({success:false , error : err});
        }
}

const deleteMessage = async (req,res) =>{
        try{
            let id = req.params.id;
            if(id){
                await messages.findByIdAndDelete(id);
                res.json ({success:true});
            }else{
                res.json ({success:false,message:"data is missing"});    
            }
        }catch(err){
            res.json ({success:false , error : err});
        }
}
module.exports = {
    sendMessage,
    getMessages,
    deleteMessage
}