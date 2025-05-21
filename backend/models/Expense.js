const mongoose=require("mongoose");
const User=require("./User");
const ExpenseSchema=new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        icon:{
            type:String,
        },
        category:{
            type:String,
            required:true //example->food ,Rent ,Groceries
        },
        amount:{
            type:Number,
            required:true,
        },
        date:{
            type:Date,
            default:Date.now()
        }

    }
);

module.exports=mongoose.model("Expense",ExpenseSchema);