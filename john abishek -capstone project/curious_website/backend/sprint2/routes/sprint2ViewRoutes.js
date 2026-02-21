const express = require("express");
const questionViewController = require("../controllers/questionViewController");
const answerViewController = require("../controllers/answerViewController");
const { isAuthenticated } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.get("/questions", isAuthenticated, (req, res) => res.redirect("/dashboard"));
router.get("/questions/new", isAuthenticated, questionViewController.showForm);
router.get("/questions/:id", isAuthenticated, (req, res) => res.redirect("/dashboard"));
router.get("/questions/:id/edit", isAuthenticated, questionViewController.showForm);
router.post("/questions/new", isAuthenticated, questionViewController.create);
router.post("/questions/:id/edit", isAuthenticated, questionViewController.update);
router.post("/questions/:id/delete", isAuthenticated, questionViewController.remove);
router.post("/questions/:id/deactivate", isAuthenticated, questionViewController.deactivate);

router.get("/answers", isAuthenticated, (req, res) => res.redirect("/dashboard"));
router.get("/answers/:id/edit", isAuthenticated, answerViewController.showForm);
router.post("/answers/new", isAuthenticated, answerViewController.create);
router.post("/answers/:id/edit", isAuthenticated, answerViewController.update);
router.post("/answers/:id/delete", isAuthenticated, answerViewController.remove);
router.post("/answers/:id/deactivate", isAuthenticated, answerViewController.deactivate);

module.exports = router;
