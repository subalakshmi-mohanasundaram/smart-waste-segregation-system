const User = require("../models/User");
const Pickup = require("../models/Pickup");

const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPickups = await Pickup.countDocuments();
    const completed = await Pickup.countDocuments({ status: "completed" });
    const pending = await Pickup.countDocuments({ status: "pending" });

    res.json({
      totalUsers,
      totalPickups,
      completed,
      pending,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllPickups = async (req, res) => {
  try {
    const pickups = await Pickup.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(pickups);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch pickups" });
  }
};


module.exports = {
  getAdminStats,
  getAllUsers,
  getAllPickups,
};
