const express = require("express");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 3001;
const clientRouter = require("./routes/client");
const produitRouter = require("./routes/Produit");
const fournniseurRouter = require("./routes/Fournisseur");
const centreRouter = require("./routes/Centre");
const employeRouter = require("./routes/Employe");
const achatsRouter = require("./routes/Achats");
const transferRouter = require("./routes/Transfer");
const reglementRouter = require("./routes/Reglementfournisseur");
const venteRouter = require("./routes/Vente");
const paiementCreditRouter = require("./routes/paiementCredite");
const produitstockRouter = require("./routes/produitStock");
const pvRouter = require("./routes/pvSale");
const absenceRouter = require("./routes/Absence");
const masroufRouter = require("./routes/Masrouf");
const monthlysalaryRouter = require("./routes/MonthlySalaries");
const activitysummaryRouter = require("./routes/ActivitySummary");

const mongoose = require("mongoose");
const corsOptions = {
  origin: "http://localhost:3000", // replace with the domain you want to allow
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

mongoose
  .connect("mongodb://localhost:27017", {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use(express.json());

app.use("/", clientRouter); // Use the client routes
app.use("/", produitRouter); // Use the produit routes
app.use("/", fournniseurRouter); // Use the fournisseur routes
app.use("/", centreRouter); // Use the centre routes
app.use("/", employeRouter); // Use the enploye routes
app.use("/", achatsRouter); // USe the achats routes
app.use("/", transferRouter); // USe the transfer routes
app.use("/", reglementRouter); // USe the reglement routes
app.use("/", venteRouter); // USe the vente routes
app.use("/", paiementCreditRouter); // USe the paiementcredite routes
app.use("/", produitstockRouter); // USe the produit stock routes
app.use("/", pvRouter); // USe the pv routes
app.use("/", absenceRouter); // USe the absence routes
app.use("/", masroufRouter); // USe the absence routes
app.use("/", monthlysalaryRouter); // USe the monthly salary routes
app.use("/", activitysummaryRouter); // USe the activity summary routes

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

