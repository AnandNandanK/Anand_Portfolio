import User from "../models/adminModel.js";
import Hero from "../models/heroSectionModel.js";
import uploadOnCloudinary from "../config/cloudinary.js";



export const getHeroSection = async (req, res) => {

    try {

        const userId = req.id;
        console.log("USER ID....",req)

        const adminDetails= await User.findById(userId);
        console.log('ADMIN DETAILS.....',adminDetails);

        const hero = await Hero.findById(adminDetails?.hero);
        console.log('HERO ID......',hero);

        if (!hero) {
            return res.status(404).json({
                message: "Hero Not FOund",
                success: false,             
            });
        }

        return res.status(200).json({
            message: "Hero Section Fetched Successfully",
            success: true,
            data:hero
            
        });


    } catch (error) {
        console.log(error);
    }

}




export const updateHeroSection = async (req, res) => {

    try {

        const userId = req.id;
        console.log("USER ID....",userId);

        const { title, myself } = req.body;
        const avatarlocalpath = req.file?.path;
        const avatar = await uploadOnCloudinary(avatarlocalpath);


        const adminDetails= await User.findById(userId);
        console.log('ADMIN DETAILS.....',adminDetails.hero);

        const hero = await Hero.findById(adminDetails.hero);
        console.log('HERO ID......',hero);

        if (!hero) {
            return res.status(404).json({
                message: "Hero Not FOund",
                success: false,             
            });
        }

        hero.title=title;
        hero.myself=myself;
        hero.profilePhoto=avatar?.url;
        await hero.save();

        const updatedHero=await User.findById(userId).populate("hero").exec();

        // console.log("HERO SECTION....",updateHeroSection);

        return res.status(200).json({
            message: "Hero Section Updated Successfully",
            success: true,
            data:updatedHero
            
        });


    } catch (error) {
        console.log(error);
    }

}