import mongoose from "mongoose";

const projectSchema=new mongoose.Schema({

    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    gitLink:{
        type:String,
        required:true
    },

    vercelLink:{
        type:String,
    },

    projectPhoto:{
        type:String,
        required:true
    },
    
},{timestamp:true})

const Project=mongoose.model("Project",projectSchema);
export default Project;