const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const validateOrder = require("../middleware/validateOrder");
router.post("/place", validateOrder, orderController.placeOrder);
router.get("/", orderController.getAllOrders);
module.exports = router;
