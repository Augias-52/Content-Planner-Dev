
const mongoose = require("mongoose");

const creatorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    bio: {
      type: String,
      default: "",
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    avatar: {
      type: String,
      default: "",
    },

    followersCount: {
      type: Number,
      default: 0,
    },

    instagramUrl: {
      type: String,
      default: "",
    },

    tiktokUrl: {
      type: String,
      default: "",
    },

    youtubeUrl: {
      type: String,
      default: "",
    },

    facebookUrl: {
      type: String,
      default: "",
    },

    linkedinUrl: {
      type: String,
      default: "",
    },

    website: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Creator", creatorSchema);