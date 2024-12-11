import React, { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import AboutMe from "./AboutMe";
import Projects from "./Projects";
import Contactme from "./contactme";
import Sidebar from "./Sidebar";
import SkillsAndTools from "./SkillsAndTools";
export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");

  const sections = [
    { id: "hero", Component: HeroSection },
    { id: "about", Component: AboutMe },
    { id: "skills", Component: SkillsAndTools},
    { id: "projects", Component: Projects },
    { id: "contact", Component: Contactme },
  ];

  // Function to scroll smoothly to a section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 } // Trigger when 60% of the section is visible
    );

    sections.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="relative">
      <Navbar onNavigate={scrollToSection} />
      <Sidebar onNavigate={scrollToSection} activeSection={activeSection} />
      <div
        className={`snap-y snap-mandatory overflow-y-scroll h-screen ${
          activeSection !== "hero" ? "backdrop-blur-sm " : ""
        }`}
      >
        {sections.map(({ id, Component }) => (
          <section key={id} id={id} className="snap-start min-h-screen overflow-y-hidden overflow-x-hidden">
            <Component />
          </section>
        ))}
      </div>
    </div>
  );
}
