function studentValidator(req, res, next) {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      error: 'Name and Email are required'
    });
  }

  next();
}

module.exports = studentValidator;