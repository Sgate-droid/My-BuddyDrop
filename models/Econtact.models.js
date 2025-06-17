import mysql from 'mysql2/promise'; 

// MySQL CONNECTION
export const db = await mysql.createConnection({
    host: process.env.DB_HOST,      // change as needed
    user: process.env.DB_USER, // change as needed
    password: process.env.DB_PASSWORD, // change as needed
    database: process.env.DB_NAME // change as needed
});

// EmergencyContact model functions

export async function getAllContacts() {
    const [rows] = await db.execute('SELECT * FROM EmergencyContact');
    return rows;
}

export async function createContact({ Name, Number, Relationship, AdditionalInfo }) {
    const [result] = await db.execute(
        'INSERT INTO EmergencyContact (Name, Number, Relationship, AdditionalInfo) VALUES (?, ?, ?, ?)',
        [Name, Number, Relationship, AdditionalInfo]
    );
    return { id: result.insertId, Name, Number, Relationship, AdditionalInfo };
}

export async function updateContact(id, { Name, Number, Relationship, AdditionalInfo }) {
    await db.execute(
        'UPDATE EmergencyContact SET Name=?, Number=?, Relationship=?, AdditionalInfo=? WHERE id=?',
        [Name, Number, Relationship, AdditionalInfo, id]
    );
    return { id, Name, Number, Relationship, AdditionalInfo };
}

export async function deleteContact(id) {
    await db.execute('DELETE FROM EmergencyContact WHERE id=?', [id]);
    return { id };
}

export default {getAllContacts,  createContact, updateContact, deleteContact};
;