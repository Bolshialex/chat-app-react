const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
require("dotenv").config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const registerUser = async (req, res) => {
  const { username, email, password, repeatPassword } = req.body;
  try {
    if (!username || !email || !password || !repeatPassword) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(409).json({ message: "Email already exists" });
    }
    const isEmail = validator.isEmail(email);
    if (!isEmail) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(409).json({ message: "Username already exists" });
    }
    if (password !== repeatPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const isStrongPassword = validator.isStrongPassword(password);
    if (!isStrongPassword) {
      return res.status(400).json({ message: "Password is not strong enough" });
    } else {
      const SALT = process.env.SALT;
      const saltHashed = await bcrypt.genSalt(Number(SALT));
      const hashedPassword = await bcrypt.hash(password, saltHashed);
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getUserByUserName = async (req, res) => {
  try {
    const user = await User.findOne(
      { username: req.params.username },
      { password: 0 }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, getAllUsers, getUserByUserName, loginUser };
