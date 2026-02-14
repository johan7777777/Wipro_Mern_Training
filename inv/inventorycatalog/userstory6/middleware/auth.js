const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send("Token missing");
  }
  console.log(authHeader);
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "jwt_secret_key");
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(401).send("Invalid token");
  }
};
