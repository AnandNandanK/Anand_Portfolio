import { Render } from "./SkillsToolsIcons";
import {
    ReactIcon,
    JavascriptIcon,
    HtmlIcon,
    CssIcon,
    CLang,
    Cpp,
    DSA,
    Node,
    TailwindIcon,
    MongoDb,
    Git,
    GitHub,
    PostMan,
    Express,
    NextJs,
    Vercel
} from "./SkillsToolsIcons";
import {motion,} from "framer-motion";

import { Tilt } from 'react-tilt'
const fadeUp = {
    hidden: { translateY: -45, opacity: 0 },
    visible: { translateY: 0, opacity: 1 },
};

// Reusable IconGrid component
function IconGrid({ title, children }) {
    return (
        <div className="grid grid-cols-4 md:w-[45%] gap-5 row-auto h-max justify-center items-center">
            <h1
                className="dark:bg-white bg-black text-white dark:text-black text-center col-span-4 h-max text-2xl p-2 rounded-lg"
                aria-label={`${title} Heading`}
            >
                {title}
            </h1>

            {children}
        </div>
    );
}

export default function SkillsAndTools() {
    const defaultOptions = {
        reverse: false,         // Reverse the tilt direction
        max: 15,                // Reduce max tilt rotation for smoother effect
        perspective: 1500,      // Higher perspective for more subtle depth
        scale: 1,               // Disable scaling
        speed: 1200,            // Increase speed for a slower tilt transition
        transition: true,       // Enable smooth transition
        axis: null,             // Disable specific axis (X or Y)
        reset: true,            // Reset on mouse leave
        easing: "ease-in-out",  // Smooth easing
    };
    return (
        <div className="h-screen px-5 flex items-center md:mr-0 justify-center">
            <motion.div
                initial="hidden"
                whileInView="visible"
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className=" w-full flex justify-center"
            >

                <div className="w-max sm:w-[50%] h-max md:w-4/5 flex flex-col p-5 space-y-5 md:space-y-0 md:flex-row md:space-x-10 justify-center">

                    {/* Skills Grid */}
                    <IconGrid title="Skills">
                        <CLang />
                        <Cpp />
                        <DSA />
                        <HtmlIcon />
                        <CssIcon />
                        <JavascriptIcon />
                        <TailwindIcon />
                        <ReactIcon />
                        <Node />
                        <Express />
                        <MongoDb />
                        <NextJs />
                    </IconGrid>

                    {/* Tools Grid */}

                    <IconGrid title="Tools" >
                        <Git />
                        <GitHub />
                        <PostMan />
                        <Vercel />
                        <Render />
                    </IconGrid>




                </div>




            </motion.div>



        </div>
    );
}