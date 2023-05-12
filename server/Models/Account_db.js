const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  flag: {
    type: Boolean,
    required: true,
  },
  accountNumber: {
    type: Number,
    required: true,
  },
  headNo: {
    type: Number,
    required: true,
  },
  //debit:[Number],
  //credit:[Number],
  sumDebit: {
    type: Number,
    required: true,
    min: 0,
  },
  sumCredit: {
    type: Number,
    required: true,
    min: 0,
  },
});

module.exports = { accountSchema };
