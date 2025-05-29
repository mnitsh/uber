import { User } from "../models/user.model.js"
import mongoose from "mongoose"
import { validationResult } from "express-validator"
import { createUser } from "../service/user.services.js"

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

        console.log("user created", user);
        

        if (!user) {
            return res.status(500).json({ message: "Failed to create user" });
        }

        const token = user.generateToken();

        return res
        .status(201)
        .cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: "strict", // Prevent CSRF attacks
            maxAge: 24 * 60 * 60 * 1000 * 10 // 10 days
        })
        .json({
            message: "User registered successfully",
            user, token
        });
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export { registerUser };