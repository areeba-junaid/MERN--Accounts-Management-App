const express = require("express");
const router = express.Router();

const {getAccount}=require("../Controller/AccountInfo");

router.get("/get", getAccount);

module.exports = router;
