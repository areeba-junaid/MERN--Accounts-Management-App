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
      .catch((err) => console.log("error from show Transactio"));
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
            <li>14/05/2023</li>
          </ul>
        </div>
        <div className="transaction-table">
          <h3>Debit</h3>
          <ul className="list2">
            <li>debit account</li>
          </ul>
        </div>
        <div className="transaction-table">
          <h3>Credit</h3>
          <ul className="list3">
            <li>credit account</li>
          </ul>
        </div>
        <div className="transaction-table">
          <h3>Amount</h3>
          <ul className="list4">
            <li>$0.00</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Transaction;
