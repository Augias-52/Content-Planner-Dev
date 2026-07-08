const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema(
  {
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Creator",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    platformId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Platform",
      required: true,
    },

    statusId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Status",
      required: true,
    },

    mediaUrl: {
      type: String,
      default: "",
    },

    hashtags: {
      type: [String],
      default: [],
    },

    publicationDate: {
      type: Date,
      default: null,
    },

    publicationTime: {
      type: String,
      default: "",
    },

    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Content", contentSchema);