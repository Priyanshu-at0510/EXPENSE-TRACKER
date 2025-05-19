const User=require("../models/User")
const jwt=require("jsonwebtoken");

//generate the jwt token
const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"1h"});
}
//register the user || signup
exports.registerUser=async(req,res)=>{

}

//login the user
exports.loginUser=async(req,res)=>{
    
}

exports.getUserInfo=async (req,res)=>{

}