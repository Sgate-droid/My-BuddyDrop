import { body, validationResult } from 'express-validator';

// Validation rules for creating/updating a contact
export const contactValidationRules = [
    body('name').notEmpty().withMessage('Name is required'),
    body('number').notEmpty().withMessage('Number is required'),
    body('relationship').notEmpty().withMessage('Relationship is required'),
    body('additionalInfo').notEmpty().withMessage('AdditionalInfo is required')
];

// Middleware to handle validation errors
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};