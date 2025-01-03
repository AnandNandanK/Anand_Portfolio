import User from "../models/adminModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Hero from "../models/heroSectionModel.js"
import Project from "../models/projectModel.js";
import uploadOnCloudinary from "../config/cloudinary.js";



//create new user
export const createAdmin = async (req, res) => {
    try {
        const { name, email, password, phoneNumber } = req.body;

        // Check if all fields are provided
        if (!name || !email || !password || !phoneNumber) {
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Invalid email format",
                success: false,
            });
        }

        // Check if the user already exists (email)
        const user = await User.findOne({ email: email.toLowerCase() });
        if (user) {
            return res.status(400).json({
                message: "User is already registered",
                success: false,
            });
        }


        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10).catch(err => {
            return res.status(500).json({
                message: "Error hashing password",
                success: false,
            });
        });

        const heroDetails= await Hero.create({
            title:"",
            myself:"",
            profilePhoto:""
        });
        // console.log("HERO DETAILS...",heroDetails);


        // PROJECT DETAILS
        // const projectDetails = await Project.create(({
        //     title:"",
        //     description:"",    
        //     title:"",
        //     gitLink:"",
        //     vercelLink:"",   
        //     projectPhoto:""  
        // }))
        

        // Create the new user
        const createdUser = await User.create({
            name,
            phoneNumber,
            email: email.toLowerCase(),
            password: hashedPassword,
            contact:null,
            hero:heroDetails._id,
            resume:null,
        });

        // Return success response
        return res.status(200).json({
            message: "User is created successfully",
            data: createdUser,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
};





// Login user
export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log('PRINTING EMAIL AND PASSWORD.......',email,password)

        if (!email || !password) {
            return res.status(400).json({
                message: "Enter Email and Password first",
                success: false,
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Invalid email format",
                success: false,
            });
        }

        // Check if all fields are provided
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        // Find the user by email
        let user = await User.findOne({ email:email.toLowerCase()});

        // If user is not found
        if (!user) {
            return res.status(404).json({
                message: "User is not registered with this email",
            });
        }

        // Compare the passwords
        const comparePass = await bcrypt.compare(password, user.password);
        if (!comparePass) {
            return res.status(400).json({
                message: "Password is incorrect",
            });
        }

         // Save token to user document in database
  
        // Create a user object without the password
        // const withoutPassUser = {
        //     _id: user._id,
        //     name:user.name,
        //     email: user.email,
        // };

        // console.log("WITHOUT PASS USER....", withoutPassUser)

        // Create a payload for JWT
        let payload = {
            id: user._id.toString(),
        };


        // Generate a token to store user id in cookies
        const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: "1d",
        });



        user.token = token
        user.password = undefined

        
        // Set cookie and return success response
        return res
            .status(200)
            .cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true }) // storing token in cookies
            .json({
                message: "User logged in successfully",
                success: true,
                user,
                token
            });

    } catch (error) {
        console.log(error);
    }
};





// UPDATE ADMIN
export const updateAdmin = async (req, res) => {
    try {
        const { name, email, phonenumber, skills, } = req.body;
        const userid = req.id; // Ensure req.id is a valid string ID

        // If email is provided, validate its format
        if (email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    message: "Invalid email format",
                    success: false,
                });
            }
        }

                // Regular expression to check for 10 digits
        const phoneNumberRegex = /^\d{10}$/;

        // Validate the phone number format
        if (!phoneNumberRegex.test(phonenumber)) {
            return res.status(400).json({
                message: "Phone number must be exactly 10 digits",
                success: false,
            });
        }

        // If a file is uploaded, upload it to Cloudinary
        let getresume;
        if (req.file?.path) {
            const avatarlocalpath = req.file.path;
            getresume = await uploadOnCloudinary(avatarlocalpath);
        }

        // Find the user by ID
        const user = await User.findById(userid);

        // If user is not found
        if (!user) {
            return res.status(404).json({
                message: "User not found with this ID",
            });
        }

        // Prepare updated fields dynamically
        const updatedFields = {};

        // Update only if fields are provided
        if (name) updatedFields.name = name;
        if (email) updatedFields.email = email.toLowerCase();
        if (phonenumber) updatedFields.phonenumber = phonenumber;
        if (skills) updatedFields.skills = skills.split(/[ ,]+/); // Update skills only if provided
        if (getresume.url) updatedFields.resume = getresume?.url;  // Update resume if file uploaded

        // Update the user information
        const updatedUser = await User.findByIdAndUpdate(
            userid,
            { $set: updatedFields }, // Dynamically set the fields to update
            { new: true } // Return the updated document
        );

        // Return success response
        return res.status(200).json({
            message: "User updated successfully",
            updatedUser,
        });

    } catch (error) {
        console.error("Error in updating user:", error);
        return res.status(500).json({ message: "Server error" });
    }
};


// VERIFY TOKEN
export const verifyToken = async (req, res) => {
    try {
        // Extracting token from Authorization header
        console.log(req.header)
        const token = req.header("Authorization")?.replace("Bearer ", "");

        console.log(token, "PRINTING TOKEN.....");

        // If no token is provided in the header, return 401 Unauthorized
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is Null"
            });
        }

        

        try {
            // Verify the token using JWT_SECRET
            const decoded = jwt.verify(token, process.env.SECRET_KEY);

            // If token is valid, you can add any logic or send response
            return res.status(200).json({
                success: true,
                message: "Token is valid",
                user: decoded // Send the decoded user info if needed
            });
        } catch (error) {
            // If the token verification fails (expired, invalid, etc.)
            return res.status(401).json({
                success: false,
                message: "Token is invalid in verify token"
            });
        }
    } catch (error) {
        // If there's a server error
        console.error("Error in verifying token:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};




// // Delete a user
// export const deleteLoggedInUser = async (req, res) => {
//     try {
//         const userId = req.id; // Ensure req.id contains the user's ID

//         // Check if user exists
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({
//                 message: "User not found",
//                 success: false,
//             });
//         }

//         // Delete the user
//         await User.findByIdAndDelete(userId);

//         // Return success response
//         return res.status(200).json({
//             message: "User deleted successfully",
//             success: true,
//         });
        
//     } catch (error) {
//         console.error("Error in deleting user:", error);
//         return res.status(500).json({ message: "Server error", success: false });
//     }
// };


// // Delete specific user by email
// export const deleteUserByEmail = async (req, res) => {
//     try {
//         const { email } = req.body;

//         // Check if email is provided
//         if (!email) {
//             return res.status(400).json({
//                 message: "Email is required",
//                 success: false,
//             });
//         }

//         // Find and delete user by email (convert email to lowercase for consistency)
//         const deletedUser = await User.findOneAndDelete({ email: email.toLowerCase() });

//         if (!deletedUser) {
//             return res.status(404).json({
//                 message: "User not found",
//                 success: false,
//             });
//         }

//         // If user is deleted successfully
//         return res.status(200).json({
//             message: "User deleted successfully",
//             success: true,
//         });

//     } catch (error) {
//         console.error("Error deleting user:", error);
//         return res.status(500).json({
//             message: "Server error",
//             success: false,
//         });
//     }
// };
