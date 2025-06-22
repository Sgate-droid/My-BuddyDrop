import EmergencyContact from "../models/Econtact.models.js";

// GET all contacts
export const getAllEmergencyContacts = async (req, res) => {
    try {
        const contacts = await getAllContacts();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching contacts', error });
    }
};

// POST create
export const createEmergencyContact = async (req, res) => {
    try {
        const { name, number, relationship, additionalInfo } = req.body;
        if (!name || !number || !relationship || !additionalInfo) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        const contact = await createContactModel({ name, number, relationship, additionalInfo });
        res.status(201).json({ message: 'Emergency contact created successfully', contact });
    } catch (error) {
        res.status(500).json({ message: 'Error creating contact', error });
    }
};

// PUT update contact
export const updateEmergencyContact = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, number, relationship, additionalInfo } = req.body;
        const updated = await updateContactModel(id, { name, number, relationship, additionalInfo });
        res.status(200).json({ message: 'Emergency contact updated successfully', updated });
    } catch (error) {
        res.status(500).json({ message: 'Error updating contact', error });
    }
};

// DELETE contact
export const deleteEmergencyContact = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteContactModel(id);
        res.status(200).json({ message: 'Emergency contact deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting contact', error });
    }
};

