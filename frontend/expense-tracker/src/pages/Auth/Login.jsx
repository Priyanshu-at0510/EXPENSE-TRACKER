import React, { useState } from 'react'
import AuthLayout from "../../components/layouts/AuthLayout";
import {Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';


const Login=()=>{
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState(null);

  const navigate=useNavigate();
  
  //handle login form submit

  const handleLogin= async (e)=>{
      e.preventDefault();
      if(!validateEmail(email)){
        setError("Please provide a valid email address");
        return;
      }
      if(!password){
        setError("please enter the password");
        return;
      }
      setError("");
      //Login API calls
      try{
        console.log("Sending request to backend with :" ,email, password);
        const response=await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
          email,
          password,
        });
        console.log("response",response);
        const {token ,user}=response.data;
        if(token){
          localStorage.setItem("token",token);
           navigate("/dashboard");
        }
      }catch(error){
         if(error.response && error.response.data.message){
          setError(error.response.data.message);
         }else{
          setError("something went wrong .please try again later");
         }
      }
  }

  return(

    <AuthLayout>
      <form onSubmit={handleLogin} className='w-full max-w-md flex flex-col gap-4 justify-center'>
        <h3 className='text-xl font-semibold text-black'>Welcome back</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Please Enter your Details to Login</p>

        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email address"
          placeholder="john@example.com"
          type="text"
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          placeholder="Min 8 characters"
          type="password"
        />

        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

        <button type='submit' className="button-primary">
          LOGIN
        </button>

        <p className='text-[13px] text-slate-800 mt-3'>
          Don't have an account?{' '}
          <Link className="font-medium text-primary underline" to="/signUp">
            SignUp
          </Link>
        </p>
    </form>
</AuthLayout>

  );
}
export default Login;