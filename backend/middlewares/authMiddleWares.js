const jwt=require("jsonwebtoken");
const User=require("../models/User");

exports.protect=async (req,res,next)=>{
    try {
        let token=req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(401).json({
                message:"Not authorized ,no token"
            })
        }; 
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        req.user=await User.findById(decode.id).select('-password');
        next();
    } catch (error) {
        return res.status(401).json({
            status:false,
            message:"Not Authoriazed token failed"
        });
    }
    
}