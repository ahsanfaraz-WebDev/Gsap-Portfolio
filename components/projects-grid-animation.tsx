"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Github, ExternalLink, Code, Database, Globe, X } from "lucide-react";

// Typewriter Hook
function useTypewriter(
  text: string,
  speed: number = 50,
  isActive: boolean = false
) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setDisplayText("");
      setCurrentIndex(0);
      return;
    }

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, isActive]);

  useEffect(() => {
    if (isActive && currentIndex === 0) {
      setDisplayText("");
    }
  }, [isActive, currentIndex]);

  return {
    displayText,
    isComplete: currentIndex === text.length,
  };
}

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  image: string;
  demoUrl?: string;
  codeUrl: string;
  date: string;
  category: string;
  icon: any;
}

const projects: Project[] = [
  {
    id: 1,
    title: "ElevateX Platform",
    description:
      "Designed a full-stack platform using Next.js 15, Sanity, and Tailwind CSS to showcase startup profiles.",
    longDescription:
      "Designed a full-stack platform using Next.js 15, Sanity, and Tailwind CSS to showcase startup profiles. Utilized Next.js features like Server/Client Components, dynamic routing, and data-fetching methods (SSR, SSG, ISR, PPR). Integrated Sanity for content management and NextAuth for secure authentication, enhancing SEO with Next.js Metadata.",
    technologies: [
      "Next.js 15",
      "Sanity CMS",
      "Tailwind CSS",
      "NextAuth",
      "TypeScript",
      "SSR/SSG",
    ],
    image: "/project1.png",
    demoUrl: "#",
    codeUrl: "https://github.com/ahsanfaraz-WebDev",
    date: "Feb 2025",
    category: "Full-Stack",
    icon: Globe,
  },
  {
    id: 2,
    title: "Forever E-Commerce",
    description:
      "Developed a MERN stack e-commerce platform with React, Node.js, Express, and MongoDB.",
    longDescription:
      "Developed a MERN stack e-commerce platform with React, Node.js, Express, and MongoDB. Implemented features like user authentication, product search, cart management, and order tracking. Focused on creating a visually appealing design and responsive layout for an enhanced user experience.",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "JWT",
      "Stripe API",
    ],
    image: "/project2.png",
    demoUrl: "#",
    codeUrl: "https://github.com/ahsanfaraz-WebDev",
    date: "Dec 2024",
    category: "E-Commerce",
    icon: Code,
  },
  {
    id: 3,
    title: "Movie Recommendation",
    description:
      "Built a recommendation system using Node.js and MongoDB to suggest movies based on user preferences.",
    longDescription:
      "Built a recommendation system using Node.js and MongoDB to suggest movies based on user preferences. Integrated MongoDB to manage user data, movies, and recommendation history, with API testing via Postman. Designed the application for a seamless and engaging user experience.",
    technologies: [
      "Node.js",
      "MongoDB",
      "Express",
      "Recommendation AI",
      "RESTful APIs",
    ],
    image: "/project7.png",
    codeUrl: "https://github.com/ahsanfaraz-WebDev",
    date: "Mar 2024",
    category: "Backend",
    icon: Database,
  },
  {
    id: 4,
    title: "Portfolio Website",
    description:
      "A modern, responsive portfolio website built with React and Tailwind CSS.",
    longDescription:
      "A modern, responsive portfolio website built with React and Tailwind CSS. Features smooth animations, interactive elements, and a clean design to showcase projects and skills effectively.",
    technologies: ["React", "Tailwind CSS", "Framer Motion", "TypeScript"],
    image: "/project4.png",
    demoUrl: "#",
    codeUrl: "https://github.com/ahsanfaraz-WebDev",
    date: "Jan 2024",
    category: "Frontend",
    icon: Globe,
  },
  {
    id: 5,
    title: "Task Manager App",
    description:
      "A comprehensive task management application with real-time updates and collaborative features.",
    longDescription:
      "A comprehensive task management application with real-time updates, user authentication, and collaborative features. Built with modern web technologies for optimal performance.",
    technologies: ["Vue.js", "Firebase", "Vuetify", "PWA"],
    image: "/project5.png",
    demoUrl: "#",
    codeUrl: "https://github.com/ahsanfaraz-WebDev",
    date: "Nov 2023",
    category: "Full-Stack",
    icon: Code,
  },
  {
    id: 6,
    title: "Weather Dashboard",
    description:
      "An intuitive weather dashboard that provides real-time weather information and forecasts.",
    longDescription:
      "An intuitive weather dashboard that provides real-time weather information, forecasts, and weather maps. Features location-based services and responsive design.",
    technologies: ["JavaScript", "Weather API", "Chart.js", "CSS3"],
    image: "/project3.png",
    demoUrl: "#",
    codeUrl: "https://github.com/ahsanfaraz-WebDev",
    date: "Oct 2023",
    category: "Frontend",
    icon: Globe,
  },
  {
    id: 7,
    title: "Social Media API",
    description:
      "A robust REST API for social media applications with user management and real-time notifications.",
    longDescription:
      "A robust REST API for social media applications with user management, post creation, comments, likes, and real-time notifications. Implements security best practices and scalable architecture.",
    technologies: ["Node.js", "Express", "MongoDB", "Socket.io", "JWT"],
    image: "/project7.png",
    codeUrl: "https://github.com/ahsanfaraz-WebDev",
    date: "Sep 2023",
    category: "Backend",
    icon: Database,
  },
];

