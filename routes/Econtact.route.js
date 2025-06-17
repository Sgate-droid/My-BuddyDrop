import {
    getAllContact,
    createContact,
    updateContact,
    deleteContact
} from '../Controllers/Econtact.controller.js';
import { authMiddleware } from '../Middleware/Econtact.auth.js';
import {contactValidationRules, validate} from '../Middleware/Econtact.validation.js';
import express from 'express';


const router = express.Router();

router.get('/', authMiddleware, getAllContact);
router.post('/', authMiddleware, contactValidationRules, validate, createContact);
router.put('/:id', authMiddleware, contactValidationRules, validate, updateContact);
router.delete('/:id', authMiddleware, deleteContact);

export default router;