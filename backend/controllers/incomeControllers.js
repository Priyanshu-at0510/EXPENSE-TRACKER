const xlsx=require("xlsx");
const Income=require("../models/Income");
//add income source
exports.addIncome=async (req,res)=>{
   try {
    const userId=req.user.id;
    const {icon ,source,amount,date}=req.body;
    //validation->check for missing fields
    if(!date || !source || !amount){
      return res.status(400).json({
        success:false,
        message:"All fields are required"
      });
    }
    //make the new income object
    const newIncome=new Income({
        userId,
        icon,
        source,
        amount,
        date:new Date(date)
    });

    //save this new income
    await newIncome.save();
    res.status(200).json(newIncome);

   } catch (error) {
    return res.status(500).json({
        success:false,
        message:"Internal server error while adding the new Income "
    })
   }
}
//get All Income  source
exports.getAllIncome=async (req,res)=>{
   try {
    const userId=req.user.id;
    const income=await Income.find({userId}).sort({date:-1});
    res.json(income);
   } catch (error) {
    return res.status(500).json({
        success:false,
        message:"Internal server error while getting all the Incomes ",
        error:error.message
    });
   }
} 
//deleteIncome  
exports.deleteIncome=async (req,res)=>{
  try {
    await Income.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success:true,
        message:"Income deleted successfully"
    });

  } catch (error) {
    return res.status(500).json({
        success:false,
        message:"Internal sever Error while deleting a Income"
    })
  }
}

//downloadIncomeExcel  
exports.downloadIncomeExcel=async (req,res)=>{
    try {
        const userId=req.user.id;
        const income=await Income.find({userId}).sort({date:-1});

        //prepare the data for excel
        const data=income.map((item)=>({
            Source:item.source,
            Amount:item.amount,
            Date:item.date
        }));

        const wb=xlsx.utils.book_new();
        const ws=xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb,ws,"income");
        xlsx.writeFile(wb,"income_details.xlsx");
        res.download("income_details.xlsx");

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error while downloading the excel sheet of income",
            error:error.message
        })
    }
  
};



