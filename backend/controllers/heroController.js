import Hero from "../models/heroSectionModel.js";
import User from "../models/adminModel.js"

export const getHeroSection = async (req, res) => {
    try {
        // Fetch the hero section data from the database
        const hero = await Hero.find();
        
        // Log the fetched data (you can remove this in production)
        console.log('Hero Section Data:', hero);

        // Check if hero section data is empty
        if (hero.length === 0) {
            return res.status(404).json({
                message: "Hero Not Found",
                success: false,
            });
        }

        const heroObject = hero[0];
        // Successfully return the hero section data
        return res.status(200).json({
            message: "Hero Section Fetched Successfully",
            success: true,
            data: heroObject,
        });

    } catch (error) {
        // Log and send error response
        console.error('Error fetching hero section:', error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message,
        });
    }
};



export const updateHeroSection = async (req, res) => {

    try {

        const userId = req.id;
        console.log("USER ID....",userId);

        const { title, myself } = req.body;
        // const avatarlocalpath = req.file?.path;
        // const avatar = await uploadOnCloudinary(avatarlocalpath);


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
        // hero.profilePhoto=avatar?.url;
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