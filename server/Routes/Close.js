const express = require("express");
const router = express.Router();
const {closeAccount} = require("../Controller/Close");


router.get("/complete", closeAccount);

module.exports = router;
