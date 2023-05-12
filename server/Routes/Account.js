const express = require("express");
const router = express.Router();
const { createAccount, updateAccount } = require("../Controller/Account");
const { saveTransaction } = require("../Controller/Transaction");

router.post("/create", createAccount);

router.post("/update", updateAccount);
router.post("/update", saveTransaction);

module.exports = router;
