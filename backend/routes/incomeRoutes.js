const express=require("express");

const {
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcel
}=require("../controllers/incomeControllers");
const {protect}=require("../middlewares/authMiddleWares");
const router=express.Router();

router.post("/add",protect,addIncome);
router.get("/get",protect,getAllIncome);
router.get("/downloadExcel",protect,downloadIncomeExcel);
router.delete("/:id",protect,deleteIncome);

module.exports=router;


