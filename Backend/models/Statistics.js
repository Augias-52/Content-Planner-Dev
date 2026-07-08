const mongoose = require("mongoose");

const statisticsSchema = new mongoose.Schema(
  {
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Creator",
      required: true,
      unique: true,
    },

    totalContents: {
      type: Number,
      default: 0,
    },

    publishedContents: {
      type: Number,
      default: 0,
    },

    draftContents: {
      type: Number,
      default: 0,
    },

    scheduledContents: {
      type: Number,
      default: 0,
    },

    instagramPosts: {
      type: Number,
      default: 0,
    },

    tiktokPosts: {
      type: Number,
      default: 0,
    },

    youtubePosts: {
      type: Number,
      default: 0,
    },

    facebookPosts: {
      type: Number,
      default: 0,
    },

    linkedinPosts: {
      type: Number,
      default: 0,
    },

    totalViews: {
      type: Number,
      default: 0,
    },

    totalLikes: {
      type: Number,
      default: 0,
    },

    totalComments: {
      type: Number,
      default: 0,
    },

    totalShares: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Statistics", statisticsSchema);