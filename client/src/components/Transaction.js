import React from "react";
import "./transaction.css";
import axios from "axios";
import { useEffect, useState } from "react";

function Transaction() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/transaction/get")
      .then((res) => {
        console.log("res", res.data);
        setData(res.data);
      })
      .catch((err) => console.log("error from show Transaction"));
  }, []);
  return (
    <>
      <div className="head-container">
        <h1>Transaction/ General journal</h1>
      </div>
      <div className="transaction-container">
        <div className="transaction-table">
          <h3>Date</h3>
          <ul className="list1">
            {data.map((data, index) => (
              <li key={index}>{data.date}</li>
            ))}
          </ul>
        </div>
        <div className="transaction-table">
          <h3>Flag</h3>
          <ul className="list2">
          {data.map((data, index) => (
              <li key={index}>{data.entry === true ? 'Adjusted' : 'Normal'}</li>
            ))}
          </ul>
        </div>
        <div className="transaction-table">
          <h3>Debit Account</h3>
          <ul className="list3">
          {data.map((data, index) => (
              <li key={index}>{data.debitAccountName}</li>
            ))}
          </ul>
        </div>
        <div className="transaction-table">
          <h3>Credit Account</h3>
          <ul className="list4">
          {data.map((data, index) => (
              <li key={index}>{data.creditAccountName}</li>
            ))}
          </ul>
        </div>
        <div className="transaction-table">
          <h3>Amount</h3>
          <ul className="list5">
          {data.map((data, index) => (
              <li key={index}>{data.amount}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Transaction;
