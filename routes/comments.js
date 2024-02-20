const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// Comment Route
router.post("/createComment/:id", commentController.createComment);

module.exports = router;