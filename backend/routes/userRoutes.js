const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { getRewardHistory } = require("../controllers/userController");

router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user
  });
});

router.get("/rewards", protect, getRewardHistory);

module.exports = router;
