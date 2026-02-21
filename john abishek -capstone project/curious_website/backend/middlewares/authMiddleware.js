const jwt = require("jsonwebtoken");

exports.isAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "jwt_secret_key");
      req.user = decoded;
      req.userId = decoded.id;
      req.session.user = { id: decoded.id, email: decoded.email, role: decoded.role };
      req.session.userId = decoded.id;
      return next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  }
  if (req.session && req.session.userId) {
    return next();
  }
  
  
  if (req.headers['content-type']?.includes('application/json') || req.path.startsWith('/api')) {
    return res.status(401).json({ message: "Unauthorized. Please log in." });
  }
  
  res.redirect("/login");
};