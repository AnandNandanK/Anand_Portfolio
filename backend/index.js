import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./config/DbConnect.js";
import adminRoute from "./routes/adminRoutes.js"
import cookieParser from "cookie-parser"
import heroRoute from "./routes/heroRoutes.js"
import projectRoute from "./routes/projectRoute.js"
import cors from "cors"


const app = express();

//setting up port 
const PORT = process.env.PORT || 3000;

//starting server
app.listen(PORT,()=>{
    //calling connectDB() so that we can connect our DataBase
    connectDB();
    console.log(`Server running at port ${PORT}`);
})



app.use(express.json()); // for parsing frontend json string data 
app.use(cookieParser());// using cookiParser middelware


const corsOptions = {
    origin: "http://localhost:5173", 
    credentials: true,
  };
  
  
app.use(cors(corsOptions));

// Default route
app.get("/", (req, res) => {
    res.send("Server is up and running");
});

//using all user apis here
app.use("/api/v1/admin",adminRoute);
app.use("/api/v1/hero",heroRoute);
app.use("/api/v1/project",projectRoute);

