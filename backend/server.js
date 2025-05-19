const express=require("express");
const connectDB=require("./config/db");
require("dotenv").config();

const cors=require("cors");
const path=require("path");

const app=express();
//middlewares to handle cors
app.use(cors({
    origin:process.env.CLIENT_URL||"*",
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders:["Content-type","Authorization"]
}));

//middleware for data parsing
app.use(express.json());
connectDB();

const PORT=process.env.PORT||5000;

//server start kar denge
app.listen(PORT,()=>{
    console.log(`server started at PORT ${PORT}`);
});
