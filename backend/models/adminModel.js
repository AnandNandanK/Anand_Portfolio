import mongoose from "mongoose";

const userSchema=mongoose.Schema({

    name:{
        type:String,
        required:true,
    },

    password:{
        type:String,
        required:true
    },

    phonenumber:{
        type:Number,
        require:true
    },

    email:{
        type:String,
        required:true,
        unique: true,
    },

    project:[{
            ref:'Project',
            type:mongoose.Schema.Types.ObjectId
    }],

    hero:{
            ref:'HeroSection',
            type:mongoose.Schema.Types.ObjectId
    },

    contact:{
            ref:'ContactMe',
            type:mongoose.Schema.Types.ObjectId
    },

    skills:[{
        type:String,
    }],

    resume:{
        type:String,
    },
    

},{timestamps:true})

const User=mongoose.model("User",userSchema);
export default User;