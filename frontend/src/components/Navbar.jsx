import React, { useState } from 'react';
import { FaMoon } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineLightMode } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { setTheam } from "../redux/slice/applicationSlice.js";


export default function Navbar({ onNavigate }) {
  const [menu, setMenu] = useState(false);
  const dispatch = useDispatch();

  // Accessing the theme directly from Redux state
  const { theam } = useSelector((store) => store.application);

  const handleThemeToggle = () => {
    dispatch(setTheam(!theam)); // Dispatching the opposite of the current theme
  };

  return (
    <div className={`w-full bg-[#251A34] bg-opacity-75 border-b-4 border-[#741FED] px-3 fixed top-0 z-50 select-none`}>
      <div className="max-w-[1200px] mx-auto py-4 flex justify-between items-center">
        <h1 className="text-orange-500 text-3xl font-semibold flex gap-1 items-center select-none">
          Anand<span className="text-white text-3xl">PORTFOLIO</span>
        </h1>

        {menu && (
          <>
            <motion.div
              className="box w-full hidden lg:block"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <ul className="flex text-white text-lg select-none justify-between mx-20 transition-all duration-300">
                <li
                  className="hover:text-[#741FED] duration-200 ease-in-out cursor-pointer"
                  onClick={() => onNavigate('hero')}
                >
                  Profile
                </li>
                <li
                  className="hover:text-[#741FED] duration-200 ease-in-out cursor-pointer"
                  onClick={() => onNavigate('about')}
                >
                  About
                </li>
                <li
                  className="hover:text-[#741FED] duration-200 ease-in-out cursor-pointer"
                  onClick={() => onNavigate('skills')}
                >
                  Skills
                </li>
                <li
                  className="hover:text-[#741FED] duration-200 ease-in-out cursor-pointer"
                  onClick={() => onNavigate('projects')}
                >
                  Projects
                </li>
                <li
                  className="hover:text-[#741FED] duration-200 ease-in-out cursor-pointer"
                  onClick={() => onNavigate('contact')}
                >
                  Contact
                </li>
              </ul>


            </motion.div>

            <motion.div
              className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            > 

            

              <ul className="bg-white w-11/12 max-w-sm p-6 rounded-lg text-center space-y-4 text-lg text-black relative">
              <RxCross1 className='size-6 absolute right-3 top-3 text-red-500 ' onClick={()=>{setMenu(false)}}/>
                <li
                  className="hover:text-[#741FED] duration-200 ease-in-out cursor-pointer"
                  onClick={() => onNavigate('hero')}
                >
                  Profile
                </li>
                <li
                  className="hover:text-[#741FED] duration-200 ease-in-out cursor-pointer"
                  onClick={() => onNavigate('about')}
                >
                  About
                </li>
                <li
                  className="hover:text-[#741FED] duration-200 ease-in-out cursor-pointer"
                  onClick={() => onNavigate('skills')}
                >
                  Skills
                </li>
                <li
                  className="hover:text-[#741FED] duration-200 ease-in-out cursor-pointer"
                  onClick={() => onNavigate('projects')}
                >
                  Projects
                </li>
                <li
                  className="hover:text-[#741FED] duration-200 ease-in-out cursor-pointer"
                  onClick={() => onNavigate('contact')}
                >
                  Contact
                </li>
              </ul>
            </motion.div>
          </>

        )}

        <div className="flex gap-1 items-center justify-between">
          {/* Hamburger Menu */}
          <div
            className="hover:cursor-pointer group select-none"
            onClick={() => setMenu(!menu)}
          >
            <p className="text-white text-lg font-semibold border-2 group-hover:border-[#741FED] border-white p-2 flex gap-1 items-center group-hover:text-[#741FED] duration-300 ease-in-out">
              {menu ? (
                <motion.div
                  className="box"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 90 }}
                >
                  <RxCross1 className="text-white group-hover:text-[#741FED] duration-300 ease-in-out" />
                </motion.div>
              ) : (
                <motion.div
                  className="box"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <GiHamburgerMenu className="text-white group-hover:text-[#741FED] duration-300 ease-in-out" />
                </motion.div>
              )}
              Menu
            </p>
          </div>

          {/* Theme Toggle */}
          <div className="p-1 rounded-md w-4">
            {!theam ? (
              <FaMoon
                className="text-white hover:text-orange-600 duration-200 ease-in-out size-5"
                onClick={handleThemeToggle}
              />
            ) : (
              <MdOutlineLightMode
                className="text-white hover:text-orange-600 duration-200 ease-in-out size-6"
                onClick={handleThemeToggle}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
