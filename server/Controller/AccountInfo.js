const mongoose=require("mongoose");
const { accountSchema } = require("../Models/Account_db");
const  AccountInfo  = require("../Models/AccountInfo_db");


const saveAccounts=async(req,res)=>{
   let reqData = req.body;
    const storeData = new AccountInfo({
        name: reqData.name,
        flag: reqData.flag,
        accountNumber: reqData.accountNumber
  });
  try {
    await storeData.save();
    console.log(storeData);
  } catch (e) {
    console.log(e.message);
  }
};


const getAccount=async(req,res)=>{
  let allAccounts
  try {
    allAccounts = await AccountInfo.find({flag:1});
    console.log(allAccounts);
  } catch (e) {
    console.log(e.message);
  }
  //let id=-1;
  let data =await Promise.all(allAccounts.map(async(item)=>{
     const account= await mongoose
    .model(item.name, accountSchema)
    .findOne({ accountNumber: item.accountNumber },{_id:0,__v: 0});
    console.log("hi",account); 
    return (account);
  }));
 
  res.send(data);
};

module.exports={saveAccounts,getAccount};