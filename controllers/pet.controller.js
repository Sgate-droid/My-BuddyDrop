import Pet from "../models/pet.model.js";

// Create a new pet profile
export const createPetProfile = async (req, res) => {
  const { Name, type, breed, gender } = req.body;
  
  const file = req.file;
  const filePath = file ? file.path : null;
  const fileName = file ? file.filename : null;

  const pet = await Pet.create({ Name, type, breed, gender, filePath, fileName });

  if (!pet) {
    return res.status(400).json({
      status: false,
      message: "Could not create the pet profile",
      data: null,
    });
  }

  return res.status(201).json({
    status: true,
    message: "Pet Profile created successfully",
    data: pet,
  });
};

//get all books
export const getAllPetsProfile = async (req, res) => {
  const LIMIT = 5;
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * LIMIT;
  const pets = await Pet.findAndCountAll({ limit: LIMIT, offset });

// const books = await Book.findAll();

  if (pets.count === 0) {
    return res.status(400).json({
      status: false,
      message: "Could not get the books",
      data: [],
    });
  }

  return res.status(200).json({
    status: true,
    message: "Books retrieved successfully",
    data: {
      pets: pets.rows,
      total: pets.count,
      pages: Math.ceil(pets.count / LIMIT),
      page,
    },
  });
};


// get a single pet profile
export const getPetProfile = async (req, res) => {
  const { id } = req.params;
  const pet = await Pet.findByPk(Number(id));
  if (!pet) {
    return res.status(400).json({
      status: false,
      message: "Could not fine Pet profile",
      data: [],
    });
  }

  return res.status(200).json({
    status: true,
    message: "Pet Profile retrieved successfully",
    data: pet,
  });
};

// update a pet profile
export const updatePetProfile = async (req, res) => {
  const { id } = req.params;
  const pet = await Pet.findByPk(Number(id));

  if (!pet) {
    return res.status(400).json({
      status: false,
      message: "Could not get the pet profile",
      data: [],
    });
  }

  await pet.update(req.pet);

  return res.status(200).json({
    status: true,
    message: "Pet Profile updated successfully",
    data: pet,
  });

};

// delete a petprofile
export const deletePetProfile = async (req, res) => {
  const { id } = req.params;
  const pet = await Pet.findByPk(Number(id));
  await pet.destroy();

  return res.status(200).json({
    status: true,
    message: "Pet Profile deleted successfully",
    data: [],
  });
};