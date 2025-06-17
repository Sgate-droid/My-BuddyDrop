import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
    // Add token verification logic here (e.g., JWT)
    
   // try{
   //     const access = jwt.verify(token, process.env.JWT_SECRET);
   //     req.user = access;
   //     next();
   // }
   // catch(err){
   //     res.status(403).json({error:'invalid token'});
   // }
};