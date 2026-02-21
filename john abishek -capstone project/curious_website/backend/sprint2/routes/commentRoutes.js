const express = require("express");
const commentController = require("../controllers/commentController");
const { isAuthenticated } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.get("/", commentController.list);
router.post("/", isAuthenticated, commentController.create);

module.exports = router;
