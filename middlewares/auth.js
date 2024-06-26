const jwt = require('jsonwebtoken');

const isAuthentificated = async (req,res,next) =>{
    try{
        let token = req.headers.authorization;
        //const token = req.cookies.token;
        let decodedData ;
        if(token){
            decodedData = jwt.verify(token,process.env.JWT_SECRET);
            if(decodedData.exp*1000 > Date.now()){
                req.user = decodedData.payload ;
                console.log(decodedData.payload)
                next();
            }else{
                res.clearCookie("token");
                return res.json({success:false ,message:"token expired"});
            }
            

        }else{
            return res.json({success:false ,message:"no authentificated"});
        }

    }catch(error){
        console.log(error)
    }
}
 
const authorizedRoles = (...roles)=>{
    return (req,res,next)=>{
       
        if(roles.includes(req.user.role)){
            next();
        }
        return res.json({success:false ,message:"you are not authorized"})
        
    }
}


module.exports={
    authorizedRoles,
    isAuthentificated
}