const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true
    },

    houseNumber: {
      type: String,
      required: true
    },

    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
    },

    pincode: {
      type: String,
    },

    role: {
      type: String,
      enum: ["household", "collector", "admin"],
      default: "household"
    },


  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
