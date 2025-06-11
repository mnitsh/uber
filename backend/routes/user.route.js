import { Router } from "express";
import { body } from "express-validator"
import { loginUser, registerUser, logoutUser, getUserProfile } from "../controllers/userControllers.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.post('/register', [
    body('email')
        .trim()
        .isEmail()
        .withMessage('Invalid email format'),
    body('fullName.firstName')
        .trim()
        .notEmpty()
        .withMessage('First name is required')
        .isLength({ min: 2 })
        .withMessage('First name must be at least 2 characters'),
    body('password')
        .trim()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
], registerUser)


router.post('/login', [
    body('email')
        .trim()
        .isEmail()
        .withMessage('Invalid email format'),
    body('password')
        .isLength({ min: 6 })
        .trim()
        .notEmpty()
        .withMessage('Password is required'),
], loginUser);


router.get('/profile', verifyJWT, getUserProfile);

router.get('/logout', verifyJWT, logoutUser);

export default router;

