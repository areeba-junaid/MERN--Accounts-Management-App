import axios from "axios";
import { useEffect, useState } from "react";
import "./income.css";

function Income() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/account-info/get")
      .then((res) => {
        console.log("res", res.data);
        setData(res.data);
      })
      .catch((err) => console.log("error from show Incomw"));
  }, []);
  console.log("data", data);

  const calculateNetIncome = () => {
    const revenueData = data.filter((item) => item.headNo === 5);
    const expenseData = data.filter((item) => item.headNo === 6);
    const revenueTotal = revenueData.reduce(
      (total, item) => total + item.sumCredit - item.sumDebit,
      0
    );
    const expenseTotal = expenseData.reduce(
      (total, item) => total + item.sumDebit - item.sumCredit,
      0
    );
    return revenueTotal - expenseTotal;
  };

  return (
    <>
      <div className="head-container">
        <h1>Income statement</h1>
      </div>
      <div className="table-container">
        <div className="table-column">
          <h2>Revenues</h2>
          <ul className="l1">
            {data.map(
              (item, index) =>
                item.headNo === 5 && (
                  <li className="list" key={index}>
                    {item.name} | {item.sumCredit - item.sumDebit}
                  </li>
                )
            )}
          </ul>
        </div>
        <div className="table-column">
          <h2>Expenses</h2>
          <ul className="l1">
            {data.map(
              (item, index) =>
                item.headNo === 6 && (
                  <li className="list" key={index}>
                    {item.name} | {item.sumDebit - item.sumCredit}
                  </li>
                )
            )}
          </ul>
        </div> 
      </div>
        <div className="total-column1">
          <h3>Net income: </h3>
          <p>Net Income: ${calculateNetIncome()}</p>
        </div>
      
    </>
  );
}

export default Income;
