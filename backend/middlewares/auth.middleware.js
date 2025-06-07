import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { BlackListToken } from "../models/blackListToken.model.js";
import { Captian } from "../models/captian.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";


//if res is not being used then it can be replace with underScore(_) 

export const verifyJWT = asyncHandler(async (req, res, next) => {
    const token =
        req.cookies?.token ||
        req.headers?.authorization?.split(" ")[1];

    if (!token) {
        throw new ApiError(401, "Unauthorized request");
    }

    // Check if the token is blacklisted
    const blacklistedToken = await BlackListToken.findOne({ token });

    if (blacklistedToken) {
        throw new ApiError(401, "Unauthorized");
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id);

    if (!user) {
        throw new ApiError(404, "Invalid token");
    }

    req.user = user;
    next();
});

export const verifyCaptianJWT = asyncHandler(async (req, res, next) => {

    const token =
        req.cookies?.token ||
        req.headers?.authorization?.split(" ")[1];

    if (!token) {
        throw new ApiError(401, "Unauthorized request");
    }

    // Check if the token is blacklisted
    const blacklistedToken = await BlackListToken.findOne({ token });

    if (blacklistedToken) {
        throw new ApiError(401, "Unauthorized");
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    const captian = await Captian.findById(decodedToken?._id);


    if (!captian) {
        throw new ApiError(404, "Invalid token");
    }

    req.captian = captian;
    next();
});



