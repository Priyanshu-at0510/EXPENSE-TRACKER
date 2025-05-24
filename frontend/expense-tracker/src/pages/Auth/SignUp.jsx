import React, { useContext, useState } from 'react'
import AuthLayout from "../../components/layouts/AuthLayout";
import {Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import {ProfilePhotoSelector} from "../../components/Inputs/ProfilePhotoSelector"
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext';
const SignUp=()=>{
  const [profilePic,setProfilePic]=useState("");
  const [fullName,setFullName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const {updateUser}=useContext(UserContext);

  const [error,setError]=useState(null);
  const navigate=useNavigate();

  //handle signUp form submit
  const handleSignUp=async (e)=>{
    e.preventDefault();

    let profileImageUrl="";

    if(!fullName){
      setError("Please enter your full name");
      return;
    }
    if(!validateEmail(email)){
      setError("Please provide a valid email address");
      return;
    }
    if(!password){
      setError("please enter the password");
      return;
    }
    setError("");
    //api call for signUp

    try{

      //upload image if present
      if(profilePic){
        const imgUploadRes=await uploadImage(profilePic);
        profileImageUrl=imgUploadRes.imageUrl || "";

      }
      const response=await axiosInstance.post(API_PATHS.AUTH.REGISTER,formData,{
        fullName,
        email,
        password,
        profileImageUrl,
      });
      const {token,user}=response.data;
      if(token){
        localStorage.setItem("token",token);
        updateUser(user);
        navigate("/dashboard");
      }
    }catch(error){
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      }else{
        setError("something went wrong ,please try again");
      }
    }
  };
  return(
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10  md:mt-0 flex flex-col justify-center '>
        <h3 className='text-xs font-semibold text-black'>Create your Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Join Us today by enering your details below</p>
        
        <form onSubmit={handleSignUp}>
          
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className='grid grid-cols-1 gap-4'>
            <Input
            value={fullName}
            onChange={(e)=>setFullName(e.target.value)}
            label="Full Name"
            placeholder="Mike"
            type="text"
            />
            <Input
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            label="Email address"
            placeholder="mike@exapmle.com"
            type="email"
            />
        
            <div className='col-span-2'>
               <Input
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                label="Password"
                placeholder="Min 8 characters"
                type="password"
                />
            </div>
            
          </div> 
          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
          
                <button type='submit' className="button-primary">
                  Sign UP
                </button>
                <p className='text-[13px] text-slate-800 mt-3'>
                   Already have an account?{""}
                 <Link className="font-medium text-primary underline" to="/login">
                 Login
                 </Link>
                </p>

        </form>

      </div>
    </AuthLayout>
  );
}
export default SignUp;