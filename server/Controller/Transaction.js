const mongoose = require("mongoose");
const Transaction = require("../Models/Transaction_db");
const moment = require('moment');

const saveTransaction = async (req, res) => {
  let reqData = req.body;
  date=Date.now();
  const formattedDate = moment(date).format('DD/MM/YYYY, HH:mm:ss');
  const storeData = new Transaction({
    date: formattedDate,
    entry: reqData.entry, //normal 0 or adjusted 1
    debitAccountNo: reqData.accNumDebit,
    creditAccountNo: reqData.accNumCredit,
    debitAccountName: reqData.accountNameDebit,
    creditAccountName: reqData.accountNameCredit,
    amount: reqData.amount,
  });
  try {
    await storeData.save();
  } catch (e) {
    console.log(e.message);
  }
};

const getTransaction = async (req, res) => {
  try {
    const transactions = await Transaction.find({},{__v:0,_id:0});
    res.send(transactions);
  } catch (e) {
    console.log(e.message);
  }
};
module.exports = { saveTransaction, getTransaction };
