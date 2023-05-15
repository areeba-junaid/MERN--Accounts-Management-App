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
      .catch((err) => console.log("error from show Incomw"));
  }, []);
  console.log("data", data);
  return (
    <>
      <div className="head-container">
        <h1>Balance sheet</h1>
      </div>
      <div className="table-container">
        <div className="table-column">
          <h2>Assets</h2>
          <ul className="l1">
            <li>Current Assets</li>
          </ul>
        </div>
        <div className="table-column">
          <h2>Owner Equity/Liabilities</h2>
          <ul className="l1">
            <li>current equities</li>
            <li>current liabilities</li>
          </ul>
        </div>
      </div>
      <div className="total-container">
        <div className="total-column1">
          <h3>Total: </h3>
          <ul className="list">
            <li>$0.00</li>
          </ul>
        </div>
        <div className="total-column1">
          <h3>Total: </h3>
          <ul className="list">
            <li>$0.00</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Blancesheet;
