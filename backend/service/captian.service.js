import { Captian } from "../models/captian.model.js";
import { ApiError } from "../utils/ApiError.js";

export const createCaptian = async ({
    firstName,
    lastName,
    email,
    password,
    color,
    plate,
    capacity,
    vehicleType
}) => {
    if (!firstName || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new ApiError(400, 'All fields are required');
    }

    const captian = await Captian.create({
        fullName: {
            firstName,
            lastName
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }
    });

    return captian;
}