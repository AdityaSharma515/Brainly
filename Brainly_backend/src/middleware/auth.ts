import type {Request,Response, NextFunction } from "express"
import jwt  from "jsonwebtoken"

export interface Authrequest extends Request{
    user?: any,
}

export function auth(req:Authrequest,res:Response,next:NextFunction){
    try {
        const authHeader=req.headers.authorization;
        if (!authHeader ) {
        return res.status(403).json({message:"No header Provided"}) 
        }
        
        const token=authHeader.split(" ")[1];
        if (!token) {
            return res.status(403).json({message:"no token in header"})
        }
        const secret= process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("Jwt secret is not found");     
        }

        const decoded=jwt.verify(token,secret);
        req.user=decoded;
        next();
    } catch (error) {
        console.error("Error in token Verifaction",error);
        return res.status(403).json({message:"Invalid or expired token"})
    }

}