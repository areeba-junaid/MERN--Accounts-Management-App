const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

const account_route = require("./Routes/Account"); //route
const transaction_route = require("./Routes/Transaction");
const port = process.env.PORT || 5000;

const connection = mongoose
  .connect("mongodb://127.0.0.1:27017/my_Accounts")
  .then(() => {
    console.log("connected");
  });

console.log(Date.now());

//use middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/accounts", account_route);
app.use("/api/transaction", transaction_route);

//Listening to our Servers
try {
  app.listen(port, () => console.log(`Server running on port ${port}`));
} catch (e) {
  console.log(e.message);
}
