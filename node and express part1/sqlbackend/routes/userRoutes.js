const express = require("express");
const controller = require("../controllers/usercontroller");

const router = express.Router();

// GET all users → /api/users
router.get("/", controller.getAllUsers);

// GET user by id → /api/users/1
router.get("/:id", controller.getUserById);

// CREATE user → POST /api/users
router.post("/", controller.createUsers);

module.exports = router;