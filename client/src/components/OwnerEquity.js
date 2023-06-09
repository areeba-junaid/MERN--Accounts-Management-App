import React from 'react'
import axios from "axios";
import {useEffect,useState } from "react";

function OwnerEquity() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/account-info/get")
      .then((res) => {
        console.log("res", res.data);
        setData(res.data);
      })
      .catch((err) => console.log("error from show Income"));
  }, []);

  const calculateNetIncome = () => {
    const revenueData = data.filter(item => item.headNo === 5);
    const expenseData = data.filter(item => item.headNo === 6);
    const revenueTotal = revenueData.reduce((total, item) => total + item.sumCredit - item.sumDebit, 0);
    const expenseTotal = expenseData.reduce((total, item) => total + item.sumDebit - item.sumCredit, 0);
    return revenueTotal - expenseTotal;
  };

  const calculateOwnerCapital = () => {
    const ownerCapitalData = data.find(item => item.headNo === 3);
    if (ownerCapitalData) {
      return ownerCapitalData.sumCredit - ownerCapitalData.sumDebit ;
    }
    return null;
  };

  const calculateOwnerWithDrawal = () => {
    const ownerWithDrawalData = data.find(item => item.headNo === 4);
    if (ownerWithDrawalData) {
      return ownerWithDrawalData.sumDebit - ownerWithDrawalData.sumCredit ;
    }
    return null;
  };

  const calculateOwnerEquity = () => {
    const ownerCapitalTransactions = calculateOwnerCapital()
    const netIncomeTransactions = calculateNetIncome()
    const ownerWithdrawalTransactions = calculateOwnerWithDrawal()
    const ownerEquitybeg = ownerCapitalTransactions  + netIncomeTransactions ;
    const ownerEquity = ownerEquitybeg - ownerWithdrawalTransactions;
    return ownerEquity;
  };

  return (
    <>
    <div className='head-container'>
          <h1>Owner Equity Statement</h1>
        </div>  
        <div className='table-container'>
          <div className='table-data'>
          <h1>Beginning balance of owner capital: ${calculateOwnerCapital()}</h1>
          <h1>Net income: ${calculateNetIncome()}</h1>
          <h1>Owner withdrawal: (${calculateOwnerWithDrawal()})</h1>
          <div className="line"></div>
          <h1>Ending balance: {calculateOwnerEquity()}</h1>
          </div>
        </div>  
      </>   
  )
}

export default OwnerEquity