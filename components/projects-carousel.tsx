"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Github, ExternalLink, Code, Database, Globe, X } from 'lucide-react'

interface Project {
  id: number
  title: string
  description: string
  longDescription: string
  technologies: string[]
  image: string
  demoUrl?: string
  codeUrl: string
  date: string
  category: string
  icon: any
}

const projects: Project[] = [
  {
    id: 1,
    title: "ElevateX Platform",
    description: "Startup Directory Platform",
    longDescription: "Designed a full-stack platform using Next.js 15, Sanity, and Tailwind CSS to showcase startup profiles. Utilized Next.js features like Server/Client Components, dynamic routing, and data-fetching methods (SSR, SSG, ISR, PPR). Integrated Sanity for content management and NextAuth for secure authentication, enhancing SEO with Next.js Metadata.",
    technologies: ["Next.js 15", "Sanity CMS", "Tailwind CSS", "NextAuth", "TypeScript", "SSR/SSG"],
    image: "/placeholder.jpg",
    demoUrl: "#",
    codeUrl: "https://github.com/ahsanfaraz-WebDev",
    date: "Feb 2025",
    category: "Full-Stack",
    icon: Globe
  },
  {
    id: 2,
    title: "Forever E-Commerce",
    description: "MERN Stack Solution",
    longDescription: "Developed a MERN stack e-commerce platform with React, Node.js, Express, and MongoDB. Implemented features like user authentication, product search, cart management, and order tracking. Focused on creating a visually appealing design and responsive layout for an enhanced user experience.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "JWT", "Stripe API"],
    image: "/placeholder.jpg",
    demoUrl: "#",
    codeUrl: "https://github.com/ahsanfaraz-WebDev",
    date: "Dec 2024",
    category: "E-Commerce",
    icon: Code
  },
  {
    id: 3,
    title: "Movie Recommendation",
    description: "Intelligent AI System",
    longDescription: "Built a recommendation system using Node.js and MongoDB to suggest movies based on user preferences. Integrated MongoDB to manage user data, movies, and recommendation history, with API testing via Postman. Designed the application for a seamless and engaging user experience.",
    technologies: ["Node.js", "MongoDB", "Express", "Recommendation AI", "RESTful APIs"],
    image: "/placeholder.jpg",
    codeUrl: "https://github.com/ahsanfaraz-WebDev",
    date: "Mar 2024",
    category: "Backend",
    icon: Database
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "Modern React Portfolio",
    longDescription: "A modern, responsive portfolio website built with React and Tailwind CSS. Features smooth animations, interactive elements, and a clean design to showcase projects and skills effectively.",
    technologies: ["React", "Tailwind CSS", "Framer Motion", "TypeScript"],
    image: "/placeholder.jpg",
    demoUrl: "#",
    codeUrl: "https://github.com/ahsanfaraz-WebDev",
    date: "Jan 2024",
    category: "Frontend",
    icon: Globe
  },
  {
    id: 5,
    title: "Task Manager App",
    description: "Productivity Solution",
    longDescription: "A comprehensive task management application with real-time updates, user authentication, and collaborative features. Built with modern web technologies for optimal performance.",
    technologies: ["Vue.js", "Firebase", "Vuetify", "PWA"],
    image: "/placeholder.jpg",
    demoUrl: "#",
    codeUrl: "https://github.com/ahsanfaraz-WebDev",
    date: "Nov 2023",
    category: "Full-Stack",
    icon: Code
  },
  {
    id: 6,
    title: "Weather Dashboard",
    description: "Real-time Weather App",
    longDescription: "An intuitive weather dashboard that provides real-time weather information, forecasts, and weather maps. Features location-based services and responsive design.",
    technologies: ["JavaScript", "Weather API", "Chart.js", "CSS3"],
    image: "/placeholder.jpg",
    demoUrl: "#",
    codeUrl: "https://github.com/ahsanfaraz-WebDev",
    date: "Oct 2023",
    category: "Frontend",
    icon: Globe
  },
  {
    id: 7,
    title: "Social Media API",
    description: "Backend REST API",
    longDescription: "A robust REST API for social media applications with user management, post creation, comments, likes, and real-time notifications. Implements security best practices and scalable architecture.",
    technologies: ["Node.js", "Express", "MongoDB", "Socket.io", "JWT"],
    image: "/placeholder.jpg",
    codeUrl: "https://github.com/ahsanfaraz-WebDev",
    date: "Sep 2023",
    category: "Backend",
    icon: Database
  },
  {
    id: 8,
    title: "Crypto Tracker",
    description: "Cryptocurrency Monitor",
    longDescription: "A real-time cryptocurrency tracking application with price alerts, portfolio management, and detailed analytics. Features interactive charts and market insights.",
    technologies: ["React", "Redux", "CoinGecko API", "Chart.js"],
    image: "/placeholder.jpg",
    demoUrl: "#",
    codeUrl: "https://github.com/ahsanfaraz-WebDev",
    date: "Aug 2023",
    category: "Frontend",
    icon: Code
  }
]

