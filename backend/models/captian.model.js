import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const captianSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            lowercase: true,
            required: [true, 'First name is required'],
            minlength: [2, 'First name must be at least 2 characters long']
        },
        lastName: {
            type: String,
            lowercase: true,
            minlength: [2, 'Last name must be at least 2 characters long']
        }
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, 'Email is required'],
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'busy'],
        default: 'inactive',
    },
    vehicle: {
        color: {
            type: String,
            required: [true, 'Vehicle color is required']
        },
        plate: {
            type: String,
            required: [true, 'Vehicle plate is required'],
            unique: true,
            minlength: [4, 'Vehicle plate must be at least 1 character long']
        },
        capacity: {
            type: Number,
            required: [true, 'Vehicle capacity is required'],
            min: [1, 'Capacity must be at least 1']
        },
        vehicleType: {
            type: String,
            required: [true, 'Vehicle type is required'],
            enum: ['car', 'bike', 'auto'],
        }
    },
    location: {
        lat: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    }
}, { timestamps: true });

captianSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

captianSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

captianSchema.methods.generateToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.TOKEN_SECRET,
        {
            expiresIn: process.env.TOKEN_EXPIRY,
        }
    );
};

export const Captian = mongoose.model('Captian', captianSchema);