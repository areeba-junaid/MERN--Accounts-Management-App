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
      .catch((err) => console.log("error from show Incomw"));
  }, []);
  return (
    <>
    <div className='head-container'>
          <h1>Owner Equity</h1>
        </div>  
        <div className='table-container'>
        <div className='table-column'>
          <h2>Debit</h2>
          <ul className='l1'>
            <li>Debit Accounts</li>
          </ul>
        </div>
        <div className='table-column'>
          <h2>Credit</h2>
          <ul className='l1'>
            <li>Credit Accounts</li>
          </ul>
        </div>
      </div> 
      <div className='total-container'>
          <div className='total-column1'>
            <h3>Total: </h3>
            <ul className='list'>
              <li>$0.00</li>
            </ul>
          </div>
          <div className='total-column1'>
            <h3>Total: </h3>
            <ul className='list'>
              <li>$0.00</li>
            </ul>
          </div>
        </div>  
      </>   
  )
}

export default OwnerEquity