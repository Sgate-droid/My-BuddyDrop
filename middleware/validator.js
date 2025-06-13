import { body, query, param, validationResult } from 'express-validator';

export const createPetProfileValidator = [
    body('Name').escape().notEmpty().withMessage('Name of pet is required'),
    //  body('Name').escape().notEmpty().withMessage('Name of pet is required').isLength({min:3}).withMessage('Pet Name must be at least 3 characters long'),
    body('type').escape().notEmpty().withMessage('Type of pet is required'),
    body('breed').escape().notEmpty().withMessage('Breed is required'),
    body('gender').escape().notEmpty().withMessage('Gender is required'),
]

// export const createReviewValidator = [
//     body('reviewer').escape().notEmpty().withMessage('Reviewer is required'),
//     body('rating').escape().isInt({min:1, max: 10}).withMessage('Rating must be between 1 and 10'),
//     body('comment').escape().notEmpty().withMessage('A comment is required'),
//     param('bookId').escape().isInt().withMessage('A valid book id is required'),
// ]

export const validationResultMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // let format = errors.array().map(error => {
        //     return {
        //         value: error.value,
        //         message: error.msg
        //     }
        // })

        return res.status(422).json({
            status: false,
            message: "Validation failed",
            errors: errors.array(),
        });
    }
    next();
}