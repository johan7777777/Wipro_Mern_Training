const express = require("express");
const answerController = require("../controllers/answerController");
const { isAuthenticated } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.get("/", isAuthenticated, answerController.list);
router.get("/:id", isAuthenticated, answerController.getOne);
router.post("/", isAuthenticated, answerController.create);
router.put("/:id", isAuthenticated, answerController.update);
router.delete("/:id", isAuthenticated, answerController.remove);
router.patch("/:id/deactivate", isAuthenticated, answerController.deactivate);
router.patch("/:id/approve", isAuthenticated, answerController.markApproved);
router.post("/:id/like", isAuthenticated, answerController.like);

module.exports = router;
