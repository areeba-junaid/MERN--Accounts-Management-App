import axios from "axios";
import Closebutton from "./Closebutton";
import { useContext,useEffect } from "react";
import { AccountContext } from "../Context/AccountContext";

function Form2() {
  const { account,info,setInfo} = useContext(AccountContext);
  
  function submitHandler  (e) {
    e.preventDefault();
     if(info.length===0)
     { alert("No Account Can't submit  ")
      return  
    };
   let dIndex=parseInt(e.target.debitAccount.value)
   let cIndex=parseInt(e.target.creditAccount.value)
     const body = {
     accountNameDebit: info[dIndex].name,
     accountNameCredit: info[cIndex].name,
     accNumDebit:info[dIndex].accountNumber,
     accNumCredit:info[cIndex].accountNumber,
     entry:parseInt (e.target.entry.value),
     amount :parseInt(e.target.amount.value),
    };
    if(body.accountNameCredit===body.accountNameDebit){
      alert("Transaction occurs in different account")
      return
    }
   
    axios
      .post("http://localhost:5000/api/accounts/update", body)
      .then((res)=>{
       console.log (res.data);
      })
      .catch((err) => console.log(err));
  };
 useEffect(() => {
    axios
    .get("http://localhost:5000/api/account-info/get").then((res)=>setInfo(res.data))
    .catch((err) => console.log(err));
    console.log("info",info);
  }, [account]);
  const buttonHandler=()=>{
     console.log("hello");
  }
  return (
    <div className="form-container">
      <div className="form-div">
        <div>
          <h1>Transfer Money</h1>
        </div>
        <form className="form" onSubmit= {submitHandler}>
          <div className="inputs">
            <label>Debit Account Title</label>
            <select name="debitAccount">

            {info.length!==0 ? info.map((item,index)=>{ return (<option  key={index} value={index}>{item.name}  ({item.accountNumber})</option>);
             } ):<option value="-1" disabled>No Account</option>};
            </select>
          </div>
          <div className="inputs">
            <label>Credit Account Title</label>
            <select name="creditAccount">
            {info.length!==0 ? info.map((item,index)=>{ return (<option  key={index} value={index}>{item.name}  ({item.accountNumber})</option>);
             } ):<option value="-1" disabled>No Account</option>};
            </select>
          </div>
          <div className="inputs">
            <label>Amount</label>
            <input name="amount" type="Number"  min="1" max="1000000000000" required />
          </div>
           <div>
                <input type="radio" defaultChecked id="normal" name="entry" value="0"/>
                 <label htmlFor="normal" > Normal</label><br/>
                 <input type="radio" id="adjusted" name="entry" value="1"/>
                 <label htmlFor="adjusted">  Adjusted</label><br/>
           </div>
           <input className="inputs" type="submit" />
           <Closebutton buttonHandler={buttonHandler}/>
        </form>
      </div>
    </div>
  );
}
export default Form2;