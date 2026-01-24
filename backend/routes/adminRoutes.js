const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Pickup = require("../models/Pickup");

/* ================= DASHBOARD STATS ================= */
router.get("/stats", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPickups = await Pickup.countDocuments();
    const completed = await Pickup.countDocuments({ status: "completed" });
    const pending = await Pickup.countDocuments({ status: "pending" });

    res.json({
      totalUsers,
      totalPickups,
      completed,
      pending
    });
  } catch (err) {
    res.status(500).json({ message: "Stats error" });
  }
});

/* ================= ALL USERS ================= */
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "name email role");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Users fetch error" });
  }
});

/* ================= ALL PICKUPS (FIXED) ================= */
router.get("/pickups", async (req, res) => {
  try {
    const pickups = await Pickup.find()
      .populate("user", "name email")   // 🔥 THIS LINE IS THE FIX
      .select("user wasteType status");

    res.json(pickups);
  } catch (err) {
    res.status(500).json({ message: "Pickup fetch error" });
  }
});


module.exports = router;
