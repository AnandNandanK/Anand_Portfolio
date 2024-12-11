import React from "react";
import { FaRegCircle } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FaProjectDiagram } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { MdOutlineContactPhone } from "react-icons/md";
import { useSelector } from "react-redux";
import { SiSkillshare } from "react-icons/si";

export default function Sidebar({ onNavigate, activeSection }) {
  const sections = [
    { id: "hero", label: "Hero Section", logo: <CgProfile /> },
    { id: "about", label: "About Me", logo: <FcAbout/> },
    { id: "skills", label: "Skills & Tools", logo: <SiSkillshare />},
    { id: "projects", label: "Projects", logo: <FaProjectDiagram/>},
    { id: "contact", label: "Contact Me", logo:<MdOutlineContactPhone/> },
  ];

  const { theam } = useSelector((store) => store.application);

  return (
    <div className="fixed top-[25%] right-11 w-16 bg-gray-900 rounded-lg text-white p-4 z-50 border border-white hidden lg:block ">

      <div className="flex flex-col items-center gap-12 justify-center py-3">

        {
          sections.map((section,index) => {
            return (
              
              <div key={index} className="flex select-none hover:cursor-pointer "onClick={()=>onNavigate(section.id)}>

                <div className=" flex relative">
                  <ul className="hover:cursor-pointer ">
                      <li className={` ${activeSection===section.id?("scale-0 "):"scale-150 "}`}>
                      {section.logo}
                      </li>
                  </ul>
                
                  
                  {/* <span className={`bg-white rounded-full absolute p-1 left-[30%] top-[30%] ${activeSection === section.id ? ("bg-red-600 transition-colors duration-300") : ""}`}></span> */}
                  {/* <span className={` -left-16 absolute right-0`}>{section.id}</span> */}
                </div>


                {/* <div className="h-3 w-1 bg-lime-400">

                </div> */}



                <div className="text-center flex items-center">

                  <span className={` -left-16 absolute right-0  opacity-0 ${activeSection === section.id ? `${theam?"bg-red-600":"bg-[#8133ef]"} transition-colors duration-500 opacity-100 rounded-l-sm font-semibold text-lg` : ""}`} >{section.label}</span>

                </div>

              </div>

            )

          })
        }
      </div>



    </div>
  );
}
