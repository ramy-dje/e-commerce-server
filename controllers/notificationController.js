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
        const {destination,content,sender} = req.body;
        await Notification.create({destination,content,sender});
        res.json({success:true,message:'notification created'});
    }catch(e){
        console.log(e);
        res.json({success:false,message:e})
    }
}
const sendNotification = async(destination,content,sender)=>{
    try{
        await Notification.create({destination,content,sender});
        console.log('notification sended')
    }catch(e){
        console.log(e);

    }
}
module.exports = {
    getNotifcations,
    createNotifications,
    sendNotification
}