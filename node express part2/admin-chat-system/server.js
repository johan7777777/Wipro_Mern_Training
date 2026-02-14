const express = require("express");
const path = require("path");
const multer = require("multer");

const auth = require("./middleware/auth");
const rateLimiter = require("./middleware/rateLimiter");

const app = express();
app.use(express.json());

// static files
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

// file upload config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "application/pdf"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  }
});

// in-memory messages
let messages = [];

// Admin sends messag 
app.post(
  "/send",
  auth.isAdmin,
  rateLimiter,
  upload.single("file"),
  (req, res) => {
    const message = {
      text: req.body.message,
      file: req.file ? req.file.filename : null
    };
    messages.push(message);
    res.json({ success: true, message: "Message sent" });
  }
);

// Users receive messages
app.get("/messages", auth.isUser, (req, res) => {
  res.json(messages);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});