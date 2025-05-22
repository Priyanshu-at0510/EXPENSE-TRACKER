const express=require("express");
const {protect}=require("../middlewares/authMiddleWares");

const {getDashboardData}=require("../controllers/dashboardControllers");
const router=express.Router();

router.get("/",protect,getDashboardData);

module.exports=router;

