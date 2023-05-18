import React from "react";
import "./balancesheet.css";
import axios from "axios";
import {useEffect,useState } from "react";

function Blancesheet() {
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
  console.log("data", data);

  const calculateTotalAssets = () => {
    const assetsData = data.filter(item => item.headNo === 1);
    const totalAssets = assetsData.reduce((total, item) => total + (item.sumCredit - item.sumDebit), 0);
    return totalAssets;
  };

  const calculateTotalLiabilities = () => {
    const liabilitiesData = data.filter(item => item.headNo === 2);
    const totalLiabilities = liabilitiesData.reduce((total, item) => total + (item.sumCredit - item.sumDebit), 0);
    return totalLiabilities;
  };

  const calculateNetIncome = () => {
    const revenueData = data.filter(item => item.headNo === 5);
    const expenseData = data.filter(item => item.headNo === 6);
    const revenueTotal = revenueData.reduce((total, item) => total + item.sumCredit - item.sumDebit, 0);
    const expenseTotal = expenseData.reduce((total, item) => total + item.sumCredit - item.sumDebit, 0);
    return revenueTotal - expenseTotal;
  };

  const calculateOwnerEquity = () => {
    const ownerCapitalTransactions = data.filter(
      data => data.headNo === 3
    );
    const netIncomeTransactions = calculateNetIncome()
    const ownerWithdrawalTransactions = data.filter(
      data => data.category === 4
    );
    const ownerCapitalTotal = ownerCapitalTransactions.reduce(
      (total, data) => total + data.sumCredit - data.sumDebit,
      0
    );
    const ownerWithdrawalTotal = ownerWithdrawalTransactions.reduce(
      (total, data) => total + data.sumCredit - data.sumDebit,
      0
    );
    const ownerEquity = ownerCapitalTotal + netIncomeTransactions - ownerWithdrawalTotal;
    return ownerEquity;
  };

  const calculateTotalLiabilitiesAndEquity = () => {
    const totalLiabilities = calculateTotalLiabilities();
    const ownerEquity = calculateOwnerEquity();
    if (totalLiabilities && ownerEquity) {
      return totalLiabilities + ownerEquity;
    }
    return null;
  };

  return (
    <>
      <div className="head-container">
        <h1>Balance sheet</h1>
      </div>
      <div className="table-container">
        <div className="table-column">
          <h2>Assets</h2>
          <ul className="l1">
          {data.map((item, index) => (
          item.headNo === 1 && (
            <li key={index}>
              {item.name}
            </li>
          )
        ))}
          </ul>
        </div>
        <div className="table-column">
          <h2>Owner Equity/Liabilities</h2>
          <ul className="l1">
          {data.map((item, index) => (
          item.headNo === 2 && (
            <li key={index}>
              {item.name}
            </li>
          )
          ))}
          <li>Owner equity</li>
          </ul>
        </div>
      </div>
      <div className="total-container">
        <div className="total-column1">
          <h3>Total: </h3>
          <ul className="list">
            <li>${calculateTotalAssets()}</li>
          </ul>
        </div>
        <div className="total-column1">
          <h3>Total: </h3>
          <ul className="list">
            <li>${calculateTotalLiabilitiesAndEquity()}</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Blancesheet;
