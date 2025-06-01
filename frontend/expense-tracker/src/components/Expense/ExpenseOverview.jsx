import React from "react";
import { useState,useEffect } from "react";
import { LuPlus } from "react-icons/lu";
import CustomLineChart from "../Charts/CustomLineChart";
import { prepareExpenseLineChartData } from "../../utils/helper";
const ExpenseOverview=({transactions,onAddExpense})=>{
    const [chartData,setChartData]=useState([]);
    
    useEffect(()=>{
        const result=prepareExpenseLineChartData(transactions);
        setChartData(result);
        return ()=>{};
    },[transactions]);

    return (
       <div className="card">
            <div className="flex items-center justify-between">
               <div className="">
                <h5 className="text-lg">Expense Overview</h5>
                <p className="text-sm text-gray-400 mt-0.5">Track your spending over Time and gain insights where your money goes</p>
               </div>
               <button
                className="add-btn"
                onClick={onAddExpense}>
                    <LuPlus className="text-lg"/>
                    Add Expense
                </button>
            </div>
            <div className="mt-10">
                <CustomLineChart data={chartData}/>
            </div>

        </div>
    )
}

export default ExpenseOverview;