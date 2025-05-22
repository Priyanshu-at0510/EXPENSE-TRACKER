import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage=async (imageFile)=>{
    const formData=new FormData();
    //append image file to form data
    formData.append('image',imageFile);
    try {
        const response=axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE,{
            headers:{
               'Content-Type':'multipart/form-data',//set header for file upload
            },
        });
        return response.data; //resturn response data

    }catch(error){
        console.error('Error uploading the image',error);
        throw error;
    }

};

export default uploadImage;