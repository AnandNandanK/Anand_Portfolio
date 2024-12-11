import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function useParallax(value, distance) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function YscrollComponent({ Component }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);

  return (
    <section className="h-screen flex justify-center items-center snap-center perspective-500">
      <motion.div
        ref={ref}
        className="w-screen h-screen relative m-5 overflow-hidden"
        style={{ y }}
      >
        <Component />
      </motion.div>
    </section>
  );
}

export default YscrollComponent;
