const mongoose = require("mongoose");
const Transaction = require("../Models/Transaction_db");

const saveTransaction = async (req, res) => {
  let reqData = req.body;
  const storeData = new Transaction({
    date: Date.now(),
    entry: reqData.entry, //normal 0 or adjusted 1
    debitAccountNo: reqData.accNumDebit,
    creditAccountNo: reqData.accNumCredit,
    debitAccountName: reqData.accountNameDebit,
    creditAccountName: reqData.accountNameCredit,
    amount: reqData.amount,
  });
  try {
    await storeData.save();
    console.log(storeData);
  } catch (e) {
    console.log(e.message);
  }
};

const getTransaction = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.send(transactions);
  } catch (e) {
    console.log(e.message);
  }
};
module.exports = { saveTransaction, getTransaction };