// Project Detail Modal Component
function ProjectModal({
  project,
  isOpen,
  onClose,
}: {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!project) return null;

  const IconComponent = project.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-2 sm:inset-4 md:inset-8 lg:inset-20 z-50 flex items-center justify-center p-2 sm:p-4"
          >
            <div
              className="relative w-full max-w-3xl max-h-[90vh] sm:max-h-[85vh] lg:max-h-[80vh] rounded-xl sm:rounded-2xl border border-gray-800 p-4 sm:p-6 lg:p-8 project-modal overflow-y-auto"
              style={{
                background: "linear-gradient(145deg, #0a0a0a, #1a1a1a)",
                boxShadow:
                  "0 25px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)",
              }}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-2 left-2 sm:top-4 sm:left-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black hover:bg-gray-900 flex items-center justify-center transition-all duration-300 group border border-gray-800 z-10"
                style={{
                  boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                }}
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-gray-300" />
              </button>

              {/* Content */}
              <div className="space-y-4 sm:space-y-6 pl-8 sm:pl-12 pr-4 sm:pr-6">
                {/* Header */}
                <div className="flex items-start space-x-3 sm:space-x-6">
                  <div
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 border border-gray-700"
                    style={{
                      background: "linear-gradient(145deg, #1a1a1a, #0a0a0a)",
                      boxShadow:
                        "0 8px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
                    }}
                  >
                    <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1 sm:mb-2 font-mono break-words">
                      {project.title}
                    </h2>
                    <p className="text-sm sm:text-base text-gray-400 font-mono">
                      {project.category} Project • {project.date}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 font-mono">
                    Project Overview
                  </h3>
                  <p className="text-gray-300 leading-relaxed font-mono text-xs sm:text-sm">
                    {project.description}
                  </p>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 font-mono">
                    Technology Stack
                  </h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-md sm:rounded-lg text-xs text-gray-300 font-mono border border-gray-600"
                        style={{
                          background:
                            "linear-gradient(145deg, #1a1a1a, #0a0a0a)",
                          boxShadow:
                            "0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 sm:gap-3 pt-1 sm:pt-2">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1.5 sm:space-x-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-md sm:rounded-lg bg-white text-black font-mono text-xs sm:text-sm hover:bg-gray-200 transition-all duration-300 hover:scale-105 border border-gray-600"
                      style={{
                        boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                      }}
                    >
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>View Project</span>
                    </a>
                  )}
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1.5 sm:space-x-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-md sm:rounded-lg bg-black text-white font-mono text-xs sm:text-sm hover:bg-gray-900 transition-all duration-300 hover:scale-105 border border-gray-800"
                    style={{
                      boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                    }}
                  >
                    <Github className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>View Code</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function ProjectsGridAnimation() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const setIndex = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const updateGridColumns = () => {
      const cols = new Array(projects.length)
        .fill(null)
        .map((_, i) => (activeIndex === i ? "12fr" : "1fr"))
        .join(" ");

      const list = document.querySelector(".projects-grid");
      if (list) {
        (list as HTMLElement).style.setProperty("grid-template-columns", cols);
      }
    };

    updateGridColumns();
  }, [activeIndex]);

  return (
    <section
      id="projects"
      className="projects-section relative py-12 sm:py-16 lg:py-20 bg-black"
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 px-4">
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-6 tracking-tight"
            style={{ fontFamily: "Urbanist, sans-serif" }}
          >
            PROJECTS
          </h2>
          <div className="w-24 sm:w-32 h-1 bg-white mx-auto mb-4 sm:mb-6 rounded-full"></div>
          <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-[Urbanist] px-4 sm:px-0">
            A showcase of my development projects, featuring modern web
            applications built with cutting-edge technologies and innovative
            solutions.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="flex justify-center px-4 sm:px-0">
          <ul
            className="projects-grid"
            onMouseMove={(e) => {
              if (window.innerWidth >= 768) {
                // Only on desktop
                const closest = (e.target as Element).closest("li");
                if (closest) {
                  const index = Array.from(
                    closest.parentElement?.children || []
                  ).indexOf(closest);
                  setIndex(index);
                }
              }
            }}
            onClick={(e) => {
              const closest = (e.target as Element).closest("li");
              if (closest) {
                const index = Array.from(
                  closest.parentElement?.children || []
                ).indexOf(closest);
                setIndex(index);
              }
            }}
            onTouchStart={(e) => {
              const closest = (e.target as Element).closest("li");
              if (closest) {
                const index = Array.from(
                  closest.parentElement?.children || []
                ).indexOf(closest);
                setIndex(index);
              }
            }}
          >
            {projects.map((project, index) => {
              const IconComponent = project.icon;
              const isActive = activeIndex === index;
              const { displayText, isComplete } = useTypewriter(
                project.description,
                30,
                isActive
              );

              return (
                <li key={project.id} data-active={isActive}>
                  <article>
                    <h3>{project.title}</h3>
                    <IconComponent />
                    <div className="content-container">
                      <p className="typewriter-text">
                        {displayText}
                        {isActive && (
                          <span
                            className={`cursor ${isComplete ? "blink" : ""}`}
                          >
                            |
                          </span>
                        )}
                      </p>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          openModal(project);
                        }}
                      >
                        <span>Open Project</span>
                      </a>
                    </div>
                    <img src={project.image} alt={project.title} />
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

      {/* Grid Animation Styles */}
      <style jsx global>{`
        .projects-grid {
          display: grid;
          container-type: inline-size;
          grid-template-columns: 12fr 1fr 1fr 1fr 1fr 1fr 1fr;
          gap: 8px;
          list-style-type: none;
          justify-content: center;
          padding: 0;
          height: clamp(300px, 50dvh, 600px);
          margin: 0;
          width: min(1100px, 100%);
          max-width: calc(100% - 2rem);
          transition: grid-template-columns 0.6s cubic-bezier(0, 0, 0.2, 1);
        }

        @media (max-width: 768px) {
          .projects-grid {
            display: flex;
            flex-direction: column;
            height: auto;
            min-height: auto;
            gap: 12px;
            max-width: calc(100% - 2rem);
            width: 100%;
            margin-bottom: 2rem;
            margin-top: 0;
            padding: 0 1rem;
          }

          .projects-grid li {
            flex: none;
            min-width: 100%;
            width: 100%;
            border-radius: 12px;
            border: 1px solid #444;
            transition: all 0.3s ease;
          }

          .projects-grid [data-active="true"] {
            min-height: 380px;
            height: 380px;
            border-color: #666;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
          }

          .projects-grid li:not([data-active="true"]) {
            min-height: 70px;
            height: 70px;
            max-height: 70px;
            border-color: #333;
          }
        }

        @media (max-width: 480px) {
          .projects-grid {
            gap: 10px;
            padding: 0 0.5rem;
            max-width: calc(100% - 1rem);
            margin-bottom: 1rem;
          }

          .projects-grid li:not([data-active="true"]) {
            min-height: 60px;
            height: 60px;
            max-height: 60px;
            border-radius: 10px;
          }

          .projects-grid [data-active="true"] {
            min-height: 350px;
            height: 350px;
            border-radius: 16px;
          }

          .projects-grid li:not([data-active="true"]) article h3 {
            font-size: clamp(0.85rem, 3.5vw, 1.1rem);
            font-weight: 600;
          }

          .projects-grid [data-active="true"] article h3 {
            font-size: clamp(1.1rem, 4vw, 1.5rem);
            top: 1rem;
            left: 1rem;
            font-weight: 700;
          }

          .projects-grid [data-active="true"] article .content-container {
            left: 1rem;
            right: 1rem;
            bottom: 1rem;
            top: 3rem;
            padding: 1rem;
            gap: 0.75rem;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            border-radius: 12px;
          }
        }

        .projects-grid li {
          background: #000;
          position: relative;
          overflow: hidden;
          min-width: clamp(2rem, 10cqi, 100px);
          border-radius: 8px;
          border: 1px solid #333;
        }

        @media (max-width: 768px) {
          .projects-grid li {
            min-width: clamp(1.5rem, 8cqi, 80px);
            border-radius: 6px;
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
          }

          .projects-grid li:active {
            transform: scale(0.98);
            transition: transform 0.1s ease;
          }
        }

        /* Grid Animation Effects for Folded Cards */
        .projects-grid li:not([data-active="true"]) {
          position: relative;
        }

        .projects-grid li:not([data-active="true"])::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
              135deg,
              rgba(0, 0, 0, 0.7) 0%,
              rgba(0, 0, 0, 0.3) 50%,
              rgba(0, 0, 0, 0.6) 100%
            ),
            radial-gradient(
              circle at 60% 5%,
              rgba(16, 185, 129, 0.08) 0%,
              rgba(16, 185, 129, 0.03) 15%,
              transparent 60%
            );
          opacity: 1;
          pointer-events: none;
          z-index: 1;
        }

        .projects-grid li:not([data-active="true"])::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image: linear-gradient(
              rgba(16, 185, 129, 0.08) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(16, 185, 129, 0.08) 1px,
              transparent 1px
            );
          background-size: 15px 15px;
          opacity: 1;
          pointer-events: none;
          z-index: 1;
          mask: radial-gradient(
            circle at 60% 5%,
            black 0%,
            black 15%,
            transparent 60%
          );
        }

        .projects-grid li h3 {
          opacity: 1;
          transition: opacity 0.72s cubic-bezier(0, 0, 0.2, 1);
        }

        .projects-grid li svg {
          opacity: 1;
          transition: opacity 0.72s cubic-bezier(0, 0, 0.2, 1);
        }

        .projects-grid li .content-container {
          opacity: 0;
          transition: opacity 0.3s cubic-bezier(0, 0, 0.2, 1);
        }

        .projects-grid li img {
          filter: grayscale(1) brightness(1.5);
          scale: 1.1;
          opacity: 0;
          transition-property: filter, scale, opacity;
          transition-duration: 0.72s;
          transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
        }

        .projects-grid [data-active="true"] .content-container {
          opacity: 1;
          transition-delay: 0.05s;
        }

        .projects-grid [data-active="true"] img {
          filter: grayscale(0) brightness(1.1);
          scale: 1;
          opacity: 1;
          transition-delay: 0.15s;
        }

        .projects-grid article {
          width: 100%;
          height: 100%;
          position: absolute;
          font-family: monospace;
          top: 0;
          left: 0;
          padding-inline: calc(clamp(3rem, 10cqi, 100px) * 0.5 - 12px);
          overflow: hidden;
        }

        .projects-grid article .content-container {
          position: absolute;
          bottom: 1.5rem;
          left: calc(clamp(3rem, 10cqi, 100px) * 0.5);
          right: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.9) 0%,
            rgba(0, 0, 0, 0.7) 50%,
            rgba(0, 0, 0, 0.95) 100%
          );
          padding: 1rem;
          border-radius: 8px;
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .projects-grid article .content-container .typewriter-text {
          flex: 1;
          margin-bottom: 0.75rem;
          overflow-y: auto;
          max-height: calc(100% - 70px);
          font-size: 14px;
          line-height: 1.4;
          color: rgba(255, 255, 255, 0.9);
        }

        .projects-grid article .content-container a {
          margin-top: auto;
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .projects-grid article .content-container .typewriter-text {
            flex: 1;
            margin-bottom: 0.75rem;
            font-size: 0.9rem;
            line-height: 1.5;
            overflow-y: auto;
            max-height: calc(100% - 90px);
            color: rgba(255, 255, 255, 0.95);
            font-weight: 400;
          }

          .projects-grid article .content-container a {
            margin-top: auto;
            padding: 0.75rem 1.5rem;
            font-size: 0.85rem;
            font-weight: 600;
            border-radius: 10px;
            background: linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.15) 0%,
              rgba(255, 255, 255, 0.08) 100%
            );
            border: 1px solid rgba(255, 255, 255, 0.25);
            transition: all 0.3s ease;
            text-align: center;
            backdrop-filter: blur(8px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          }

          .projects-grid article .content-container a:hover {
            background: linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.25) 0%,
              rgba(255, 255, 255, 0.15) 100%
            );
            border-color: rgba(255, 255, 255, 0.4);
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
          }
        }

        @media (max-width: 768px) {
          .projects-grid
            li:not([data-active="true"])
            article
            .content-container {
            display: none;
          }

          .projects-grid [data-active="true"] article .content-container {
            left: 1rem;
            right: 1rem;
            bottom: 1rem;
            top: 3.5rem;
            padding: 1rem;
            gap: 0.75rem;
            background: linear-gradient(
              135deg,
              rgba(0, 0, 0, 0.95) 0%,
              rgba(0, 0, 0, 0.8) 50%,
              rgba(0, 0, 0, 0.98) 100%
            );
            border: 1px solid rgba(255, 255, 255, 0.15);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border-radius: 12px;
          }

          .projects-grid
            [data-active="true"]
            article
            .content-container
            .typewriter-text {
            display: none;
          }
        }

        .projects-grid article h3 {
          position: absolute;
          top: 1.5rem;
          left: calc(clamp(2rem, 10cqi, 100px) * 0.5);
          transform-origin: 0 50%;
          rotate: 90deg;
          font-size: clamp(0.8rem, 3cqi, 1.1rem);
          font-weight: 500;
          text-transform: uppercase;
          font-family: monospace;
          white-space: nowrap;
          margin: 0;
          color: white;
          text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8),
            0 0 10px rgba(0, 0, 0, 0.6);
          z-index: 2;
        }

        @media (max-width: 768px) {
          .projects-grid li:not([data-active="true"]) article h3 {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            rotate: 0deg;
            font-size: clamp(0.9rem, 3.5vw, 1.2rem);
            text-align: center;
            width: 100%;
            font-weight: 600;
          }

          .projects-grid [data-active="true"] article h3 {
            position: absolute;
            top: 1rem;
            left: 1rem;
            transform: none;
            rotate: 0deg;
            font-size: clamp(1.2rem, 4vw, 1.8rem);
            text-align: left;
            width: auto;
            font-weight: 700;
          }
        }

        .projects-grid article svg {
          width: 20px;
          fill: none;
          color: white;
          position: absolute;
          bottom: 1.5rem;
          right: 1.5rem;
          z-index: 2;
        }

        .projects-grid article p {
          font-size: 13px;
          text-wrap: balance;
          line-height: 1.25;
          opacity: 1.1;
          color: white;
          margin: 0;
        }

        .projects-grid article a {
          height: auto;
          line-height: 1.2;
          color: white;
          text-decoration: none;
          width: fit-content;
          padding: 0.5rem 1rem;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.1) 0%,
            rgba(255, 255, 255, 0.05) 100%
          );
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 6px;
          font-size: 13px;
          font-weight: 500;
          transition: all 0.3s ease;
          backdrop-filter: blur(4px);
        }

        .projects-grid article a:is(:focus-visible, :hover) {
          outline: none;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.2) 0%,
            rgba(255, 255, 255, 0.1) 100%
          );
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-1px);
        }

        .projects-grid article a:is(:focus-visible, :hover) span {
          text-decoration: none;
        }

        .projects-grid article a span {
          display: inline-block;
          line-height: 1.2;
          font-weight: 500;
        }

        .projects-grid article img {
          position: absolute;
          pointer-events: none;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          mask: radial-gradient(100% 100% at 100% 0, #fff, rgba(0, 0, 0, 0.3));
        }

        @media (max-width: 768px) {
          .projects-section {
            min-height: auto;
            height: auto;
          }

          .projects-grid {
            width: calc(100% - 2rem);
            height: auto;
            min-height: auto;
            gap: 8px;
          }
        }

        /* Custom Scrollbar Styles - Black and White */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #1a1a1a;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 4px;
          border: 1px solid #444;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }

        ::-webkit-scrollbar-corner {
          background: #1a1a1a;
        }

        /* Firefox Scrollbar */
        * {
          scrollbar-width: thin;
          scrollbar-color: #333 #1a1a1a;
        }

        /* Project Modal Background Effects */
        .project-modal {
          position: relative;
        }

        .project-modal::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at 60% 5%,
            rgba(16, 185, 129, 0.05) 0%,
            rgba(16, 185, 129, 0.02) 15%,
            transparent 60%
          );
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
          z-index: 1;
        }

        .project-modal:hover::before {
          opacity: 1;
        }

        .project-modal::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image: linear-gradient(
              rgba(16, 185, 129, 0.05) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(16, 185, 129, 0.05) 1px,
              transparent 1px
            );
          background-size: 20px 20px;
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
          z-index: 1;
          mask: radial-gradient(
            circle at 60% 5%,
            black 0%,
            black 15%,
            transparent 60%
          );
        }

        .project-modal:hover::after {
          opacity: 1;
        }

        .project-modal > * {
          position: relative;
          z-index: 2;
        }

        /* Typewriter Effect Styles */
        .typewriter-text {
          font-family: monospace;
          white-space: pre-wrap;
          word-wrap: break-word;
        }

        .cursor {
          font-weight: bold;
          color: #10b981;
          font-size: 1.1em;
          animation: none;
        }

        .cursor.blink {
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0%,
          50% {
            opacity: 1;
          }
          51%,
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
