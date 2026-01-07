const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const { createPickupRequest, getMyPickups,getPendingPickups,completePickup } = require("../controllers/pickupController");

// CREATE PICKUP
router.post("/request", protect, createPickupRequest);

// GET MY PICKUPS
router.get("/my", protect, getMyPickups);
router.get(
  "/pending",
  protect,
  authorizeRoles("collector"),
  getPendingPickups
);
router.put(
  "/complete/:id",
  protect,
  authorizeRoles("collector"),
  completePickup
);


module.exports = router;
