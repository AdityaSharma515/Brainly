import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";
import router from "./Routes/route.js"; 
dotenv.config();
const app=express()
app.use(cors());
app.use(express.json())
app.use("/api/v1",router)
connectDB();

const PORT=process.env.PORT ||5001
app.listen(PORT,()=>{
    console.log(`🚀 Server running on port ${PORT}`)
})