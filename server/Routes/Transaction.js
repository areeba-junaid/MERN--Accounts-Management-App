const express = require("express");
const router = express.Router();
const { getTransaction } = require("../Controller/Transaction");

router.get("/get", getTransaction);

module.exports = router;
