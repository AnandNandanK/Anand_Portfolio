import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import dotenv from "dotenv";
dotenv.config();


cloudinary.config({
    cloud_name: process.env.CLOUDE_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const options = {
    resource_type: 'auto'
}

const uploadOnCloudinary = async (localfilepath) => {
    try {
        const response = await cloudinary.uploader.upload(localfilepath,options);
        // console.log("UPLOAD ON CLOUDINARY.....", response.url);
        return response;

    } catch (error) {
        // fs.unlinkSync(localfilepath);
        console.log(error);
    }
}

export default uploadOnCloudinary;
