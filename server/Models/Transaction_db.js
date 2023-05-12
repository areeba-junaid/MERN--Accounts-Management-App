//For Journal General
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  date: { type: String, default: Date },
  entry: { type: Boolean, required: true }, //normal 0 or adjusted 1
  debitAccountNo: { type: Number, required: true },
  creditAccountNo: { type: Number, required: true },
  debitAccountName: { type: String, required: true },
  creditAccountName: { type: String, required: true },
  amount: { type: Number, required: true },
});

module.exports = mongoose.model("Transaction", transactionSchema);
