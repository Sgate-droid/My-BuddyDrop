import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const protectedAction = (req, res, next) => {
  const { authorization } = req.headers;

  console.log("Authorization: ", authorization);
  if (!authorization) {
    return res.status(401).json({
      status: false,
      message: "Unauthorized",
      data: [],
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
  }
};