const AccountInfo = require("../Models/AccountInfo_db");

const closeAccount = async (req, res) => {
  res.send("hello world");
  let allAccounts;
  /*try {
    OW = await AccountInfo.find({ flag: 1,head:{$eq:4}});
    Revenue = await AccountInfo.find({ flag: 1,head:{$eq:5}});
    Expenses = await AccountInfo.find({ flag: 1,head:{$eq:5}});

    console.log(allAccounts);
  } catch (e) {
    console.log(e.message);
  }*/
};


module.exports = { closeAccount };
