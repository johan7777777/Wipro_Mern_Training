exports.isAdmin = (req, res, next) => {
  const role = req.headers.role;
  if (role === "admin") next();
  else res.status(403).send("Access denied");
};

exports.isUser = (req, res, next) => {
  const role = req.headers.role;
  if (role === "user") next();
  else res.status(403).send("Access denied");
};