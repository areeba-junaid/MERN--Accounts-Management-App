import axios from "axios";
import {useEffect,useState } from "react";
import "./income.css";

function Income() {
  const [data,setData]=useState([]);
 useEffect(() => {
    axios
    .get("http://localhost:5000/api/account-info/get").then((res)=>
    {  console.log("res",res.data);
       setData(res.data);
    })
    .catch((err) => console.log("error from show Incomw"));
  }, []);
  console.log("data", data);
  return (
    <>
    <div className='head-container'>
          <h1>Income statement</h1>
        </div>  
        <div className='table-container'>
        <div className='table-column'>
          <h2>Revenues</h2>
          <ul className='l1'>
            <li>All revenues</li>
          </ul>
        </div>
        <div className='table-column'>
          <h2>Expenses</h2>
          <ul className='l1'>
            <li>All expenses</li>
          </ul>
        </div>
      </div> 
      <div className='total-container'>
          <div className='total-column1'>
            <h3>Net income: </h3>
            <ul className='list'>
              <li>$0.00</li>
            </ul>
          </div>
        </div>  
      </>   
  )
}

export default Income