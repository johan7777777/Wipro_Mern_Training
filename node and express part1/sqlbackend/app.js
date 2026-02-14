const express = require("express");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(express.json());

// ✅ REST standard prefix
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

// Global Error Handler
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});