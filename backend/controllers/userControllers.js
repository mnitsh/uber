import { User } from "../models/user.model.js"
import { validationResult } from "express-validator"
import { createUser } from "../service/user.services.js"
import { BlackListToken } from "../models/blackListToken.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ApiError(400, "Validation error", errors.array());
    }

    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(400, "User already exists");
    }

    // Create a new user
    const user = await createUser({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password
    });

    // Remove password before sending user to frontend
    const userObj = user.toObject();
    delete userObj.password;

    if (!user) {
        throw new ApiError(500, "Failed to create user");
    }

    const token = user.generateToken();

    return res
        .status(201)
        .json(new ApiResponse(201, { user: userObj, token }, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ApiError(400, "Validation error", errors.array());
    }

    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    // Find user by email
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }

    const userObj = user.toObject();
    delete userObj.password;

    // Check password
    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch) {
        throw new ApiError(401, "Invalid email or password");
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
        .json(new ApiResponse(200, { user: userObj, token }, "User logged in successfully"));
});

const getUserProfile = asyncHandler(async (req, res) => {
    const user = req.user;
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    return res.status(200).json(new ApiResponse(200, user, "User profile fetched successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {
    const token = req.cookies.token || req.headers?.authorization?.split(" ")[1];
    if (!token) {
        throw new ApiError(401, "No token provided");
    }

    const blacklistedToken = await BlackListToken.create({ token });
    if (!blacklistedToken) {
        throw new ApiError(500, "Failed to log out");
    }

    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: "strict" // Prevent CSRF attacks
    });
    return res.status(200).json(new ApiResponse(200, {}, "User logged out successfully"));
});


export { registerUser, loginUser, logoutUser, getUserProfile }


