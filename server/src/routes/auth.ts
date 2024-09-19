import express, { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { protectRoute } from "../middleware/authMiddleware";
import { CustomRequest, IUser } from "../types/user.interface";

const router = express.Router();

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required!!!!" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ name, username, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(201).json({ message: "Registered successfully!" });
  } catch (error) {
    console.log("Error!", error);
    res.status(500).json({ message: "Error signing up", error });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "WRONG PASSWORD!" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.json({ message: "Logged in!" });
  } catch (error) {
    console.log("Error!", error);
    res.status(500).json({ message: "Error logging in", error });
  }
});

router.post("/logout", async (req: Request, res: Response) => {
  res.clearCookie("jwt");
  res.json({ message: "Logged out SUCCESSFULLY!" });
});

router.get("/me", protectRoute, async (req: CustomRequest, res: Response) => {
  try {
    const user = req.user;
    console.log('User from request:', user);
    if (!user) {
      console.log('User not found in request');
      return res.status(401).json({ message: "User not found" });
    }
    
    console.log('Successfully retrieved user data for:', user.username);
    res.json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Error fetching user data", error });
  }
});

export default router;
