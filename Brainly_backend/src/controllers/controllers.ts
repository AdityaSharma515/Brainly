import{ z }from "zod"
import users, { type Usermodel } from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import type {Request,Response } from "express"
import Content from "../models/Content.js";
import type {Authrequest} from "../middleware/auth.js"
import link from "../models/link.js";
import { randomBytes } from "crypto";
import Tag from "../models/Tags.js";


export async function signup (req:Request,res:Response){    
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
}

export async function signin(req:Request,res:Response){
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
}

export async function postcontent(req:Authrequest,res:Response){
    try {
        const type=req.body.type
        const link=req.body.link
        const title=req.body.title
        const tags=req.body.tags
        const userId=req.user.id;
        
        const tagdoc= await Promise.all(
            tags.map(async (tagtitle:string)=>{
                const existed=await Tag.findOne({title:tagtitle})
                if (existed) {
                    return existed._id
                }
                const newtag= new Tag({
                    title:tagtitle
                })
                await newtag.save();
                return newtag._id;
            })
        );

        const newcontent= new Content({
            type:type,
            link:link,
            title:title,
            tags:tagdoc,
            userId:userId,
        })
        await newcontent.save();
        res.status(200).json({message:"Content added succefully"})
    } catch (error) {
        console.error("Error in adding content",error)
        return res.status(403).json({message:"Error in adding Content try again"})
    }
}
export async function getcontent(req:Authrequest,res:Response){
    try {
        const userId=req.user.id;
        const content=await Content.find({userId:userId}).populate("userId","username").populate("tags","title")
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
}
export async function deletecontent(req:Authrequest,res:Response){
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
}
export async function createshare(req:Authrequest,res:Response){
    try {
        const share=req.body.share;
        const userId=req.user.id;
        if (!userId) {
            return res.status(401).json({message:"Unauthorized"})
        }

        if (share) {
            const linkdoc=await link.findOne({userId:userId})
            if (!linkdoc) {
                const linkdoc= new link({
                    hash:randomBytes(8).toString("hex"),
                    userId
                });
                await linkdoc.save();
            }
            const shareablelink=`http://localhost:5001/api/v1/brain/${linkdoc!.hash}`
            return res.status(200).json({
                message:"link created succefully",
                shareablelink,
            })
        }else{
            await link.findOneAndDelete({userId})
            return res.status(200).json({
                message:"link Deleted Succefully"
            })
        }
    } catch (error) {
        console.error("error creating a sharable link",error);
        return res.status(500).json({
            message: "Server error"
        })
    }
}
export async function getsharecontent(req:Authrequest,res:Response){
    try {
        const sharlink=req.params.share
        console.log(sharlink);
        const linkdoc=await link.findOne({hash:sharlink}).populate("userId","username")
        if (!linkdoc) {
            res.status(403).json({
            message:"link not found"
        })
        }
        const content= await Content.find({userId:linkdoc!.userId})
        return res.status(200).json({
            message:"Content fetch succefully succefully",
            sharedby:(linkdoc!.userId as Usermodel).username,
            content
        })
    } catch (error) {
        console.error("error Fetching from sharable link",error);
        return res.status(500).json({
            message: "Server error"
        })
    }
}