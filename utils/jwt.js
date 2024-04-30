const jwt = require("jsonwebtoken");

const createToken =async (payload)=>{
    const token = jwt.sign({payload},process.env.JWT_SECRET,{expiresIn:'32h'});
    return token
}
module.exports ={
    createToken
}