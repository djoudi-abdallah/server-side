const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const clientRouter = require("./routes/client");
const produitRouter = require("./routes/Produit");
const fournniseurRouter = require("./routes/Fournniseur");
const centreRouter = require("./routes/Centre");
const employeRouter = require("./routes/Employe");

// Define routes and middleware here

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017", {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Use your routes in the Express app

app.use(express.json());

app.use("/", clientRouter); // Use the client routes
app.use("/", produitRouter); // Use the produit routes
app.use("/", fournniseurRouter); // Use the fournisseur routes
app.use("/", centreRouter); // Use the centre routes
app.use("/", employeRouter); // Use the enploye routes

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
