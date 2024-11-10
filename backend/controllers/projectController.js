import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/adminModel.js";
import Project from "../models/projectModel.js"





// ********************************************************************************************************
//                                      Create Project
// ********************************************************************************************************

export const createProject = async (req, res) => {

    try {

        const userId = req.id;

        const { title, description, gitLink, vercelLink } = req.body;
        const localfilepath = req.file?.path;


        if (!title || !description || !localfilepath || !gitLink) {
            return res.status(400).json({
                message: "Something is missing",
                success: false,
            });
        }

        const projectPhoto = await uploadOnCloudinary(localfilepath);

        const project = await Project.create({
            title,
            description,
            gitLink,
            vercelLink: "",
            projectPhoto: projectPhoto?.url

        })


        if (vercelLink) {
            project.vercelLink = vercelLink;
        }

        await project.save();

        const user = await User.findByIdAndUpdate(userId,
            {
                $push: { project: project.id } // Add the new project to the project array
            },
            { new: true }
        );


        return res.status(200).json({
            message: "Project Created Successfully",
            success: true,
            data: project
        });


    } catch (error) {
        console.log(error)
    }
}



// ********************************************************************************************************
//                                      Update Project
// ********************************************************************************************************

export const updateProject = async (req, res) => {
    try {

        const { title, description, gitLink, vercelLink } = req.body;

        const userId = req.id;

        const localfilepath = req.file?.path;
        const projectPhoto = await uploadOnCloudinary(localfilepath);
        const params = req.params.id;

        const updateProject = await Project.findById(params);

        // console.log(projectPhoto.url)

        if (title) updateProject.title = title
        if (description) updateProject.description = description
        if (gitLink) updateProject.gitLink = gitLink
        if (vercelLink) updateProject.vercelLink = vercelLink
        if (localfilepath) updateProject.projectPhoto.url

        await updateProject.save();

        return res.status(200).json({
            message: "Project updated Successfully",
            success: true,
            data: updateProject
        });

    } catch (error) {
        console.log(error)
    }
}




export const deleteProject = async (req, res) => {
    try {
        const projectId = req.params.id; // Assuming the project ID is passed in the request params
        const userId = req.id; // Assuming the user ID is retrieved from auth middleware

        if (!projectId) {
            return res.status(400).json({
                message: "Project ID not found",
                success: false,
            });
        }

        // Remove the project from the Project collection
        const deleteProject = await Project.findByIdAndDelete(projectId);

        if (!deleteProject) {
            return res.status(400).json({
                message: "Project not found or already deleted",
                success: false,
            });
        }

        // Remove the project ID from the user's project array
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $pull: { project: projectId } }, // Corrected $pull: just pass the projectId directly
            { new: true } // Return the updated user document
        );

        return res.status(200).json({
            message: "Project deleted successfully",
            success: true,
            updatedUser // Return updated user if needed
        });

    } catch (error) {
        console.error("Error deleting project:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};
