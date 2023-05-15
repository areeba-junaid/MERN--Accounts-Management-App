const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors=require("cors");
const app = express();

const account_route = require("./Routes/Account"); //route
const transaction_route = require("./Routes/Transaction");
const accounts_route=require("./Routes/AccountInfo")
const port = process.env.PORT || 5000;

connection=mongoose.connect("mongodb://127.0.0.1:27017/myAccount").then(() => {
    console.log("connected");
  })


;//use middleware
app.use(cors({origin:true,credentials:false}));
app.use(express.json({ extended: true }));
app.use("/api/accounts", account_route);
app.use("/api/transaction", transaction_route);
app.use("/api/account-info", accounts_route);

//Listening to our Servers
try {
  app.listen(port, () => console.log(`Server running on port ${port}`));
} catch (e) {
  console.log(e.message);
}
