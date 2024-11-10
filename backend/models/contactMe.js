import mongoose from "mongoose";

const contactSchema=mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    address:{
        type:String,
        required:true
    },

    message:{
        type:String,
        required:true
    },
})

const ContactMe=mongoose.model("ContactMe",contactSchema);
export default ContactMe;