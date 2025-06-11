import { Captian } from "../models/captian.model.js";
import { validationResult } from "express-validator";
import { createCaptian } from "../service/captian.service.js";
import { BlackListToken } from "../models/blackListToken.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";


// Register a new captain
const registerCaptian = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ApiError(400, "Validation error", errors.array());
    }

    const { fullName, email, password, vehicle } = req.body;
    if (!fullName || !email || !password || !vehicle) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if the captain already exists
    const existingCaptian = await Captian.findOne({ email });
    if (existingCaptian) {
        throw new ApiError(400, "Captain already exists");
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
        throw new ApiError(500, "Failed to create captain");
    }

    const token = captian.generateToken();

    return res
        .status(201)
        .cookie("captainToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: "strict", // Prevent CSRF attacks
            maxAge: 24 * 60 * 60 * 1000  // 1 day in milliseconds
        })
        .json(new ApiResponse(201, { captian, token }, "Captian registered successfully"));
});


// Login captain
const captianLogin = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ApiError(400, "Validation error", errors.array());
    }

    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    // Find the captain by email
    const captian = await Captian.findOne({ email }).select("+password");
    if (!captian) {
        throw new ApiError(404, "Captain not found");
    }

    // Check password
    const isMatch = await captian.isPasswordCorrect(password);

    if (!isMatch) {
        throw new ApiError(401, "Invalid credentials");
    }

    const token = captian.generateToken();


    return res.status(200)
        .cookie("captainToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: "strict", // Prevent CSRF attacks
            maxAge: 24 * 60 * 60 * 1000  // 1 day in milliseconds
        })
        .json(new ApiResponse(200, { captian, token }, "Captain logged in successfully"));

})

const logoutCaptian = asyncHandler(async (req, res) => {
    const token = req.cookies.captainToken || req.headers?.authorization?.split(" ")[1];
    if (!token) {
        throw new ApiError(400, "No token provided");
    }

    const blacklistedToken = await BlackListToken.create({ token });

    if (!blacklistedToken) {
        throw new ApiError(500, "Failed to log out");
    }

    res.clearCookie("captainToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: "strict" // Prevent CSRF attacks
    });

    return res.status(200).json(new ApiResponse(200, {}, "Captain logged out successfully"));
});

const getCaptianProfile = asyncHandler(async (req, res) => {
    const captian = req.captian;

    if (!captian) {
        throw new ApiError(404, "Captain not found");
    }

    return res.status(200).json(new ApiResponse(200, { captian }, "Captain profile retrieved successfully"));
});


export { registerCaptian, captianLogin, getCaptianProfile, logoutCaptian };