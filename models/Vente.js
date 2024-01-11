const mongoose = require("mongoose");
const Product = require("./Produit");
const CounterVente = require("./counters/ventecounter");

const VentesSchema = new mongoose.Schema({
  code: {
    type: Number,
    unique: true,
    index: true,
  },
  centre:{
    type:Number,
    ref:"Centre",
    required:[true,"Le centre est obligatoire"]
  },
  dateVente: {
    type: Date,
    default: Date.now,
  },
  client: {
    type: Number,
    ref: "Client",
    required: true,
  },
  produit: {
    type: Number,
    ref: "Produit",
    required: true,
  },
  quantite: {
    type: Number,
    required: true,
  },
  prixUnitaire: {
    type: Number,
    required: true,
  },
  montantTotal: {
    type: Number,
    required: true,
  },
  montantEncaisse: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["Entièrement payé", "Partiellement payé", "Non payé"],
    default: "Non payé",
  },
});

VentesSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counterDoc = await CounterVente.findByIdAndUpdate(
        { _id: "code" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.code = counterDoc.seq;
    } catch (err) {
      return next(err);
    }
    try {
      const product = await Product.findOne({ code: this.produit });
      if (product) {
        this.prixUnitaire = product.price; // Set unit price from the product
        this.montantTotal = this.quantite * this.prixUnitaire; // Calculate total sale amount
      } else {
        next(new Error("Product not found"));
      }
      next();
    } catch (error) {
      next(error);
    }
  }
});

const Ventes = mongoose.model("Ventes", VentesSchema);

module.exports = Ventes;
