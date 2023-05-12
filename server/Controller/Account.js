//Imports
const mongoose = require("mongoose");
const { accountSchema } = require("../Models/Account_db");

//Function for  account create route
const createAccount = async (req, res) => {
  let reqData = req.body;
  console.log(reqData);
  //T-account Name
  const collectionName = reqData.accountName;
  //create model
  const myaccount = mongoose.model(collectionName, accountSchema);
  const storeData = new myaccount({
    flag: reqData.flag,
    accountNumber: reqData.accountNumber,
    headNo: reqData.headNo,
    debit: [],
    credit: [],
    sumDebit: reqData.sumDebit,
    sumCredit: reqData.sumCredit,
  });
  await storeData.save();
  res.send(storeData);
};

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
    res.send({ credit: T_account_credit, debit: T_account_debit });
    next();
  } else {
    console.log("account doesn't exist");
  }
};

module.exports = { createAccount, updateAccount };
