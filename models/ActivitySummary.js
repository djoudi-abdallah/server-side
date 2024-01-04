const mongoose = require("mongoose");
const CounterActivity = require("./counters/activitysymmcounter");

const ActivitySummarySchema = new mongoose.Schema({
  code: { type: Number, unique: true, index: true },
  centerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Center", // Create Center model similarly
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  salesAmount: {
    type: Number,
    required: true,
  },
  transfersAmount: {
    type: Number,
    required: true,
  },
  profit: {
    type: Number,
    required: true,
  },
});

ActivitySummarySchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await CounterActivity.findByIdAndUpdate(
      { _id: "code" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.code = counter.seq;
    next();
  } else {
    next();
  }
});
const ActivitySummary = mongoose.model(
  "ActivitySummary",
  ActivitySummarySchema
);

module.exports = ActivitySummary;
