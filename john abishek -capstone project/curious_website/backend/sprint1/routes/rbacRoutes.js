const express = require("express");
const router = express.Router();
const { checkRole } = require("../../middlewares/roleMiddleware");

router.get("/adminDashboard", checkRole("admin"), (req, res) => {
  res.redirect("/dashboard");
});
router.get("/admin/dashboard", checkRole("admin"), (req, res) => {
  res.redirect("/dashboard");
});


module.exports = router;
