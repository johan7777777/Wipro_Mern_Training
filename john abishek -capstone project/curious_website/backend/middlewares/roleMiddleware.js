const User = require("../sprint1/models/User");

const checkRole = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      if (!req.session || !req.session.userId) {
        return res.status(401).json({ 
          success: false, 
          message: 'Unauthorized. Please log in.' 
        });
      }

      const user = await User.findByPk(req.session.userId);
      if (!user) {
        return res.status(401).json({ 
          success: false, 
          message: 'User not found.' 
        });
      }

      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({ 
          success: false, 
          message: 'Access denied. Insufficient permissions.' 
        });
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: 'Error checking role', 
        error: error.message 
      });
    }
  };
};

module.exports = { checkRole };