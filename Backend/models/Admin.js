const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    permissions: {
      type: [String],
      default: [],
    },

    lastLogin: {
      type: Date,
      default: null,
    },

    isSuperAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Admin", adminSchema);  