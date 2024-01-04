const mongoose = require("mongoose");

const CounterTransferSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const CounterTransfer = mongoose.model(
  "CounterTransfer",
  CounterTransferSchema
);
module.exports = CounterTransfer;
