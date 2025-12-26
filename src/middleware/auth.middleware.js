import jwt from 'jsonwebtoken';
import User  from '../modals/user.modal.js';

export const authMiddleware = async(req, res, next) => {
    console.log("🚀 ~ authMiddleware ~ req.headers:", req.headers)
    const token=req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({message:"No token provided"});
    }
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=await User.findById(decoded.id).select("-password");
        next();
        
    } catch (error) {
     console.log(error)
     res.status(401).json({message:"Invalid token"});  
    }
}