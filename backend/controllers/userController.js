const Pickup = require("../models/Pickup");

const getRewardHistory = async (req, res) => {
  try {
    const completedPickups = await Pickup.find({
      user: req.user._id,
      status: "completed"
    }).sort({ createdAt: -1 });

    res.json({
      totalPoints: req.user.points,
      history: completedPickups
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getRewardHistory };
