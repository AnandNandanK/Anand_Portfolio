import React, { useState } from 'react'
import { Tilt } from 'react-tilt'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  
  export default function HeroSection() {

    const defaultOptions = {
        reverse: false,
        max: 15,
        perspective: 1500,
        scale: 1,
        speed: 4000,
        transition: true,
        axis: null,
        reset: true,
        easing: "ease-in-out",
    };
    
    const {theam} =useSelector((store)=>store.application)
    const {profile} = useSelector(store => store.application)
    console.log(profile)
    

    return (
        <div className="h-screen max-w-[1200px] mx-auto px-3 relative flex items-center overflow-y-hidden">
            <div className='mt-10 w-full'>
            <motion.div
                className={` rounded-tl-[100px] rounded-br-[100px] `}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                
            >
                <Tilt
                    options={defaultOptions}
                    className={`w-fit py-14 px-12 ${theam?"bg-[#1f1c2d] ":"bg-white bg-opacity-90"} animate-borderPulse rounded-tl-[100px] rounded-br-[100px] flex items-center justify-center border-[#0919F7] border`}
                >
                    <div className="min-h-[250px] max-w-[400px]">
                        <div className="flex flex-col gap-2 justify-center">
                            <p className={`${theam?"text-white transition-all duration-300":"text-black transition-all duration-300"}  text-5xl font-serif`}>Hii!</p>
                            <p className={`${theam?"text-white transition-all duration-300":"text-black transition-all duration-300"}  text-2xl font-serif`}>
                                I am a <span className={`${theam?"text-orange-600 transition-all duration-300":"text-[#8133ef] transition-all duration-300"} font-serif`}>{profile?.data?.title}</span>
                            </p>
                            <p className={`${theam?"text-white transition-all duration-300":"text-black transition-all duration-300"} text-lg font-serif`}>
                               {profile?.data?.myself}
                            </p>
                            <button className="bg-[#8133ef] font-serif text-white p-2 px-4 w-fit border-[1.5px] border-white mt-3">
                                Know More
                            </button>
                        </div>
                    </div>
                </Tilt>
            </motion.div>

            </div>
           
        </div>
    );
}
