const Pickup = require("../models/Pickup");
const User = require("../models/User");


const createPickupRequest = async (req, res) => {
  try {
    const { wasteType, scheduledDate } = req.body;

    const pickup = await Pickup.create({
      user: req.user._id,
      wasteType,
      scheduledDate
    });

    res.status(201).json({
      message: "Pickup request created",
      pickup
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyPickups = async (req, res) => {
  try {
    const pickups = await Pickup.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json(pickups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPendingPickups = async (req, res) => {
  try {
    const pickups = await Pickup.find({ status: "pending" })
      .populate("user", "name houseNumber street");

    res.json(pickups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const completePickup = async (req, res) => {
  try {
    const { id } = req.params;
    const { weight } = req.body;

    const pickup = await Pickup.findById(id);

    if (!pickup) {
      return res.status(404).json({ message: "Pickup not found" });
    }

    if (pickup.status === "completed") {
      return res.status(400).json({ message: "Pickup already completed" });
    }

    // Points rules
    const pointsTable = {
      plastic: 10,
      paper: 5,
      metal: 15,
      "e-waste": 25,
      wet: 2
    };

    const pointsPerKg = pointsTable[pickup.wasteType] || 1;
    const pointsEarned = weight * pointsPerKg;

    // Update pickup
    pickup.status = "completed";
    pickup.weight = weight;
    pickup.pointsEarned = pointsEarned;
    await pickup.save();

    // Update user points
    const user = await User.findById(pickup.user);
    user.points += pointsEarned;
    await user.save();

    res.json({
      message: "Pickup completed & points awarded",
      pointsEarned,
      totalPoints: user.points
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
  createPickupRequest,
  getMyPickups,
  getPendingPickups,
  completePickup
};

