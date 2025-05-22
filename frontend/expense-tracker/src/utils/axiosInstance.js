import axios from "axios"

import {BASE_URL} from "./apiPaths"

const axiosInstance=axios.create({
    baseURL:BASE_URL,
    timeout:10000,
    headers:{
        "Content-Type":"application/json",
        Accept:"application/json"
    }
});

//request interceptor
axiosInstance.interceptors.request.use((config)=>{
    const accessToken=localStorage.getItem("token");
    if(accessToken){
        config.headers.Authorization=`Bearer ${accessToken}`
    }
    return config;
},
(error)=>{
    return Promise.reject(error);
}
); 

//Response Interceptor
 axiosInstance.interceptors.response.use(
    (response)=>{
        return response;
    },
    (error)=>{
        if(error.response && error.response.status === 401){
            // Token expired or unauthorized
            console.log("Token expired, logging out...");
            localStorage.removeItem("token"),
            //redirect to login  page
            window.location.href="/login";
        }
        else if(error.response && error.response.status === 500){
            //internal server error while communicating with backend
            console.log("internal server error,Please try again later");

        }
        else if(error.code === "ECONNABORTED"){
            console.error("Request timeout . please try again");
        }
        return Promise.reject(error);
    }
 );

 export default axiosInstance;