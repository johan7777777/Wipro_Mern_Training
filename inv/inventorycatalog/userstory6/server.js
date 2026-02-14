const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("./models/User");
const auth = require("./middleware/auth");
const authorize = require("./middleware/authorize");

const app = express();
app.use(express.json());


mongoose.connect("mongodb://127.0.0.1:27017/jwt_rbac")
  .then(() => console.log("DB Connected"));


app.get("/createuser", async (req, res) => {
  await User.deleteMany({});
  await User.create({
    username: "admin",
    password: await bcrypt.hash("123", 10),
    role: "admin"
  });
  await User.create({
    username: "user",
    password: await bcrypt.hash("123", 10),
    role: "user"
  });
  res.send("Users created");
});


app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(401).send("Invalid login");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).send("Invalid login");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    "jwt_secret_key",
    { expiresIn: "1h" }
  );

  res.json({ token });
});




app.get("/guestuser", auth, (req, res) => {
  res.json({
    message: "Profile accessed",
    user: req.user
  });
});


app.get("/admin", auth, authorize("admin"), (req, res) => {
  res.send("Welcome Admin");
});


app.get("/user", auth, authorize("user"), (req, res) => {
  res.send("Welcome User");
});

app.listen(3000, () => console.log("Server running on 3000"));

