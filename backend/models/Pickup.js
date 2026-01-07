const mongoose = require("mongoose");

const pickupSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    wasteType: {
      type: String,
      required: true
    },
    scheduledDate: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending"
    },
    weight: {
      type: Number,
      default: 0
    },
    pointsEarned: {
      type: Number,
      default: 0
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model("Pickup", pickupSchema);
