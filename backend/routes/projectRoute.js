import express from "express";
import { isAuthenticated } from "../middelware/auth.js";
import { upload } from "../middelware/multer.js";
import { createProject, deleteProject, updateProject } from "../controllers/projectController.js";


//creating new express router
const router=express.Router();

//HERO SECTION
router.post("/create",isAuthenticated,upload.single("projectPhoto"),createProject);
router.put("/update/:id",isAuthenticated,upload.single("projectPhoto"),updateProject);
router.delete("/delete/:id",isAuthenticated,deleteProject);


export default router;