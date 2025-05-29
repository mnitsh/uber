import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        fullname: {
            frstName: {
                type: String,
                required: [true, "FirstName is required"],
                minlength: [2, "FirstName must be at least 2 character long"]
            },
            lastName: {
                type: String,
                minlength: [3, "FirstName must be at least 3 character long"]
            }
        },
        email: {
            type: String,
            required: [true, "email is required"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "password is required"],
            minlength: 6,
            select: false,
        },
        socketId: {
            type: String
        }
    },
    { timestamps: true }
);


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
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


export const User = mongoose.model("User", userSchema)