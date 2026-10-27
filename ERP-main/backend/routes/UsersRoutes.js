const express = require("express");
const UsersModel = require("../models/UsersModel");

const route = express.Router();

/* =======================
   GET ALL USERS (SAFE)
======================= */
route.get("/", async (req, res) => {
  try {
    const users = await UsersModel.find().select("-password").sort({
      createdAt: -1,
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
});

/* =======================
   GET USER BY ID
======================= */
route.get("/:id", async (req, res) => {
  try {
    const user = await UsersModel.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({ success: true, user });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Invalid user ID",
    });
  }
});

/* =======================
   CREATE USER (CHECK DUPLICATE)
======================= */
route.post("/create", async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username and password required",
    });
  }

  try {
    const exists = await UsersModel.findOne({ username });

    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Username already exists",
      });
    }

    const user = await UsersModel.create({
      username,
      password,
      role,
    });

    res.json({
      success: true,
      userID: user._id,
      message: "User created successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

/* =======================
   LOGIN
======================= */
route.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username and password required",
    });
  }

  try {
    const user = await UsersModel.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    res.json({
      success: true,
      userID: user._id,
      username: user.username,
      role: user.role,
      message: "Login successful",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/* =======================
   UPDATE USER
======================= */
route.put("/update/:id", async (req, res) => {
  try {
    const user = await UsersModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({ success: true, user });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Invalid user ID",
    });
  }
});

/* =======================
   DELETE USER
======================= */
route.delete("/delete/:id", async (req, res) => {
  try {
    const user = await UsersModel.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Invalid user ID",
    });
  }
});

module.exports = route;
