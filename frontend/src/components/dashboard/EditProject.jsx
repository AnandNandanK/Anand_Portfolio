import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { SlCloudUpload } from "react-icons/sl";
import { createProject } from '../../services/operations/auth';
import { useSelector } from "react-redux"
import { useDispatch } from 'react-redux';
import Dashboard from './dashboard';
import { useParams } from 'react-router-dom';
import { updateProject } from '../../services/operations/auth.js';
import UseGetProjectById from '../../hooks/useGetProjectById';
import { FaEdit } from 'react-icons/fa';
import { Loader2 } from 'lucide-react';

const EditProject = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams()
    const paramsId = params.id;
    // console.log("Printing ID",params.id)

    UseGetProjectById(params.id);

    const { singleProject } = useSelector((state) => state.application)
    // console.log("SINGLE PROJECT....",singleProject);

    // State for form data
    const [inputFeild, setInputFeild] = useState({
        title: singleProject?.title || "",
        gitLink: singleProject?.gitLink || "",
        vercelLink: singleProject?.vercelLink || "",
        skills: singleProject?.skills || "",
        file: null,  // To store image file
        description: singleProject?.description || "",
        previewUrl: null
    });

    const { token, loading } = useSelector(store => store.auth)
    // console.log("Printing Token",token);

    // Handle input field changes
    const changeHandler = (e) => {
        setInputFeild({ ...inputFeild, [e.target.name]: e.target.value });
    };

    // Handle file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0];  // Get the first file
        const previewUrl = URL.createObjectURL(file)
        setInputFeild({ ...inputFeild, file, previewUrl });  // Store the file's URL to display in img tag
    };


    // Handle form submission
    const handleOnSubmit = (e) => {
        e.preventDefault();
        // Create formData inside handleOnSubmit to ensure it has the latest state values
        const formData = new FormData();
        formData.append("title", inputFeild.title);
        formData.append("gitLink", inputFeild.gitLink);
        formData.append("vercelLink", inputFeild.vercelLink);
        formData.append("description", inputFeild.description);
        formData.append("skills", inputFeild.skills);
        if (inputFeild.file) {
            formData.append("file", inputFeild.file);
        }

        console.log([...formData.entries()]); // Debugging: Logs all form data key-value pairs
        dispatch(updateProject(formData, token, paramsId, navigate));
    };

    return (
        <div className=' w-screen bg-white mx-auto flex justify-center items-center'>
            <Dashboard />
            <form onSubmit={handleOnSubmit} className='w-[90%] lg:w-1/2 md:w-1/2 border shadow-lg border-gray-200 rounded-md p-4 my-10 bg-white bg-opacity-80'>
                <h1 className='font-bold text-xl mb-5 w-full text-center'>Edit Project </h1>

                <div className='w-full flex justify-center'>
                    <div className='w-full h-[250px] flex justify-center items-center border rounded-md hover:cursor-pointer'>
                        {/* Display the uploaded image if available */}
                        {inputFeild.previewUrl ? (
                            <img src={inputFeild.previewUrl} alt="Project" className="w-full h-full object-cover rounded-md" />
                        ) : (
                            <SlCloudUpload size={70} className='font-light opacity-70' />
                        )}
                    </div>
                </div>

                {/* File upload input */}
                <div className='flex flex-col gap-1 mt-2'>
                    <label className="font-semibold">Upload Project Image</label>
                    <input
                        type="file"
                        accept="image/*"  // Allow only images
                        onChange={handleFileChange}
                        className="border rounded-sm h-full"
                    />
                </div>

                {/* Other form fields */}
                <div className='flex flex-col gap-1 mt-2'>
                    <label className="font-semibold">Project Name</label>
                    <input
                        type='text'
                        placeholder='Enter your Title'
                        className='border rounded-sm h-10 px-3'
                        name='title'
                        value={inputFeild.title}
                        onChange={changeHandler}
                    />
                </div>

                <div className='flex flex-col gap-1 mt-2'>
                    <label className="font-semibold">Git link</label>
                    <input
                        type='text'
                        placeholder='Enter your Title'
                        className='border rounded-sm h-10 px-3'
                        name='gitLink'
                        value={inputFeild.gitLink}
                        onChange={changeHandler}
                    />
                </div>

                <div className='flex flex-col gap-1 mt-2'>
                    <label className="font-semibold">Vercel Link</label>
                    <input
                        type='text'
                        placeholder='Enter your Title'
                        className='border rounded-sm h-10 px-3'
                        name='vercelLink'
                        value={inputFeild.vercelLink}
                        onChange={changeHandler}
                    />
                </div>

                <div className='flex flex-col gap-1 mt-2'>
                    <label className="font-semibold">Skills</label>
                    <input
                        type='text'
                        placeholder='Enter your Title'
                        className='border rounded-sm h-10 px-3'
                        name='skills'
                        value={inputFeild.skills}
                        onChange={changeHandler}
                    />
                </div>

                <div className='flex flex-col gap-1 mt-2'>
                    <label className="font-semibold">Enter Description</label>
                    <textarea
                        type='text'
                        placeholder='Enter your Description'
                        className='border rounded-sm h-32 px-3'
                        name='description'
                        value={inputFeild.description}
                        onChange={changeHandler}
                    />
                </div>

                {loading ? (
                    <Button className="w-full my-4" disabled>
                        <Loader2 className='mr-2 h-4 animate-spin my-4' />
                        Please wait
                    </Button>
                ) : (
                    <Button type="submit" className="w-full my-4">Update</Button>
                )}
            </form>



        </div>
    )
}

export default EditProject;
