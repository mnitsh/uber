import { Captian } from "../models/captian.model.js";
import { validationResult } from "express-validator";
import { createCaptian } from "../service/captian.service.js";

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

export { registerCaptian }