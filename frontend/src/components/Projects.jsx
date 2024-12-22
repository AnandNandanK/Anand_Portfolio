import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { IoIosLink } from "react-icons/io";
import { Tilt } from "react-tilt";
import { Button } from "@/components/ui/button";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import UseGetAllProjects from "../hooks/useGetAllProjects";

const fadeUp = {
  hidden: { translateY: -45, opacity: 0 },
  visible: { translateY: 0, opacity: 1 },
};

const dummyProjects = [
  {
    title: "Studynotion",
    description: "This is an edtech platform built using the MERN stack. ",
    projectImage: "projectlogo.jpg",
    logo: ["css.png", "github.png", "gitlab.png", "js.png", "physics.png", "html-5.png"],
  },
  {
    title: "Studynotion",
    description: "This is an edtech platform built using the MERN stack.",
    projectImage: "projectlogo.jpg",
    logo: ["css.png", "github.png", "gitlab.png", "js.png", "physics.png", "html-5.png"],
  },
  {
    title: "Studynotion",
    description: "This is an edtech platform built using the MERN stack.",
    projectImage: "projectlogo.jpg",
    logo: ["css.png", "github.png", "gitlab.png", "js.png", "physics.png", "html-5.png"],
  },
];



const Projects = () => {

  UseGetAllProjects();
  // Handler to toggle "Read More" for a specific project
  const [readMore, setReadMore] = useState({});
  const readMoreHandler = (index) => {
    setReadMore((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };


  const { projects } = useSelector((state) => state.application);
  // console.log("PRINTING PROJECTS TO USE IT", projects?.data);
  const { theam } = useSelector((store) => store.application);

  return (
    <div className="max-w-7xl mx-auto h-screen flex items-center justify-center px-2 lg:px-8">
      <div className="w-full flex flex-col gap-6 items-center justify-center lg-mr-20">
        <p className="lg:hidden block text-4xl shadow-lg px-6 py-3 rounded-sm text-orange-500 font-semibold font-serif">Projects</p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="lg:max-w-[76%] max-w-[95%] "
        >
          <Carousel opts={{ align: "start" }} className="">
            <CarouselContent className="w-full">
              {projects?.data?.map((project, index) => (
                <CarouselItem className="w-full lg:basis-1/2" key={index}>

                  <div
                    className={`flex flex-col gap-4 text-xl rounded-lg border-l-4 ${theam
                        ? "bg-black border-white text-white"
                        : "bg-white border-black text-black"
                      } p-4 transition-all duration-200`}
                  >
                    {/* Project Image and Logos */}
                    <div className="w-full lg:flex-row flex gap-3 flex-col">
                      <img
                        src={project.projectPhoto}
                        alt={project.title}
                        className="lg:w-[250px] lg:h-[150px] object-fill rounded-md"
                      />
                      <div className="grid  lg:grid-cols-3  grid-cols-6 gap-2 h-[50px]  ">
                        {dummyProjects[0].logo.map((logo, logoIndex) => (
                          <img src={logo} key={logoIndex} className="w-[100%] object-fill block" />
                        ))}
                      </div>
                    </div>

                    {/* Title and Description */}
                    <h1 className="font-bold text-xl sm:text-2xl">{project.title}</h1>
                    <p className="text-sm sm:text-base">
                      {!readMore[index]
                        ? project.description.slice(0, 150)
                        : project.description}{" "}
                      <span
                        className="text-blue-400 hover:cursor-pointer font-semibold"
                        onClick={() => readMoreHandler(index)}
                      >
                        {!readMore[index] ? "Read More..." : "Show less..."}
                      </span>
                    </p>
                    {/* Actions */}
                    <div className="flex items-center gap-4">
                      <Button className="bg-[#741FED] px-4 py-2 border-white border w-fit hover:bg-white hover:text-blue-400 transition-all duration-200">
                        Read More
                      </Button>
                      <a href={project.gitLink} target="blank">
                        <FaGithub className="text-lg sm:text-xl hover:text-red-600 cursor-pointer" />
                      </a>

                      <a href={project.vercelLink} target="blank" >
                        <IoIosLink className="text-lg sm:text-xl hover:text-red-600 cursor-pointer" />


                      </a>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="hidden lg:flex" />
            <CarouselNext className="hidden lg:flex" />
          </Carousel>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
