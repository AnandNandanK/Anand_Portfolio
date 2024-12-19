import express from "express";
import { isAuthenticated } from "../middelware/auth.js";
import { upload } from "../middelware/multer.js";
import { createProject, deleteProject, getProject, getProjectById, updateProject } from "../controllers/projectController.js";


//creating new express router
const router=express.Router();

//HERO SECTION
router.get("/get",isAuthenticated,getProject);
router.post("/create",isAuthenticated,upload.single("file"),createProject);
router.get("/get/:id",isAuthenticated,getProjectById);
router.put("/update/:id",isAuthenticated,upload.single("file"),updateProject);
router.post("/delete",isAuthenticated,deleteProject);


export default router;