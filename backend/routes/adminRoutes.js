import express from "express";
import {createAdmin,updateAdmin,loginAdmin} from "../controllers/adminController.js"
import { isAuthenticated } from "../middelware/auth.js";
import { upload } from "../middelware/multer.js";
import { contactAdmin } from "../controllers/contactController.js";


//creating new express router
const router=express.Router();


//ADMIN SECTION
router.post("/register",createAdmin);
router.get("/login",loginAdmin);
router.put("/update",isAuthenticated,upload.single("resume"),updateAdmin);
router.post("/contactme",isAuthenticated,contactAdmin);



export default router;