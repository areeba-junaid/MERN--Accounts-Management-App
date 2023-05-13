import "./App.css";
import Form from "./components/Form.js"
import Header from "./components/Header.js"
import NotFound from "./components/NotFound.js"
import Transaction from "./components/Transaction.js"
import Income from "./components/Income.js"
import OwnerEquity from "./components/OwnerEquity.js"
import Balancesheet from "./components/Blancesheet.js"
import Cashflow from "./components/Cashflow.js"

import {Route,Routes} from "react-router-dom"

function App() {
  return (
    <div className="App">
       <Header/>
      <Routes>
        <Route path="/" element={ <Form/>}></Route>
        <Route path="/transaction" element={ <Transaction/>}></Route>
        <Route path="/income" element={ <Income/>}></Route>
        <Route path="/owner-equity" element={ <OwnerEquity/>}></Route>
        <Route path="/balance-sheet" element={ <Balancesheet/>}></Route>
        <Route path="/cash-flow" element={ <Cashflow/>}></Route>
        <Route path="*" element={<NotFound/>}></Route>
      </Routes> 
    </div>
  
  );
}

export default App;
