import MedicalDietRecord from "../models/medicalDietRecord.model.js";

export const createRecord = async (req, res) => {
  try {
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);


    const { petId, type, description } = req.body;
    const userId = req.user.id;
     let fileUrl = null;
    if (req.file) {
      fileUrl = `${req.protocol}://${req.get('host')}/${req.file.path.replace(/\\/g, '/')}`;
    }else{
        console.log("No file was uploaded!");
    }

    const record = await MedicalDietRecord.create({
      userId,
      petId,
      type,
      description,
      fileUrl
    });
    console.log("Record created:", record);

    res.status(201).json({ message: "Record created", data: record });
  } catch (err) {
     console.error("Error in createRecord:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getPetRecords = async (req, res) => {
  try {
    const { petId } = req.params;
    const records = await MedicalDietRecord.findAll({ where: { petId } });
    res.json({ data: records });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
