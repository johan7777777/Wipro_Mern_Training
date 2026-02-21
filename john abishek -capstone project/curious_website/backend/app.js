const express = require("express");
const session = require("express-session");
const cors = require("cors");
const path = require('path');
require("dotenv").config();

const sequelize = require("./config/database");
const bcrypt = require("bcrypt");
const { User } = require("./sprint1/models");
require("./sprint1/models/Question");
require("./sprint1/models/Answer");
require("./sprint1/models/Comment");

const app = express();

app.set("trust proxy", 1);
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
const sprint1Views = path.join(__dirname, "sprint1/views");
const sprint2Views = path.join(__dirname, "sprint2/views");
app.set("views", [sprint1Views, sprint2Views]);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      sameSite: "lax",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use("/api", require("./routes/api"));
app.use("/", require("./sprint2/routes/sprint2ViewRoutes"));

app.use("/", require("./sprint1/routes/authRoutes"));
app.use("/", require("./sprint1/routes/rbacRoutes"));

async function seedAdmin() {
  try {
    const adminExists = await User.findOne({ where: { role: "admin" } });
    if (!adminExists) {
      const adminEmail = process.env.ADMIN_EMAIL || "johnjosh2019@gmail.com";
      const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
      const hashedPassword = await bcrypt.hash(adminPassword, 10);

      await User.create({
        email: adminEmail,
        password: hashedPassword,
        name: "Admin",
        role: "admin",
      });

      console.log(`Admin user created: ${adminEmail} / ${adminPassword}`);
    }
  } catch (err) {
    console.error("Error seeding admin user:", err);
  }
}

sequelize.sync({ alter: process.env.NODE_ENV !== "production" }).then(async () => {
  await seedAdmin();
  app.listen(3000, () => {
    console.log("Welcome page: http://localhost:3000/");
  });
}).catch((err) => {
  console.error("Unable to sync database:", err);
});