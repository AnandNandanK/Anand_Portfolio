import React, { useState } from 'react';
import Footer from './Footer';
import { Button } from "@/components/ui/button";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    MotionValue
} from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';

import { contactAdmin } from '../services/operations/auth';


const fadeUp = {
    hidden: { translateY: -45, opacity: 0 },
    visible: { translateY: 0, opacity: 1 },
};




const Contactme = () => {
    const { theam } = useSelector((store) => store.application)
    const dispatch = useDispatch();

    // State for form data
    const [inputFeild, setInputFeild] = useState({
        name: "",
        email: "",
        message: ""
    });

    const {name,email,message}=inputFeild;

    const { token } = useSelector(store => store.auth)

    // Handle input field changes
    const changeHandler = (e) => {
        setInputFeild({ ...inputFeild, [e.target.name]: e.target.value });
    };


    // Handle form submission
    const handleOnSubmit = (e) => {
        e.preventDefault();
        console.log(name, email, message, token)
        dispatch(contactAdmin(name, email, message, token));

         // Reset input fields
         setInputFeild({
            name: "",
            email: "",
            message: ""
        });

    };




    return (
        <div className={`${theam ? "bg-[#000000]" : "bg-white bg-opacity-85 drop-shadow-sm"} mx-auto h-screen flex flex-col justify-between px-3 `}>

            <motion.div
                initial="hidden"
                whileInView="visible"
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-4"
            >
                <div className='max-w-[1000px] mx-auto flex-col md:flex-row justify-between gap-20 items-center lg:flex-row lg:flex '>



                    <form onSubmit={handleOnSubmit} className={`flex flex-col items-center justify-center  ${theam ? "bg-[#1f1c2d]" : " bg-[#741FED] bg-opacity-75"} w-full gap-3 rounded-md py-3 mt-28 drop-shadow-lg`}>
                        <p className=' text-3xl font-bold text-orange-600 '>Contact me</p>

                        <div className=' flex flex-col gap-1 w-full px-5'>
                            <label className={`${theam ? "text-white" : "text-black"} font-semibold  `}>Name</label>
                            <input type='text'
                                className='px-3 h-8 rounded-sm'
                                name='name'
                                value={inputFeild.name}
                                onChange={changeHandler}
                            ></input>
                        </div>

                        <div className=' flex flex-col gap-1 w-full px-5'>
                            <label className={`${theam ? "text-white" : "text-black"} font-semibold  `}>Email</label>
                            <input type='text' className='px-3 h-8 rounded-sm'
                            name='email'
                            value={inputFeild.email}
                            onChange={changeHandler}
                            ></input>
                        </div>

                        <div className=' flex flex-col gap-1 w-full px-5'>
                            <label className={`${theam ? "text-white" : "text-black"} font-semibold  `}>Message</label>
                            <textarea type='text-area' className='h-32 p-3 rounded-sm'
                            name='message'
                            value={inputFeild.message}
                            onChange={changeHandler}
                            ></textarea>
                        </div>

                        <Button type="submit" className=" py-5 border border-white px-9 text-lg">Contact me</Button>
                    </form>


                    <div className='mt-24 flex flex-col'>
                        <p className={` text-lg ${theam ? "text-white" : "text-black"} font-serif `}>Feel free to reach out for collaborations, project inquiries, or just to say hello!
                            Connect with me on</p>

                        <h1 className='text-[#741FED] text-8xl font-bold font-serif opacity-50 rounded-md p-6 '>Anand</h1>

                    </div>




                </div>






                {/* <Footer /> */}
            </motion.div>


        </div>

    );
}

export default Contactme;
