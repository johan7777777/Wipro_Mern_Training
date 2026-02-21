const express = require("express");
const questionController = require("../controllers/questionController");
const { isAuthenticated } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.get("/", isAuthenticated, questionController.list);
router.get("/:id", isAuthenticated, questionController.getOne);
router.post("/", isAuthenticated, questionController.create);
router.put("/:id", isAuthenticated, questionController.update);
router.delete("/:id", isAuthenticated, questionController.remove);
router.patch("/:id/deactivate", isAuthenticated, questionController.deactivate);
router.patch("/:id/complete", isAuthenticated, questionController.markCompleted);
router.patch("/:id/approve", isAuthenticated, questionController.markApproved);

module.exports = router;
