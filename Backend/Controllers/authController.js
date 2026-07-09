

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const {
      nom,
      prenom,
      email,
      telephone,
      indicatif,
      pays,
      dateNaissance,
      password,
      confirmPassword,
    } = req.body;

    if (
      !nom ||
      !prenom ||
      !email ||
      !telephone ||
      !indicatif ||
      !pays ||
      !dateNaissance ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({
        message: "Tous les champs sont obligatoires",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Les mots de passe ne correspondent pas",
      });
    }

    const emailExiste = await User.findOne({ email });

    if (emailExiste) {
      return res.status(400).json({
        message: "Cet email est déjà utilisé",
      });
    }

    const telephoneExiste = await User.findOne({ telephone });

    if (telephoneExiste) {
      return res.status(400).json({
        message: "Ce numéro de téléphone est déjà utilisé",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = await User.create({
      nom,
      prenom,
      email,
      telephone,
      indicatif,
      pays,
      dateNaissance,
      password: hashedPassword,
      verificationCode,
    });

    return res.status(201).json({
      message: "Utilisateur créé avec succès",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erreur création utilisateur",
      error: error.message,
    });
  }
};

const verifyUser = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({
        message: "Email et code obligatoires",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur introuvable",
      });
    }

    if (user.verificationCode !== code) {
      return res.status(400).json({
        message: "Code de vérification incorrect",
      });
    }

    user.isVerified = true;
    user.accountStatus = "active";
    user.verificationCode = null;

    await user.save();

    return res.status(200).json({
      message: "Compte vérifié avec succès",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erreur lors de la vérification",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email et mot de passe obligatoires",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Email ou mot de passe incorrect",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message:
          "Veuillez vérifier votre compte avant de vous connecter",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Email ou mot de passe incorrect",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      message: "Connexion réussie",
      token,
      user: {
        id: user._id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur pendant la connexion",
      error: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyUser,
};