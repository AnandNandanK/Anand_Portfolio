import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { SlCloudUpload } from "react-icons/sl";
import { createProject } from '../../services/operations/auth';
import { useSelector } from "react-redux"
import { useDispatch } from 'react-redux';

const CreateProjects = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // State for form data
    const [inputFeild, setInputFeild] = useState({
        title: "",
        gitLink: "",
        vercelLink: "",
        skills: "",
        file: null,  // To store image file
        description: "",
        previewUrl:null
    });

    const { token } = useSelector(store => store.auth)
    // console.log("Printing Token",token);

    // Handle input field changes
    const changeHandler = (e) => {
        setInputFeild({ ...inputFeild, [e.target.name]: e.target.value });
    };

    // Handle file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0];  // Get the first file
        const previewUrl = URL.createObjectURL(file)
        setInputFeild({ ...inputFeild, file,previewUrl });  // Store the file's URL to display in img tag
    };

    const formData = new FormData();
    formData.append("title", inputFeild.title)
    formData.append("gitLink", inputFeild.email)
    formData.append("vercelLink", inputFeild.vercelLink)
    formData.append("description", inputFeild.description)
    formData.append("skills", inputFeild.skills)
    if (inputFeild.file) formData.append("file", inputFeild.file);

    const {projects}=useSelector((state)=>state.application)

    console.log(projects?.data)

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
        dispatch(createProject(formData, token , projects.data, navigate));
    };

    return (
        <div className='h-full w-screen bg-white flex justify-center'>

<form onSubmit={handleOnSubmit} className='w-[90%] lg:w-1/2 md:w-1/2 border shadow-lg border-gray-200 rounded-md p-4 my-10 bg-white bg-opacity-80'>
            <h1 className='font-bold text-xl mb-5 w-full text-center'>Create Project</h1>

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

            <Button type="submit" className="w-full my-4">Create Project</Button>
        </form>

        </div>
        
    );
}

export default CreateProjects;
