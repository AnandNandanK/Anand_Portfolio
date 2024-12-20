import express from "express";
import {getHeroSection, updateHeroSection} from "../controllers/heroController.js"
import { isAuthenticated } from "../middelware/auth.js";
import { upload } from "../middelware/multer.js";


//creating new express router
const router=express.Router();

//HERO SECTION
router.get("/get",getHeroSection);
router.put("/update",isAuthenticated,upload.single("avatar"),updateHeroSection);



export default router;