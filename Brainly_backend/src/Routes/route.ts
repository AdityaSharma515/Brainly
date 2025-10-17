import express from "express"
import{ z }from "zod"
import users from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const router=express();

router.post("/signup",async (req,res)=>{    
    try {
        const username=req.body.username;
        const password=req.body.password;
        const user=z.object({
            username:z.string().min(3,"Username must be at least 3 characters").max(10,"Username must not exceed 10 characters"),
            password:z.string().min(8,"Password must be at least 8 characters").max(20,"Password must not exceed 20 characters").regex(/[A-Z]/,"Password must contain at least one uppercase letter")
            .regex(/[a-z]/,"Password must contain at least one lowercase letter").regex(/[0-9]/,"Password must contain at least one number").regex(/[^A-Za-z0-9]/,"Password must contain at least one special character"),
        })

        const result =user.safeParse({username:username,password:password});
        if (!result.success) {
            return res.status(411).json({
                message:"Error in inputs",
                error:result.error.issues,
            });
        }
        
        const {username:validatedusername,password:validatedpassword}=result.data

        const existinguser=await users.findOne({username:validatedusername})
        if (existinguser) {
            return res.status(403).json({
                message:"User already exists",
            })
        }
        const hashedpass = await bcrypt.hash(validatedpassword,10)
        
        const newuser= new users({
            username:validatedusername,
            password:hashedpass,
        })
        newuser.save();
        res.status(200).json({
            message:"user Signup succefully"
        })
    } catch (error) {
        console.error("Server error",error);
        res.status(500).json({
            message: "Internal server error",
        })
        
    }
    
})
router.post("/signin",async (req,res)=>{
    try {
        const username=req.body.username;
        const password=req.body.password;

    const existinguser=await users.findOne({username})
        if (!existinguser) {
            return res.status(404).json({
                message:"User not exists",
            })
        }
        const passcheck=await bcrypt.compare(password,existinguser.password)
        if (!passcheck) {
            return res.status(403).json({
                message:"Incorrect password",
            })
        }
        const secret=process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("Jwt secret is not defined");
            
        }
        const token =jwt.sign({id:existinguser._id,username:existinguser.username},secret,{expiresIn:"1h"})
        res.status(200).json({
            message:"user Signin succefully",
            token:token,
        })
    } catch (error) {
        console.error("Server error",error);
        res.status(500).json({
            message: "Internal server error",
        })
        
    }
})
router.get("/",(req,res)=>{
    
})
router.get("/",(req,res)=>{
    
})
export default router