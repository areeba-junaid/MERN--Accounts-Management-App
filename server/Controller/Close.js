const mongoose = require("mongoose");
const AccountInfo = require("../Models/AccountInfo_db");
const { accountSchema } = require("../Models/Account_db");
const ID = require("nodejs-unique-numeric-id-generator");
const moment = require('moment');
async function createIncomeSummary(revenueTotal, expenseTotal) {
  const myaccount = mongoose.model('IncomeSummary', accountSchema);
  if (revenueTotal > expenseTotal) expenseTotal = revenueTotal;
  else revenueTotal = expenseTotal;
  date=Date.now();
  const formattedDate = moment(date).format('DD/MM/YYYY, HH:mm:ss');
  const store = new myaccount({
    date: formattedDate,
    name: 'IncomeSummary',
    flag: 0,
    accountNumber: ID.generate(new Date().toJSON()),
    headNo: 7,
    sumDebit: expenseTotal,
    sumCredit: revenueTotal,
  });
  await store.save();
}

async function calculateOC(owTotal, revenueTotal, expenseTotal) {
  let netIncome = revenueTotal - expenseTotal;
  const OC = await AccountInfo.findOne({ flag: 1, headNo: { $eq: 3 } });
  try {
    OC_account = await mongoose
      .model(OC.name, accountSchema)
      .findOne({ accountNumber: OC.accountNumber });
  } catch (e) {
    console.log(e.message);
  }
  console.log(OC_account.sumCredit)
  if (netIncome > 0) 
    OC_account.sumCredit = netIncome + OC_account.sumCredit;
  else if(netIncome<0)
    OC_account.sumDebit = Math.abs(netIncome) + OC_account.sumDebit;
  if (owTotal) 
     OC_account.sumDebit = owTotal + OC_account.sumDebit;
  await OC_account.save();
}

async function balancingAccounts() {
  // Balancing
  const allAccount = await AccountInfo.find({
    flag: 1,
    headNo: { $in: [4, 6, 5] },
  });

  await Promise.all(
    allAccount.map(async (item) => {
      try {
        const AccountModel = mongoose.model(item.name, accountSchema);
        const account = await AccountModel.findOne({
          accountNumber: item.accountNumber,
        });

        const result = account.sumCredit - account.sumDebit;
        if (result > 0) {
          account.sumDebit += result;
        } else {
          account.sumCredit += Math.abs(result);
        }

        account.flag = 0;
        item.flag = 0;

        await account.save();
        await item.save();
      } catch (error) {
        console.error("Error processing item:", item, error);
      }
    })
  );
}
const closeAccount = async (req, res) => {
  try {
    // Filtering Accounts
    const ownerWithdrawalData = await AccountInfo.find({
      flag: 1,
      headNo: { $eq: 4 },
    });
    const revenueData = await AccountInfo.find({ flag: 1, headNo: { $eq: 5 } });
    const expenseData = await AccountInfo.find({ flag: 1, headNo: { $eq: 6 } });
    console.log(ownerWithdrawalData, revenueData, expenseData);

    // Calculating Owner Withdrawal
    const owTotalPromise = Promise.all(
      ownerWithdrawalData.map(async (item) => {
        const OW = await mongoose
          .model(item.name, accountSchema)
          .findOne({ accountNumber: item.accountNumber });
        return  OW.sumDebit -OW.sumCredit;
      })
    );

    // Calculating Owner Revenue
    const revenueTotalPromise = Promise.all(
      revenueData.map(async (item) => {
        const Revenue = await mongoose
          .model(item.name, accountSchema)
          .findOne({ accountNumber: item.accountNumber });
        return Revenue.sumCredit - Revenue.sumDebit;
      })
    );

    // Calculating Expense
    const expenseTotalPromise = Promise.all(
      expenseData.map(async (item) => {
        const Expense = await mongoose
          .model(item.name, accountSchema)
          .findOne({ accountNumber: item.accountNumber });
        return Expense.sumDebit - Expense.sumCredit;
      })
    );

    // Resolving the promises and calculating the totals
    Promise.all([owTotalPromise, revenueTotalPromise, expenseTotalPromise])
      .then(([owTotal, revenueTotal, expenseTotal]) => {
        // Use the calculated totals here
        
        owTotal=owTotal.reduce((acc, val) => acc + val, 0)
        revenueTotal=revenueTotal.reduce((acc, val) => acc + val, 0)
        expenseTotal=expenseTotal.reduce((acc, val) => acc + val, 0)
        console.log(owTotal,revenueTotal,expenseTotal)
        createIncomeSummary(revenueTotal,expenseTotal);
        calculateOC(owTotal,revenueTotal,expenseTotal);
      })
      .catch((error) => {
        // Handle any errors that occurred during the asynchronous operations
        console.error("Error calculating totals:", error);
      });
    
    balancingAccounts()
    res.status(200).json({ message: "Accounts closed successfully" });
  } catch (error) {
    console.error("Error closing accounts:", error);
    res.status(500).json({ error: "An error occurred while closing accounts" });
  }
};

module.exports = { closeAccount };
