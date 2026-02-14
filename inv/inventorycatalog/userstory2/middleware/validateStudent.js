
export const validateStudent = (req, res, next) => {
  const { name, email } = req.body;

  if (!name || !email) {
    const missing = [];
    if (!name) missing.push("name");
    if (!email) missing.push("email");
    return res.status(400).json({
      error: "Validation failed",
      message: `Missing required fields: ${missing.join(", ")}`,
    });
  }

  next();
};
