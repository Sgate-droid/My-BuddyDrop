import {
    getAllContacts,
    createContact as createContactModel,
    updateContact as updateContactModel,
    deleteContact as deleteContactModel
} from '../Models/Econtact.models.js';

// GET all contacts
export const getAllContact = async (req, res) => {
    try {
        const contacts = await getAllContacts();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching contacts', error });
    }
};

// POST create
export const createContact = async (req, res) => {
    try {
        const { Name, Number, Relationship, AdditionalInfo } = req.body;
        if (!Name || !Number || !Relationship || !AdditionalInfo) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        const contact = await createContactModel({ Name, Number, Relationship, AdditionalInfo });
        res.status(201).json({ message: 'Emergency contact created successfully', contact });
    } catch (error) {
        res.status(500).json({ message: 'Error creating contact', error });
    }
};

// PUT update contact
export const updateContact = async (req, res) => {
    try {
        const { id } = req.params;
        const { Name, Number, Relationship, AdditionalInfo } = req.body;
        const updated = await updateContactModel(id, { Name, Number, Relationship, AdditionalInfo });
        res.status(200).json({ message: 'Emergency contact updated successfully', updated });
    } catch (error) {
        res.status(500).json({ message: 'Error updating contact', error });
    }
};

// DELETE contact
export const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteContactModel(id);
        res.status(200).json({ message: 'Emergency contact deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting contact', error });
    }
};