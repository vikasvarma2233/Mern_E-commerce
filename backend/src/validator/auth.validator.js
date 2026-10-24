
import { body, validationResult } from "express-validator";

export const registerValidation = [
    body("name")
        .trim()
        .isString().bail()
        .withMessage("Name must be a string")
        .isLength({ min: 3 })
        .withMessage("Name must contain at least 3 characters"),

    body("email")
        .trim()
        .isEmail().bail()
        .withMessage("Enter a valid email address"),

    body("password")
        .isString()
        .withMessage("Password must be a string")
        .isLength({ min: 6 })
        .withMessage("Password must contain at least 6 characters"),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Validation failed",
                errors: errors.array()
            });
        }

        next();
    }
];


export const loginValidation = [

     body("email")
        .trim()
        .isEmail().bail()
        .withMessage("Enter a valid email address"),

        
    body("password")
        .isString()
        .withMessage("Password must be a string")
        .isLength({ min: 6 })
        .withMessage("Password must contain at least 6 characters"),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Validation failed",
                errors: errors.array()
            });
        }

        next();
    }


]
