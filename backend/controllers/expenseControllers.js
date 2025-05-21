const Expense=require("../models/Expense");
const xlsx=require("xlsx");

//add expense source
exports.addExpense=async(req,res)=>{
    try {
        //fectch all the values
        const userId=req.user.id;
        const {icon,category,amount,date}=req.body;
        //validate all the field
        if(!category || !amount || !date){
            return res.status(400).json({
                success:false,
                message:"All fiels are required"
            });
        }

        const newExpense=new Expense({
            userId,
            icon,
            category,
            amount,
            date:Date(date)
        });
        await newExpense.save();
        res.status(200).json({
            success:true,
            message:"new Expense is added successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error while adding the new expense"
        });
    }
};
// get all expense source
exports.getAllExpense=async (req,res)=>{
    try {
        const userId=req.user.id;
        const expense=await Expense.find({userId}).sort({date:-1});
        res.json(expense);
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error while getting all the expense"
        });
    }
};
//delete the expense source
exports.deleteExpense=async (req,res)=>{
    try {
        const userId=req.user.id;
        await Expense.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success:true,
            message:"Expense deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error while deleting the expense"
        });
    }
};

//download the Excel of expenses
exports.downloadExpenseExcel=async (req,res)=>{
    try {
        const userId=req.user.id;
        const expense=await Expense.find({userId}).sort({date:-1});

        //prepare the data for excel
        const data=expense.map((item)=>({
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
            message:"Internal server error while deleting the expense"
        });
    }
};

