import { body, validationResult } from 'express-validator';

// Validation rules for creating/updating a contact
export const contactValidationRules = [
    body('Name').notEmpty().withMessage('Name is required'),
    body('Number').notEmpty().withMessage('Number is required'),
    body('Relationship').notEmpty().withMessage('Relationship is required'),
    body('AdditionalInfo').notEmpty().withMessage('AdditionalInfo is required')
];

// Middleware to handle validation errors
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};