module.exports = function authorize(requiredRole) {
  return (req, res, next) => {
    if (req.user.role !== requiredRole) {
      return res.status(403).send("Access denied");
    }
    next();
  };
};