//Imports
const mongoose = require("mongoose");
const { accountSchema } = require("../Models/Account_db");
const ID = require("nodejs-unique-numeric-id-generator")

//Function for  account create route


const createAccount = async (req, res,next) => {
  let reqData = req.body;
  //T-account Name
  const collectionName = reqData.name;
  //create model
  const myaccount = mongoose.model(collectionName, accountSchema);
  //save data
  const store = new myaccount({
    name: reqData.name,
    flag: reqData.flag,
    accountNumber: ID.generate(new Date().toJSON()),
    headNo: reqData.headNo,
    sumDebit: 0,
    sumCredit: 0,
  });
  await store.save();
  reqData.accountNumber=store.accountNumber;
  res.json(reqData);
  next();
};


//Function for account update
const updateAccount = async (req, res, next) => {
  let reqData = req.body;
  let accountName = req.body.accountNameDebit;
  console.log(accountName);
  let T_account_credit;
  let T_account_debit;

  //getting debit account.

  try {
    T_account_debit = await mongoose
      .model(accountName, accountSchema)
      .findOne({ accountNumber: reqData.accNumDebit });
    console.log(T_account_debit);
  } catch (e) {
    console.log(e.message);
  }

  accountName = reqData.accountNameCredit;

  //getting credit account
  try {
    T_account_credit = await mongoose
      .model(accountName, accountSchema)
      .findOne({ accountNumber: reqData.accNumCredit });
    console.log(T_account_credit);
  } catch (e) {
    console.log(e.message);
  }

  // updating debit account
  if (T_account_credit && T_account_debit) {
    T_account_debit.sumDebit = T_account_debit.sumDebit + reqData.amount;
    T_account_credit.sumCredit = T_account_credit.sumCredit + reqData.amount;
    try {
      await T_account_debit.save();
      await T_account_credit.save();
      console.log("saved");
    } catch (e) {
      console.log(e.message);
    }
    res.send({  T_account_credit , T_account_debit});
    next();
  } else {
    console.log("account doesn't exist");
  }
};

module.exports={createAccount,updateAccount}



