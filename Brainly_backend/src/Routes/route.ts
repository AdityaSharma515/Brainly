import express from "express"
import { auth } from "../middleware/auth.js";
import { createshare, deletecontent, getcontent, getsharecontent, postcontent, signin, signup } from "../controllers/controllers.js";
const router=express();

router.post("/signup",signup)
router.post("/signin",signin)

router.post("/content",auth,postcontent)
router.get("/content",auth,getcontent)
router.delete("/content",auth,deletecontent)
router.post("/brain/share",auth,createshare)
router.get("/brain/:share",getsharecontent)
export default router