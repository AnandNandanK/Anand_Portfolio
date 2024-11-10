import mongoose from "mongoose";


const heroSectionSchema=mongoose.Schema({

    title:{
        type:String,
        // required:true
    },

    myself:{
        type:String,
        // required:true
    },

    profilePhoto:{
        type:String,
        // required:true
    },
})

const HeroSection=mongoose.model("HeroSection",heroSectionSchema);
export default HeroSection;