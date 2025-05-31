import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { BlackListToken } from "../models/blackListToken.model.js";
import { Captian } from "../models/captian.model.js";


//if res is not being used then it can be replace with underScore(_) 

export const verifyJWT = async (req, res, next) => {
    try {
        const token =
            req.cookies?.token ||
            req.headers?.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized request" });
        }

        // Check if the token is blacklisted
        const blacklistedToken = await BlackListToken.findOne({ token });

        if (blacklistedToken) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id);

        if (!user) {
            return res.status(404).json({ message: "Invalid token" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: error?.message || "Invalid token" });
    }
};

export const verifyCaptianJWT = async (req, res, next) => {
    try {
        const token =
            req.cookies?.token ||
            req.headers?.authorization?.split(" ")[1];        

        if (!token) {
            return res.status(401).json({ message: "Unauthorized request" });
        }

        // Check if the token is blacklisted
        const blacklistedToken = await BlackListToken.findOne({ token });

        if (blacklistedToken) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

        const captian = await Captian.findById(decodedToken?._id);
        

        if (!captian) {
            return res.status(404).json({ message: "Invalid token" });
        }

        req.captian = captian;
        next();
    } catch (error) {
        return res.status(401).json({ message: error?.message || "Invalid token" });
    }
}



