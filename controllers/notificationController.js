const Notification = require('../models/notifications');


const getNotifcations = async(req,res)=>{
    try{
        const {id}= req.user
        const notifications = await Notification.find({destination:id});
        res.json({success:true,notifications})
    }catch(e){
        console.log(e);
        res.json({success:false,message:e})
    }
}
const createNotifications = async(req,res)=>{
    try{
        const {destination,content} = req.body;
        await Notification.create({destination,content});
        res.json({success:true,message:'notification created'});
    }catch(e){
        console.log(e);
        res.json({success:false,message:e})
    }
}

module.exports = {
    getNotifcations,
    createNotifications
}