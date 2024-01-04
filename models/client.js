const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  code: { type: Number, unique: true, index: true },
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  adresse: { type: String, required: true },
  telephone: { type: String, required: true },
  credit: { type: Number, default: 0 },
});

clientSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counterDoc = await CounterClient.findByIdAndUpdate(
        { _id: "code" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.code = counterDoc.seq;
      next();
    } catch (err) {
      return next(err);
    }
  } else {
    next();
  }
});
const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
