const express = require("express");
const router = express.Router();
const dashbordcontroller = require("../controllers/dashbordController");

// Route to get sales percentage by center
router.get("/sales/circle", dashbordcontroller.getcircle);
router.get("/sales/monhana", dashbordcontroller.getTotalPurchaseByMonth);
router.get("/sales/topproduct", dashbordcontroller.getTopProducts);

module.exports = router;
