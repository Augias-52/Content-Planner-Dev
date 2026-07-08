const mongoose = require("mongoose");

const platformSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    logo: {
      type: String,
      default: "",
    },

    color: {
      type: String,
      default: "",
    },

    website: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Platform", platformSchema);