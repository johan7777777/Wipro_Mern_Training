const express = require("express");
const rateLimit = require("express-rate-limit");

const app = express();

// Rate Limiter
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100,
  message: "Too many requests, please try again later."
});

app.use(limiter);

app.get("/api/courses", (req, res) => {
  res.send("Here is your data display!");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
