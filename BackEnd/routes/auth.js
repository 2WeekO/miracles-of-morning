import { Router } from "express";
import { db } from "../db.js";

const router = Router();

// User registration
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const [existingUser] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Username already exists" });
    }
    await db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, password]);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// User login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const [user] = await db.query("SELECT * FROM users WHERE username = ? AND password    = ?", [username, password]);
    if (user.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    res.status(200).json({ message: "Login successful", user: user[0] });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

export default router;