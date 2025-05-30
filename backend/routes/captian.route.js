import { Router } from "express";
import { body } from "express-validator"
import { registerCaptian } from "../controllers/captian.Controller.js";
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
    body('vehicle.color')
        .trim()
        .notEmpty()
        .withMessage('Vehicle color is required'),
    body('vehicle.plate')
        .trim()
        .notEmpty()
        .withMessage('Vehicle plate is required')
        .isLength({ min: 4 })
        .withMessage('Vehicle plate must be at least 4 character long'),
    body('vehicle.capacity')
        .isNumeric()
        .withMessage('Vehicle capacity must be a number')
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage('Vehicle capacity must be atleast 1 required'),
    body('vehicle.vehicleType')
        .trim()
        .notEmpty()
        .withMessage('Vehicle type is required')
        .isIn(['car', 'bike', 'auto'])
        .withMessage('Vehicle type must be either car, bike or auto'),
], registerCaptian);

export default router;