// Project Detail Modal Component
function ProjectModal({ project, isOpen, onClose }: { project: Project | null, isOpen: boolean, onClose: () => void }) {
  if (!project) return null

  const IconComponent = project.icon

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
            className="fixed inset-4 md:inset-10 lg:inset-20 z-50 flex items-center justify-center p-4"
          >
            <div 
              className="relative w-full max-w-4xl max-h-full overflow-y-auto rounded-2xl border border-gray-200 p-8"
              style={{
                background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
                boxShadow: '0 25px 50px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)',
              }}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-300 group border border-gray-300"
              >
                <X className="w-5 h-5 text-gray-600 group-hover:text-black" />
              </button>

              {/* Content */}
              <div className="space-y-8">
                {/* Header */}
                <div className="flex items-start space-x-6">
                  <div 
                    className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 border border-gray-300"
                    style={{
                      background: 'linear-gradient(145deg, #f8f9fa, #ffffff)',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)',
                    }}
                  >
                    <IconComponent className="w-10 h-10 text-black" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-black mb-2 font-mono">
                      {project.title}
                    </h2>
                    <p className="text-lg text-gray-600 font-mono">
                      {project.category} Project • {project.date}
                    </p>
                  </div>
                </div>

                {/* Project Image */}
                <div className="relative rounded-2xl overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-xl font-bold text-black mb-4 font-mono">Project Overview</h3>
                  <p className="text-gray-700 leading-relaxed font-mono text-sm">
                    {project.longDescription}
                  </p>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="text-xl font-bold text-black mb-4 font-mono">Technology Stack</h3>
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="px-4 py-2 rounded-lg text-sm text-gray-700 font-mono border border-gray-300"
                        style={{ 
                          background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  {project.demoUrl && (
                    <a 
                      href={project.demoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-black text-white font-mono text-sm hover:bg-gray-800 transition-all duration-300 hover:scale-105 border border-gray-300"
                      style={{
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                      }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>View Demo</span>
                    </a>
                  )}
                  <a 
                    href={project.codeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-white text-black font-mono text-sm hover:bg-gray-50 transition-all duration-300 hover:scale-105 border border-gray-300"
                    style={{
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                    }}
                  >
                    <Github className="w-4 h-4" />
                    <span>View Code</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default function ProjectsCarousel() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  return (
    <section id="projects" className="projects-section relative py-20 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 
            className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight"
            style={{ fontFamily: 'Urbanist, sans-serif' }}
          >
            Projects
            <span className="block text-gray-400 text-3xl md:text-4xl font-light mt-2 tracking-widest">
              MY WORK
            </span>
          </h2>
        </div>

        {/* 3D Carousel */}
        <div className="carousel-container">
          <div className="carousel">
            {projects.map((project, i) => (
              <div key={project.id} className={`card c${i + 1}`}>
                <div className="img" style={{ backgroundImage: `url(${project.image})` }} />
                <p className="project-title">{project.title}</p>
                <span className="project-description">{project.description}</span>
                <button 
                  className="view-details-btn"
                  onClick={() => openModal(project)}
                >
                  View Details
                </button>
              </div>
            ))}
            
            {/* Shadow cards for depth effect */}
            {projects.map((_, i) => (
              <div key={`shadow-${i}`} className={`cardb cb${i + 1}`} />
            ))}
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

      {/* Carousel Styles */}
      <style jsx global>{`
        .carousel-container {
          display: grid;
          place-items: center;
          height: 80vh;
          font-family: 'Montserrat', sans-serif;
          color: #fff;
        }
        
        .carousel {
          transform: perspective(1000px) rotateX(70deg);
          transform-style: preserve-3d;
          display: grid;
          place-items: center;
          animation: rotate 15s linear infinite;
          transition: all 1s;
          background-image: radial-gradient(circle at 50% 50%, #000 30%, transparent 40%);
        }

        .carousel:hover {
          animation-play-state: paused;
        }

        .cardb {
          display: grid;
          place-items: center;
          width: 190px;
          height: 280px;
          background: linear-gradient(145deg, #0f0f0f, #1a1a1a);
          position: absolute;
          border-radius: 12px;
          border: 1px solid #333;
        }

        .card {
          display: grid;
          place-items: center;
          width: 190px;
          height: 280px;
          background: linear-gradient(145deg, #ffffff, #f8f9fa);
          position: absolute;
          box-shadow: 
            0 20px 40px rgba(0,0,0,0.3),
            0 0 0 1px rgba(255,255,255,0.1),
            inset 0 1px 0 rgba(255,255,255,0.2);
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.1);
          -webkit-box-reflect: below 3px linear-gradient(transparent 75%, rgba(255,255,255,.1));
          padding: 15px;
          text-align: center;
          color: #000;
        }

        .card .img {
          width: 160px;
          height: 100px;
          border-radius: 8px;
          margin-bottom: 10px;
          filter: brightness(.8);
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .project-title {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 8px;
          color: #000;
          letter-spacing: -0.025em;
        }

        .project-description {
          font-size: 11px;
          text-align: center;
          padding: 0 8px;
          margin-bottom: 15px;
          color: #666;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .view-details-btn {
          background: linear-gradient(145deg, #000, #333);
          border: 1px solid #444;
          color: white;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: auto;
          letter-spacing: 0.025em;
          text-transform: uppercase;
        }

        .view-details-btn:hover {
          background: linear-gradient(145deg, #333, #000);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.3);
          border-color: #555;
        }

        .c1 {
          padding: 0;
          transform-origin: center center;
          transform: rotateZ(45deg) rotateX(90deg) translateY(120px) translateZ(280px) rotateZ(180deg);
        }
        
        .cb1 {
          padding: 0;
          transform-origin: center center;
          transform: rotateZ(45deg) rotateX(90deg) translateY(120px) translateZ(279px);
        }

        .c2 {
          padding: 0;
          transform-origin: center center;
          transform: rotateZ(90deg) rotateX(90deg) translateY(120px) translateZ(280px) rotateZ(180deg);
        }
        
        .cb2 {
          padding: 0;
          transform-origin: center center;
          transform: rotateZ(90deg) rotateX(90deg) translateY(120px) translateZ(279px);
        }

        .c3 {
          padding: 0;
          transform-origin: center center;
          transform: rotateZ(135deg) rotateX(90deg) translateY(120px) translateZ(280px) rotateZ(180deg);
        }
        
        .cb3 {
          padding: 0;
          transform-origin: center center;
          transform: rotateZ(135deg) rotateX(90deg) translateY(120px) translateZ(279px);
        }

        .c4 {
          padding: 0;
          transform-origin: center center;
          transform: rotateZ(180deg) rotateX(90deg) translateY(120px) translateZ(280px) rotateZ(180deg);
        }
        
        .cb4 {
          padding: 0;
          transform-origin: center center;
          transform: rotateZ(180deg) rotateX(90deg) translateY(120px) translateZ(279px);
        }

        .c5 {
          padding: 0;
          transform-origin: center center;
          transform: rotateZ(225deg) rotateX(90deg) translateY(120px) translateZ(280px) rotateZ(180deg);
        }
        
        .cb5 {
          padding: 0;
          transform-origin: center center;
          transform: rotateZ(225deg) rotateX(90deg) translateY(120px) translateZ(279px);
        }

        .c6 {
          padding: 0;
          transform-origin: center center;
          transform: rotateZ(270deg) rotateX(90deg) translateY(120px) translateZ(280px) rotateZ(180deg);
        }
        
        .cb6 {
          padding: 0;
          transform-origin: center center;
          transform: rotateZ(270deg) rotateX(90deg) translateY(120px) translateZ(279px);
        }

        .c7 {
          padding: 0;
          transform-origin: center center;
          transform: rotateZ(315deg) rotateX(90deg) translateY(120px) translateZ(280px) rotateZ(180deg);
        }
        
        .cb7 {
          padding: 0;
          transform-origin: center center;
          transform: rotateZ(315deg) rotateX(90deg) translateY(120px) translateZ(279px);
        }

        .c8 {
          padding: 0;
          transform-origin: center center;
          transform: rotateZ(360deg) rotateX(90deg) translateY(120px) translateZ(280px) rotateZ(180deg);
        }
        
        .cb8 {
          padding: 0;
          transform-origin: center center;
          transform: rotateZ(360deg) rotateX(90deg) translateY(120px) translateZ(279px);
        }

        @keyframes rotate {
          to {
            transform: perspective(1000px) rotateX(70deg) rotateZ(360deg);
          }
        }

        @media screen and (max-width: 992px) {
          .carousel {
            scale: 0.7;
          }
        }

        @media screen and (max-width: 768px) {
          .carousel {
            scale: 0.5;
          }
        }
      `}</style>
    </section>
  )
}
