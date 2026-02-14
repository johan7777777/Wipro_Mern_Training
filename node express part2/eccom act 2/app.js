require("dotenv").config({ quiet: true });
const express = require("express");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
app.use(express.json());

// Routes
app.use("/api/orders", orderRoutes);

// Global error handler - prevents server crash
app.use((err, req, res, next) => {
  res.status(500).json({
    error: "Internal Server Error"
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
});

module.exports = app;
