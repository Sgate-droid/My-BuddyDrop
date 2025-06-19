// import {
//     getAllEmergencyContacts,
//     createEmergencyContact,
//     updateEmergencyContact,
//     deleteEmergencyContact
// } from '../Controllers/Econtact.controller.js';
// import { authMiddleware } from '../Middleware/Econtact.auth.js';
// import {contactValidationRules, validate} from '../Middleware/Econtact.validation.js';
// import express from 'express';


// const router = express.Router();

// router.get('/Contacts', authMiddleware, getAllEmergencyContacts);
// router.post('/create', authMiddleware, contactValidationRules, validate,  createEmergencyContact);
// router.put('/:id', authMiddleware, contactValidationRules, validate,  updateEmergencyContact);
// router.delete('/:id', authMiddleware, deleteEmergencyContact);

// export default router;




import express from 'express';
import {
  createEmergencyContact,
  getAllEmergencyContacts,
  updateEmergencyContact,
  deleteEmergencyContact
} from '../controllers/Econtact.controller.js';
import { protectedAction } from '../middleware/protected.js';

const router = express.Router();

router.post('/createContact', protectedAction, createEmergencyContact);
router.get('/getContact', protectedAction, getAllEmergencyContacts);
router.put('/:id', protectedAction, updateEmergencyContact);
router.delete('/:id', protectedAction, deleteEmergencyContact);

export default router;
