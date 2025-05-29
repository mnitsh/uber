import { Router } from "express";
import { body } from "express-validator"
import { registerUser } from "../controllers/userControllers.js"
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

export default router;

