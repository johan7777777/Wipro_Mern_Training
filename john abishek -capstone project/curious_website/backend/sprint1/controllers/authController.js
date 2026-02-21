const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");


exports.showRegister = (req, res) => {
  res.render("register", { user: req.session.user || null });
};

exports.register = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    const hash = await bcrypt.hash(password, 10);

    const userRole = (req.session.user && req.session.user.role === "admin" && role)
      ? role
      : "user";

    const user = await User.create({ email, password: hash, name, role: userRole });
    if (req.headers['content-type']?.includes('application/json') || req.path.startsWith('/api')) {
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      req.session.user = { id: user.id, email: user.email, role: user.role };
      req.session.userId = user.id;
      
      return res.status(201).json({
        message: "User created successfully",
        token,
        user: { id: user.id, email: user.email, name: user.name, role: user.role }
      });
    }
    
    res.redirect("/login");
  } catch (err) {
    
    if (req.headers['content-type']?.includes('application/json') || req.path.startsWith('/api')) {
      return res.status(400).json({ message: err.message || "Registration failed" });
    }
    res.send(err.message || "Registration failed");
  }
};

exports.showLogin = (req, res) => { res.render("login"); };

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      if (req.headers['content-type']?.includes('application/json')) {
        return res.status(401).json({ message: "User Not Found" });
      }
      return res.send("User Not Found");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      if (req.headers['content-type']?.includes('application/json')) {
        return res.status(401).json({ message: "Wrong Password" });
      }
      return res.send("Wrong Password");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    req.session.user = { id: user.id, email: user.email, role: user.role };
    req.session.userId = user.id;

    if (req.headers['content-type']?.includes('application/json')) {
      return res.json({
        token,
        user: { id: user.id, email: user.email, role: user.role }
      });
    }
    res.redirect("/dashboard");
  } catch (err) {
    if (req.headers['content-type']?.includes('application/json')) {
      return res.status(500).json({ message: err.message || "Login failed" });
    }
    res.send("Login failed");
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  if (req.headers['content-type']?.includes('application/json') || req.path.startsWith('/api')) {
    return res.json({ message: "Logged out successfully" });
  }
  res.redirect("/login");
};

exports.me = async (req, res) => {
  try {
    if (req.session && req.session.user) {
      return res.json({ user: req.session.user });
    }
    
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const jwt = require('jsonwebtoken');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return res.json({ user: decoded });
    }
    
    return res.status(401).json({ message: "Not authenticated" });
  } catch (err) {
    return res.status(401).json({ message: "Not authenticated" });
  }
};
