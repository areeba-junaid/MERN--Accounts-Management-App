import axios from "axios";
import { useContext } from "react";
import { AccountContext } from "../Context/AccountContext";

function Form1() {
  const { setAccount,info } = useContext(AccountContext);
  
  const submitHandler = (event) => {
    event.preventDefault();
    let head = parseInt(event.target.head.value);
    let name = event.target.name.value;
    if (name===null)
    {
      return;
    }
    name=name.toLowerCase();
    name = name.replace(/\s+/g, '');
    if(info.length>0){
        for(let i=0;i<info.length;i++)
        {
          if(info[i].name===name)
          {
            alert("can't have duplicate names");
            return;
          }
          if(info[i].headNo===3 && head===3)
          {
            alert("Owner Equity Account Already Exist");
            return;
          }
          if(info[i].headNo===4 && head===4)
          {
            console.log(info[i].head, head);
            alert("Owner Withrawal Account Already Exist");
            return;
          }
        }
    }
   
    const body = {
      name: name,
      flag: 1,
      accountNumber: 100,
      headNo: head,
      sumDebit: 0,
      sumCredit: 0,
    };
    axios
      .post("http://localhost:5000/api/accounts/create", body)
      .then((res) => {
        setAccount(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="form-container">
      <div className="form-div">
        <div>
          <h1>Account Info</h1>
        </div>
        <form className="form" onSubmit={submitHandler}>
          <div className="inputs">
            <label>Account Title</label>
            <input
              name="name"
              type="text"
              minLength="2"
              maxLength="30"
              required
            />
          </div>
          <div className="inputs">
            <label>Account Type</label>
            <select name="head">
              <option value="1">Assets</option>
              <option value="2">Liability</option>
              <option value="3">Owner Capital</option>
              <option value="4"> Owner Withdrawal</option>
              <option value="5">Revenue</option>
              <option value="6">Expenses</option>
            </select>
          </div>
          <input className="inputs" type="submit" />
        </form>
      </div>
    </div>
  );
}

export default Form1;
