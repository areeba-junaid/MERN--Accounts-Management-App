const mongoose = require("mongoose");

const accountInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    lowercase:true,
  },
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
  }
})

module.exports=mongoose.model('AccountInfo',accountInfoSchema);

