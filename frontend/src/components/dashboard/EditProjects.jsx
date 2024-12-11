import React, { useState } from 'react';
import Dashboard from './dashboard';
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from 'react-redux';
import UseGetAllProjects from '../../hooks/useGetAllProjects';
import { useParams } from "react-router"
import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { deleteProject } from '../../services/operations/auth';

const EditProjects = () => {

    UseGetAllProjects();

    const dispatch = useDispatch();

    const { projects } = useSelector((state) => state.application)
    const { theam } = useSelector((store) => store.application);


    console.log("PRINTING PROJECT.....", projects)
    const { token } = useSelector(store => store.auth)

    const handleDelete = (id) => {

        console.log(id, token)
        dispatch(deleteProject(id, token));
    }

    // Handler to toggle "Read More" for a specific project
    const [readMore, setReadMore] = useState({});
    const readMoreHandler = (index) => {
        setReadMore((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };


    return (
        <div className='max-w-[1200px] bg-white mx-auto '>
            <Dashboard />

            <h1 className='text-3xl font-bold text-center'>Edit Projects</h1>

            <div className='flex justify-center items-center mt-20'>

                <div className='grid grid-cols-4 gap-5'>

                    {
                        projects?.data?.map((project, index) => {
                            return (
                                <div
                                    className={`flex flex-col gap-4 text-xl rounded-lg border-l-4 shadow-lg ${theam
                                        ? "bg-black border-white text-white"
                                        : "bg-white border-black text-black"
                                        } p-4 transition-all duration-200`}
                                >
                                    {/* Project Image and Logos */}
                                    <div className="w-full lg:flex-row flex gap-3 flex-col">
                                        <img
                                            src={project.projectPhoto}
                                            alt={project.title}
                                            className="lg:w-[250px] lg:h-[150px]   rounded-md"
                                        />
                                        <div className="grid  lg:grid-cols-3  grid-cols-6 gap-2 h-[50px]  ">
                                            {/* {dummyProjects?.logo?.map((logo, logoIndex) => (
                                                <img src={logo} key={logoIndex} className="w-[100%] object-fill block" />
                                            ))} */}
                                        </div>
                                    </div>

                                    {/* Title and Description */}
                                    <h1 className="font-bold text-xl sm:text-2xl">{project.title}</h1>
                                    <p className="text-sm sm:text-base">
                                        {!readMore[index]
                                            ? project.description.slice(0, 100)
                                            : project.description}{" "}
                                        <span
                                            className="text-blue-400 hover:cursor-pointer font-semibold"
                                            onClick={() => readMoreHandler(index)}
                                        >
                                            {!readMore[index] ? "Read More..." : "Show less..."}
                                        </span>
                                    </p>
                                    {/* Actions */}
                                    <div className="flex items-center gap-4 ">
                                        <Link to={`/dashboard/editprojects/${project._id}`}>
                                            <Button className="bg-[#741FED] px-4 py-2 border-white border w-fit hover:bg-white hover:text-blue-400 transition-all duration-200">
                                                Edit Project <FaRegEdit />
                                            </Button>
                                        </Link>

                                        <Button className="bg-red-600 px-4 py-2 border-white border w-fit hover:bg-white hover:text-blue-400 transition-all duration-200" onClick={() => handleDelete(project._id)}>
                                            Delete <MdDelete />
                                        </Button>

                                    </div>
                                </div>
                            )
                        })
                    }

                </div>


            </div>

        </div>
    );
}

export default EditProjects;
