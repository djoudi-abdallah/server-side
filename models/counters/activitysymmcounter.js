const mongoose = require("mongoose");

const CounterActivitySchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const CounterActivity = mongoose.model(
  "CounterActivity",
  CounterActivitySchema
);
module.exports = CounterActivity;
