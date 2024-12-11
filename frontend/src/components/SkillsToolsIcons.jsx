import {
    FaReact,
    FaHtml5,
    FaCss3Alt,
    FaLaptopCode,
    FaNodeJs,
    FaGitAlt,
    FaGithub,
  } from "react-icons/fa";
  import { RiJavascriptFill, RiTailwindCssFill } from "react-icons/ri";
  import { SiMongodb, SiPostman, SiExpress, SiNextdotjs } from "react-icons/si";
  import { TbBrandCpp } from "react-icons/tb";
  import { FaC } from "react-icons/fa6";
  import { IoLogoVercel } from "react-icons/io5";
  import { SiRender } from "react-icons/si";
  
  // Reusable IconWrapper component
  function IconWrapper({ IconComponent, label, bgColor, iconColor, labelColor }) {
    return (
      <div
        className={`group px-2 py-0.5 aspect-square rounded-lg w-full text-6xl hover:scale-[1.15] transition-transform duration-300 flex justify-center items-center ${bgColor}`}
      >
        <IconComponent
          className={`${iconColor} group-hover:opacity-0 group-hover:hidden transition-opacity duration-500`}
        />
        <div
          className={`hidden  text-center  cursor-default  text-xs md:text-base group-hover:block group-hover:opacity-1 transition-opacity ${labelColor}`}
        >
          {label}
        </div>
      </div>
    );
  }
  
  // Individual icon components using IconWrapper
  export function ReactIcon() {
    return (
      <IconWrapper
        IconComponent={FaReact}
        label="React Js"
        bgColor="bg-slate-700"
        iconColor="text-sky-400"
        labelColor="text-white"
      />
    );
  }
  
  export function JavascriptIcon() {
    return (
      <IconWrapper
        IconComponent={RiJavascriptFill}
        label="JavaScript"
        bgColor="bg-black"
        iconColor="text-yellow-300"
        labelColor="text-white"
      />
    );
  }
  
  export function HtmlIcon() {
    return (
      <IconWrapper
        IconComponent={FaHtml5}
        label="HTML"
        bgColor="bg-white"
        iconColor="text-orange-500"
        labelColor="text-black"
      />
    );
  }
  
  export function CssIcon() {
    return (
      <IconWrapper
        IconComponent={FaCss3Alt}
        label="CSS"
        bgColor="bg-white"
        iconColor="text-sky-500"
        labelColor="text-black"
      />
    );
  }
  export function NextJs() {
    return (
      <IconWrapper
        IconComponent={SiNextdotjs}
        label="Next Js"
        bgColor="bg-white"
        iconColor="text-black"
        labelColor="text-black"
      />
    );
  }
  export function CLang() {
    return (
      <IconWrapper
        IconComponent={FaC}
        label="C lang"
        bgColor="bg-blue-700"
        iconColor="text-white"
        labelColor="text-white"
      />
    );
  }
  
  export function Cpp() {
    return (
      <IconWrapper
        IconComponent={TbBrandCpp}
        label="C++ lang"
        bgColor="bg-blue-500"
        iconColor="text-white"
        labelColor="text-white"
      />
    );
  }
  
  export function DSA() {
    return (
      <IconWrapper
        IconComponent={FaLaptopCode}
        label="DSA"
        bgColor="bg-amber-400"
        iconColor="text-black"
        labelColor="text-black"
      />
    );
  }
  
  export function Node() {
    return (
      <IconWrapper
        IconComponent={FaNodeJs}
        label="Node Js"
        bgColor="bg-white"
        iconColor="text-green-600"
        labelColor="text-black"
      />
    );
  }
  
  export function TailwindIcon() {
    return (
      <IconWrapper
        IconComponent={RiTailwindCssFill}
        label="Tailwind"
        bgColor="bg-slate-800"
        iconColor="text-sky-400"
        labelColor="text-white"
      />
    );
  }
  
  export function MongoDb() {
    return (
      <IconWrapper
        IconComponent={SiMongodb}
        label="Mongo DB"
        bgColor="bg-white"
        iconColor="text-green-600"
        labelColor="text-black"
      />
    );
  }
  
  export function Git() {
    return (
      <IconWrapper
        IconComponent={FaGitAlt}
        label="Git"
        bgColor="bg-white"
        iconColor="text-orange-600"
        labelColor="text-black"
      />
    );
  }
  
  export function GitHub() {
    return (
      <IconWrapper
        IconComponent={FaGithub}
        label="GitHub"
        bgColor="bg-white"
        iconColor="text-black"
        labelColor="text-black"
      />
    );
  }
  
  export function PostMan() {
    return (
      <IconWrapper
        IconComponent={SiPostman}
        label="PostMan"
        bgColor="bg-white"
        iconColor="text-orange-600"
        labelColor="text-black"
      />
    );
  }
  
  export function Express() {
    return (
      <IconWrapper
        IconComponent={SiExpress}
        label="Express Js"
        bgColor="bg-white"
        iconColor="text-black"
        labelColor="text-black"
      />
    );
  }
  
  export function Vercel() {
    return (
      <IconWrapper
        IconComponent={IoLogoVercel}
        label="Vercel"
        bgColor="bg-white"
        iconColor="text-black"
        labelColor="text-black"
      />
    );
  }
  export function Render() {
    return (
      <IconWrapper
        IconComponent={SiRender}
        label="Render"
        bgColor="bg-white"
        iconColor="text-black"
        labelColor="text-black"
      />
    );
  }