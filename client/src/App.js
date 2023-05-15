import "./App.css";
import Form from "./components/Form.js"
import Header from "./components/Header.js"
import NotFound from "./components/NotFound.js"
import Transaction from "./components/Transaction.js"
import Income from "./components/Income.js"
import OwnerEquity from "./components/OwnerEquity.js"
import Balancesheet from "./components/Blancesheet.js"
import Cashflow from "./components/Cashflow.js"
import { AccountContext } from "./Context/AccountContext";

import {Route,Routes} from "react-router-dom"
import { useState } from "react";

function App() {
  const[account,setAccount]=useState();
  const[info,setInfo]=useState([]);
  return (
    <div className="App">
       <Header/>
      <AccountContext.Provider value={{account,setAccount,info ,setInfo}}> 
      <Routes>
       <Route path="/" element={ <Form/>}></Route>
        <Route path="/transaction" element={ <Transaction/>}></Route>
        <Route path="/income" element={ <Income/>}></Route>
        <Route path="/owner-equity" element={ <OwnerEquity/>}></Route>
        <Route path="/balance-sheet" element={ <Balancesheet/>}></Route>
        <Route path="/cash-flow" element={ <Cashflow/>}></Route>
         <Route path="*" element={<NotFound/>}></Route>       
      </Routes> 
      </AccountContext.Provider > 
    </div>
  
  );
}

export default App;
