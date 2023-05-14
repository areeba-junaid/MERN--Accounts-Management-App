import React from 'react'
import "./transaction.css"

function Transaction() {
  return (
    <>
    <div className='head-container'>
      <h1>Transaction/ General journal</h1>
    </div> 
    <div className='transaction-container'>
    <div className='transaction-table'>
      <h3>Date</h3>
      <ul className='list1'>
        <li>14/05/2023</li>
      </ul>
    </div>
      <div className="transaction-table">
        <h3>Debit</h3>
        <ul className = "list2">
          <li>debit account</li>
        </ul>
      </div>
      <div className="transaction-table">
        <h3>Credit</h3>
        <ul className = "list3">
          <li>credit account</li>
        </ul>
      </div>
      <div className="transaction-table">
        <h3>Amount</h3>
        <ul className = "list4">
          <li>$0.00</li>
        </ul>
      </div>
      </div> 
    </>
  )
}

export default Transaction