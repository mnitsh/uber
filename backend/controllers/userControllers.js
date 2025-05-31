import { User } from "../models/user.model.js"
import mongoose from "mongoose"
import { validationResult } from "express-validator"
import { createUser } from "../service/user.services.js"
import { BlackListToken } from "../models/blackListToken.model.js";

const registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullName, email, password } = req.body;


        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }


        // Create a new user
        const user = await createUser({
            firstName: fullName.firstName,
            lastName: fullName.lastName,
            email,
            password
        });

        if (!user) {
            return res.status(500).json({ message: "Failed to create user" });
        }

        const token = user.generateToken();

        return res
            .status(201)
            .json({
                message: "User registered successfully",
                user, token
            });
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const loginUser = async (req, res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find user by email
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Check password
        const isMatch = await user.isPasswordCorrect(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = user.generateToken();

        return res
            .status(200)
            .cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // Use secure cookies in production
                sameSite: "strict", // Prevent CSRF attacks
                maxAge: 24 * 60 * 60 * 1000  // 1 day in milliseconds
            })
            .json({
                message: "Login successful",
                user, token
            });
    } catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const getUserProfile = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({
            message: "User profile fetched successfully",
            user
        });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const logoutUser = async (req, res) => {
    try {
        const token = req.cookies.token || req.headers?.authorization?.split(" ")[1];
        if (!token) {
            return res.status(400).json({ message: "No token provided" });
        }

        const blacklistedToken = await BlackListToken.create({ token });
        if (!blacklistedToken) {
            return res.status(500).json({ message: "Failed to log out" });
        }

        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: "strict" // Prevent CSRF attacks
        });
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}


export { registerUser, loginUser, logoutUser, getUserProfile }


