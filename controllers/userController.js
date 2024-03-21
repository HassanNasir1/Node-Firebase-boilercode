// controllers/userController.js

const User = require("../models/userModel");
const { isValidEmail } = require("../utils/validation");

exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }

    const user = new User(name, email);
    await user.create();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }

    const user = new User(name, email);
    user.id = userId; // Set the user ID
    await user.update();
    res.json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = new User(); // Create a new User instance
    user.id = userId; // Set the user ID
    await user.delete();
    res.json({ message: "User deleted successfully", userId });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
