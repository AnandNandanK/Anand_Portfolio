import React from 'react';
import { Tilt } from 'react-tilt'
import { Button } from "@/components/ui/button"
import { FaExternalLinkAlt } from "react-icons/fa";

import { useRef } from "react";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    MotionValue
} from "framer-motion";
import { useSelector } from 'react-redux';


const fadeUp = {
    hidden: { translateY: -45, opacity: 0 },
    visible: { translateY: 0, opacity: 1 },
};

const paragraph = [
    "I'm Anand, a passionate web developer who started this journey at the beginning of 2023.After building a solid foundation in the basics, I quickly moved on to advanced topics, applying my skillsby creating small projects like landing pages and resume pages. My coding journey began in 2021,",
    "I'm Anand, a passionate web developer who started this journey at the beginning of 2023.After building a solid foundation in the basics, I quickly moved on to advanced topics, applying my skillsby creating small projects like landing pages and resume pages. My coding journey began in 2021,",
    "I'm Anand, a passionate web developer who started this journey at the beginning of 2023.After building a solid foundation in the basics, I quickly moved on to advanced topics, applying my skillsby creating small projects like landing pages and resume pages. My coding journey began in 2021,"
]


const AboutMe = () => {


    const { theam } = useSelector((store) => store.application);

    return (
        <div className='h-screen px-5 flex items-center sm:mr-0 md:mr-0 lg:mr-16'>
            <div className=' max-w-[1200px] mx-auto bg-blend-color-burn opacity-100  flex max-sm:flex-col lg:text-base text-sm items-center gap-7'>
                
                
                {/* <p className='rounded-sm text-6xl text-white font-bold font-serif'>About Me</p> */}

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    variants={fadeUp}
                    transition={{ duration: 0.5 }}
                    className=" flex flex-col items-center "
                >
                    {/* <p className='px-10 bg-blue-50 text-black py-4 w-fit font-bold'>About Me</p> */}
                    {/* <p className='mt-16'>About Me</p> */}
                    <div className='flex justify-between gap-4 w-full flex-col '>
                        {
                            paragraph.slice(0, 1).map((para, index) => {
                                return (
                                    <p key={index} className={` max-w-[500px] ${theam ? "bg-[#1f1c2d] text-white" : "bg-white text-black bg-opacity-85"}  py-3 lg:px-10 md:px-10 p-3 translate-x-50 transition-transform  will-change-transform duration-200 lg:rounded-br-[100px] lg:rounded-tl-[100px] md:rounded-br-[100px] md:rounded-tl-[100px] border-l-4 border-orange-500 `}>
                                        {para}
                                    </p>
                                )
                            })
                        }
                        {
                            paragraph.slice(1, 2).map((para, index) => {
                                return (
                                    <p key={index} className={` max-w-[500px] w-full ${theam ? "bg-[#1f1c2d] text-white " : "bg-white text-black bg-opacity-85"}  p-3  transition-transform  will-change-transform duration-200 rounded-md border-b-4 border-orange-500`}>
                                        {para}
                                    </p>
                                )
                            })
                        }

                    </div>

                    <div className='flex flex-col justify-between w-full'>



                    </div>



                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    variants={fadeUp}
                    transition={{ duration: 0.5 }}
                    className=" flex flex-col gap-2 mt-3 items-center"
                >

                    <div  className={` flex flex-col  gap-3 max-w-[500px] w-full ${theam ? "bg-[#1f1c2d] text-white " : "bg-white text-black bg-opacity-85"}  p-3  transition-transform  will-change-transform duration-200 rounded-md border-b-4 border-orange-500`}>
                        <div className='w-full'>
                        <h1 className='text-xl font-bold text-orange-500'>Education </h1>
                            
                            <ol className='list-disc pl-5'>
                                <li>10th 60% from Evergreen Public school</li>
                                <li>12th 83% from Atal adharsh vidyalay moti magh</li>
                                <li>BCA 88% Institute of innovation in technology</li>
                                <li>Currently Purcuing MCA from Amity University</li>
                            </ol>

                        </div>

                        <div className='w-full'>

                        <h1 className=' text-lg font-bold text-orange-500 '>Certificates</h1>
                            <ol className='list-disc pl-5 '>
                                <li className='flex items-center gap-2 underline'>Mern Stack <FaExternalLinkAlt className='size-3'/></li>
                                <li className='flex items-center gap-2 underline'>DSA <FaExternalLinkAlt className='size-3'/></li>
                                <li className='flex items-center gap-2 underline'>Internship <FaExternalLinkAlt className='size-3'/></li>
                            </ol>
                        </div>
       
                    </div>



                    {/* {
                        paragraph.slice(1, 2).map((para, index) => {
                            return (
                                <p key={index}}>
                                    {para}
                                </p>
                            )
                        })
                    } */}


                    
                    {/* <Tilt options={defaultOptions}>
                      
                        <img src='./resume.png' className='h-80'></img>
                    
                        
                    </Tilt> */}

                    {/* <Button className="bg-orange-600 w-fit" href="./resume.png" download={'./resume.png'} >Download</Button> */}

                </motion.div>
                {/* <button className='bg-yellow-300 p-3 px-7 mt-4 rounded-md '>See My Work</button> */}

            </div>

        </div>

    );
}

export default AboutMe;
