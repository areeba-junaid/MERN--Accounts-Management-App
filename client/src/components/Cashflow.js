import axios from "axios";
import {useEffect,useState } from "react";
function Cashflow() {
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
    <div>Cash-Flow</div>
  )
}

export default Cashflow