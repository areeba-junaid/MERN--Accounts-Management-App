const express = require("express");
const router = express.Router();
const { createAccount, updateAccount} = require("../Controller/Account");
const { saveTransaction } = require("../Controller/Transaction");
const {saveAccounts}=require("../Controller/AccountInfo");

router.post("/create", createAccount);
router.post("/create",saveAccounts);
router.post("/update", updateAccount);
router.post("/update", saveTransaction);

module.exports = router;
