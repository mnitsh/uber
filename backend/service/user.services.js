import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';

export const createUser = async ({
    firstName,
    lastName,
    email,
    password
}) => {

    if (!firstName || !email || !password) {
        throw new ApiError(400, 'All fields are required');
    }

    const user = User.create({
        fullName: {
            firstName,
            lastName
        },
        email,
        password
    });

    return user;
}