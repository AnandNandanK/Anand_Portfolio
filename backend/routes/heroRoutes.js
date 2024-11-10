import express from "express";
import {updateHeroSection} from "../controllers/heroController.js"
import { isAuthenticated } from "../middelware/auth.js";
import { upload } from "../middelware/multer.js";
import { deleteProject } from "../controllers/projectController.js";


//creating new express router
const router=express.Router();

//HERO SECTION
router.put("/update",isAuthenticated,upload.single("avatar"),updateHeroSection);



export default router;