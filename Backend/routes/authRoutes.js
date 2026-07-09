

const express = require("express");
const router = express.Router();
const { loginUser, registerUser, verifyUser } = require("../controllers/authController");
router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/verify", verifyUser);
module.exports = router;