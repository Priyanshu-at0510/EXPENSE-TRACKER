const User=require("../models/User")
const jwt=require("jsonwebtoken");

//generate the jwt token
const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"1h"});
}
//register the user || signup
exports.registerUser=async(req,res)=>{
  const {fullName,email,password,profileImageUrl}=req.body;

  //validation:all field is present or not
  if(!fullName || !email || !password ){
    return res.status(400).json({
        success:false,
        message:"All field is required"
    });
    //check if user is already exists
    try{
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"This email address is already registered"
            })
        }
        //create the user
        const user= await User.create({
            fullName,
            email,
            password,
            profileImageUrl
        });

        res.status(200).json({
            id:user._id,
            user,
            token:generateToken(user._id),
        });

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Some internal server error occur during registering the User",
            error:error.message
        })
    }
  }
};

//login the user
exports.loginUser=async(req,res)=>{
    
}

exports.getUserInfo=async (req,res)=>{

}