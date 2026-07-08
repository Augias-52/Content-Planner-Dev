
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // Informations personnelles
    nom: {
      type: String,
      required: true,
      trim: true,
    },

    prenom: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    telephone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    indicatif: {
      type: String,
      required: true,
      default: "+229",
    },

    pays: {
      type: String,
      required: true,
      trim: true,
    },

    dateNaissance: {
      type: Date,
      required: true,
    },

    // Authentification
    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["creator", "admin"],
      default: "creator",
    },

    // Vérification du compte
    isVerified: {
      type: Boolean,
      default: false,
    },

    verificationCode: {
      type: String,
      default: null,
    },

    verificationExpire: {
      type: Date,
      default: null,
    },

    verificationAttempts: {
      type: Number,
      default: 0,
    },

    // État du compte
    accountStatus: {
      type: String,
      enum: ["pending", "active", "blocked"],
      default: "pending",
    },

    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);