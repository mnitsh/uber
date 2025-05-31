import { Captian } from "../models/captian.model.js";
import { validationResult } from "express-validator";
import { createCaptian } from "../service/captian.service.js";
import { BlackListToken } from "../models/blackListToken.model.js";

const registerCaptian = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullName, email, password, vehicle } = req.body;
        // Check if the captain already exists
        const existingCaptian = await Captian.findOne({ email });
        if (existingCaptian) {
            return res.status(400).json({ message: "Captain already exists" });
        }

        // Create a new captain 
        const captian = await createCaptian({
            firstName: fullName.firstName,
            lastName: fullName.lastName,
            email,
            password,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        });

        if (!captian) {
            return res.status(500).json({ message: "Failed to create captain" });
        }

        const token = captian.generateToken();

        return res
            .status(201)
            .json({
                message: "Captian registered successfully",
                captian,
                token
            });
    } catch (error) {
        console.error("Error registering captian:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const captianLogin = async (req, res) => {
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

        // Find the captain by email
        const captian = await Captian.findOne({ email }).select("+password");
        if (!captian) {
            return res.status(404).json({ message: "Captain not found" });
        }

        // Check password
        const isMatch = await captian.isPasswordCorrect(password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = captian.generateToken();


        return res.status(200)
            .cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // Use secure cookies in production
                sameSite: "strict", // Prevent CSRF attacks
                maxAge: 24 * 60 * 60 * 1000  // 1 day in milliseconds
            })
            .json({
                message: "Captain logged in successfully",
                captian,
                token
            });
    } catch (error) {
        console.error("Error logging in captain:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const logoutCaptian = async (req, res) => {
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
};

const getCaptianProfile = async (req, res) => {
    try {
        const captian = req.captian;

        if (!captian) {
            return res.status(404).json({ message: "Captain not found" });
        }

        return res.status(200).json({
            message: "Captain profile retrieved successfully",
            captian
        });
    } catch (error) {
        console.error("Error retrieving captain profile:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export { registerCaptian, captianLogin, getCaptianProfile, logoutCaptian };