import React from "react";
const COLORS=["#875CF5","#FA2C37","#FF6900"];
import CustomPieChart from "../Charts/CustomPieChart";
const FinanceOverview=({totalBalance,totalIncome,totalExpenses})=>{

    const balanceData= [
        {name:"total Balance",amount:totalBalance},
        {name:"total Expense",amount:totalIncome},
        {name:"total Income",amount:totalExpenses},
    ];

      
    console.log("entering into the Financial Overfiew File")

    return(
        <div className="card">
            <div className=" flex items-center justify-between ">
                <h5 className="text-lg">Financial Overview</h5>
            </div>
            <CustomPieChart
            data={balanceData}
            label="Total Balance"
            totalAmount={`${totalBalance}`}
            colors={COLORS}
            showTextAnchor
            />
        </div>
    )
}

export default FinanceOverview;