import User from "../modals/user.modal.js";
import { generateToken } from "../utils/jwt.js";

export const login=async (req,res)=>{
const {email,password}=req.body;
console.log("🚀 ~ login ~ req.body:", req.body)

const user= await User.findOne({email});
 console.log("🚀 ~ login ~ user:", user)

res.json({
    token:generateToken(user),
    user:{
        id:user._id,
        name:user.name,
        email:user.email,
        role:user.role,
        isActive:user.isActive
    }
   
})
    console.log("🚀 ~ login ~ token:",res.json)

}

export const register=async (req,res)=>{
    const {name,email,password,role}=req.body;
    const existingUser= await User.findOne({email});
    if(existingUser){
        return res.status(400).json({message:"User already exists with this email"});
    }
    const user= await User.create({
        name,
        email,  
        password,
        role
    });
    res.status(201).json({
        message:"User registered successfully",
        user:{
  id:user._id,
        name:user.name, 
        role:user.role,
        }
    });
      

}