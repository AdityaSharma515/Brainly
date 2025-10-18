import express from "express"
import{ z }from "zod"
import users from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { auth } from "../middleware/auth.js";
import type {Request,Response } from "express"
import Content from "../models/Content.js";
import type {Authrequest} from "../middleware/auth.js"
const router=express();

router.post("/signup",async (req:Request,res:Response)=>{    
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
router.post("/signin",async (req:Request,res:Response)=>{
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

router.post("/content",auth,async (req:Authrequest,res:Response)=>{
    try {
        const type=req.body.type
        const link=req.body.link
        const title=req.body.title
        const tags=req.body.tags
        const userId=req.user.id;
        const newcontent= new Content({
            type:type,
            link:link,
            title:title,
            tags:tags,
            userId:userId,
        })
        await newcontent.save();
        res.status(200).json({message:"Content added succefully"})
    } catch (error) {
        console.error("Error in adding content",error)
        return res.status(403).json({message:"Error in adding Content try again"})
    }
})
router.get("/content",auth,async (req:Authrequest,res:Response)=>{
    try {
        const userId=req.user.id;
        const content=await Content.find({userId:userId}).populate("userId","username")
        if (content.length === 0) {
            return res.status(404).json({message: "No content found for this user"})
        }
        res.status(200).json({
            content
        });
    } catch (error) {
        console.error("Error in Fetching Content",error);
        return res.status(500).json({message: "Server error" })
    }
})

router.delete("/content",auth,async (req:Authrequest,res:Response)=>{
    try {
        const userId=req.user.id;
        const contetnid=req.body._id;
        const response=await Content.deleteOne({userId:userId,_id:contetnid})
        if (!response) {
            return res.status(404).json({message: "No content found for this user"})
        }
        res.status(200).json({
            message:"Content deleted Succefully",
            response
        });
    } catch (error) {
        console.error("Error in deleted Content",error);
        return res.status(500).json({message: "Server error" })
    }
})
export default router