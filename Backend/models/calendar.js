

const mongoose = require("mongoose");

const calendarSchema = new mongoose.Schema(
  {
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Creator",
      required: true,
    },

    contentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Content",
      required: true,
    },

    publicationDate: {
      type: Date,
      required: true,
    },

    publicationTime: {
      type: String,
      required: true,
    },

    reminder: {
      type: Boolean,
      default: false,
    },

    reminderDate: {
      type: Date,
      default: null,
    },

    note: {
      type: String,
      default: "",
      trim: true,
    },

    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Calendar", calendarSchema);