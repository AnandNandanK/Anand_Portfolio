import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from 'react-router-dom';
import { SlCloudUpload } from "react-icons/sl";
import { useSelector, useDispatch } from "react-redux";
import Dashboard from './dashboard';
import { updateProject } from '../../services/operations/auth.js';
import UseGetProjectById from '../../hooks/useGetProjectById';
import { Loader2 } from 'lucide-react';

const EditProject = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const paramsId = params.id;

    // Fetch project data using custom hook
    UseGetProjectById(params.id, navigate);

    const { singleProject } = useSelector((state) => state.application);
    const { token, loading } = useSelector((store) => store.auth);

    // State for form data
    const [inputFeild, setInputFeild] = useState({
        title: "",
        gitLink: "",
        vercelLink: "",
        skills: "",
        file: null, // To store image file
        description: "",
        previewUrl: null
    });

    // Update form state when `singleProject` changes
    useEffect(() => {
        if (singleProject) {
            setInputFeild({
                title: singleProject.title || "",
                gitLink: singleProject.gitLink || "",
                vercelLink: singleProject.vercelLink || "",
                skills: singleProject.skills || "",
                file: null, // Reset file
                description: singleProject.description || "",
                previewUrl: null // Reset preview
            });
        }
    }, [singleProject]);

    // Handle input field changes
    const changeHandler = (e) => {
        setInputFeild({ ...inputFeild, [e.target.name]: e.target.value });
    };

    // Handle file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const previewUrl = URL.createObjectURL(file);
        setInputFeild({ ...inputFeild, file, previewUrl });
    };

    // Handle form submission
    const handleOnSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", inputFeild.title);
        formData.append("gitLink", inputFeild.gitLink);
        formData.append("vercelLink", inputFeild.vercelLink);
        formData.append("description", inputFeild.description);
        formData.append("skills", inputFeild.skills);
        if (inputFeild.file) {
            formData.append("file", inputFeild.file);
        }

        dispatch(updateProject(formData, token, paramsId, navigate));
    };

    return (
        <div className='w-screen bg-white mx-auto flex justify-center items-center'>
            <Dashboard />
            <form onSubmit={handleOnSubmit} className='w-[90%] lg:w-1/2 md:w-1/2 border shadow-lg border-gray-200 rounded-md p-4 my-10 bg-white bg-opacity-80'>
                <h1 className='font-bold text-xl mb-5 w-full text-center'>Edit Project</h1>
                <div className='w-full flex justify-center'>
                    <div className='w-full h-[250px] flex justify-center items-center border rounded-md hover:cursor-pointer'>
                        {inputFeild.previewUrl ? (
                            <img src={inputFeild.previewUrl} alt="Project" className="w-full h-full object-cover rounded-md" />
                        ) : (
                            <SlCloudUpload size={70} className='font-light opacity-70' />
                        )}
                    </div>
                </div>
                <div className='flex flex-col gap-1 mt-2'>
                    <label className="font-semibold">Upload Project Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="border rounded-sm h-full"
                    />
                </div>
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
                        placeholder='Enter your Git link'
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
                        placeholder='Enter your Vercel Link'
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
                        placeholder='Enter your Skills'
                        className='border rounded-sm h-10 px-3'
                        name='skills'
                        value={inputFeild.skills}
                        onChange={changeHandler}
                    />
                </div>
                <div className='flex flex-col gap-1 mt-2'>
                    <label className="font-semibold">Enter Description</label>
                    <textarea
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
    );
};

export default EditProject;
