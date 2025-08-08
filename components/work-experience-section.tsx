"use client"
import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Calendar, MapPin, Building2, Code, Globe } from "lucide-react"
import StarBackground from "./star-background"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const WorkExperienceSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const floatingElementsRef = useRef<HTMLDivElement[]>([])
  const timelineRef = useRef<HTMLDivElement>(null)
  const techStackRef = useRef<HTMLDivElement>(null)

  const experience = {
    company: "NovaSphere Sol",
    position: "Junior Software Engineer",
    duration: "April 2025 - Present",
 
    location: "Hybrid",
    status: "Currently Working",
    description: [
      "Developed and maintained full-stack web applications using MERN stack architecture",
      "Built responsive and dynamic user interfaces with Next.js and React ecosystem", 
      "Created custom Shopify stores and applications using Liquid templating engine",
      "Designed and developed WordPress websites with Kadence theme customizations",
      "Collaborated with cross-functional teams to deliver scalable software solutions",
      "Implemented modern web development practices and performance optimizations"
    ],
    technologies: [
      { name: "MongoDB", icon: "🍃", category: "Database" },
      { name: "Express.js", icon: "⚡", category: "Backend" },
      { name: "React.js", icon: "⚛️", category: "Frontend" },
      { name: "Node.js", icon: "🟢", category: "Runtime" },
      { name: "Next.js", icon: "▲", category: "Framework" },
      { name: "Shopify", icon: "🛍️", category: "E-commerce" },
      { name: "Liquid", icon: "💧", category: "Templating" },
      { name: "WordPress", icon: "📝", category: "CMS" },
      { name: "Kadence", icon: "🎨", category: "Theme" },
      { name: "JavaScript", icon: "🟨", category: "Language" },
      { name: "TypeScript", icon: "🔷", category: "Language" },
      { name: "Tailwind CSS", icon: "🎨", category: "Styling" }
    ],
    achievements: [
      "Successfully delivered 15+ client projects",
      "Improved website performance by 40%",
      "Reduced development time by 30%",
      "Maintained 99% client satisfaction rate"
    ]
  }

  useEffect(() => {
    if (typeof window === "undefined") return

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current, 
        { 
          y: 100, 
          opacity: 0,
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Card entrance animation
      gsap.fromTo(cardRef.current,
        {
          y: 150,
          opacity: 0,
          rotationX: -15
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Floating elements animation
      floatingElementsRef.current.forEach((el, index) => {
        if (el) {
          gsap.to(el, {
            y: -20,
            rotation: 5,
            duration: 2 + index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: index * 0.3
          })
        }
      })

      // Timeline animation
      gsap.fromTo(timelineRef.current,
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Tech stack stagger animation
      if (techStackRef.current) {
        const techItems = techStackRef.current.children
        gsap.fromTo(techItems,
          {
            y: 30,
            opacity: 0,
            scale: 0.8
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: techStackRef.current,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }



      // Card hover animation setup
      const card = cardRef.current
      if (card) {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -10,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
          })
        })

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          })
        })
      }

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="work-experience" className="min-h-screen flex items-center justify-center py-20 px-4 relative overflow-hidden font-[Urbanist]">
      {/* Star Background */}
      <StarBackground />



      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Section Header - Black and White */}
        <div ref={titleRef} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block"
          >
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
              WORK EXPERIENCE
            </h2>
            <div className="w-32 h-1 bg-white mx-auto mb-6 rounded-full"></div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-[Urbanist]"
          >
            My professional journey in software development, building innovative solutions 
            and contributing to cutting-edge projects in the tech industry.
          </motion.p>
        </div>

        {/* Experience Card */}
        <div className="relative px-4 sm:px-0">
          {/* Timeline Line - White */}
          <div 
            ref={timelineRef}
            className="absolute left-4 sm:left-8 top-0 w-1 h-full bg-white rounded-full z-10"
          ></div>

          {/* Experience Card */}
          <div ref={cardRef} className="ml-12 sm:ml-20 relative">
            <div className="experience-card bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden group">
              {/* Premium glass effect overlay */}
              <div className="absolute inset-0 bg-black/20 rounded-3xl"></div>
              
              {/* Shine Effect */}
              <div className="shine"></div>
              
              {/* Animated Background */}
              <div className="background">
                <div className="tiles">
                  <div className="tile tile-1"></div>
                  <div className="tile tile-2"></div>
                  <div className="tile tile-3"></div>
                  <div className="tile tile-4"></div>
                  <div className="tile tile-5"></div>
                  <div className="tile tile-6"></div>
                  <div className="tile tile-7"></div>
                  <div className="tile tile-8"></div>
                  <div className="tile tile-9"></div>
                  <div className="tile tile-10"></div>
                </div>
                
                <div className="line line-1"></div>
                <div className="line line-2"></div>
                <div className="line line-3"></div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Company Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                  <div className="flex items-center gap-4 mb-6 lg:mb-0">
                    <div className="p-4 bg-white/10 rounded-2xl border border-white/20">
                      <Building2 className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-1">{experience.company}</h3>
                      <p className="text-xl text-gray-300 font-semibold">{experience.position}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm border border-green-500/30 flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          {experience.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col lg:items-end gap-3">
                    <div className="flex items-center gap-3 text-gray-300">
                      <Calendar className="w-5 h-5 text-white" />
                      <span className="font-medium">{experience.duration}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <MapPin className="w-5 h-5 text-white" />
                      <span>{experience.location}</span>
                    </div>

                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <Code className="w-6 h-6 text-white" />
                    Key Responsibilities & Achievements
                  </h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {experience.description.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                        className="flex items-start gap-3 p-4 bg-black/40 rounded-xl border border-white/20 hover:border-green-600/50 hover:shadow-[0_0_20px_rgba(5,150,105,0.3)] hover:bg-black/30 transition-all duration-300 group/item"
                      >
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0 group-hover/item:scale-125 group-hover/item:shadow-[0_0_10px_rgba(5,150,105,0.8)] transition-all duration-300"></div>
                        <span className="text-gray-200 leading-relaxed group-hover/item:text-white group-hover/item:font-medium transition-all duration-300">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>



                {/* Experience Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {experience.achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                      className="text-center p-4 bg-black/40 rounded-xl border border-white/20 hover:border-green-600/50 hover:shadow-[0_0_20px_rgba(5,150,105,0.3)] hover:bg-black/30 transition-all duration-300 group/achievement"
                    >
                      <div className="text-lg font-bold text-white mb-1 group-hover/achievement:shadow-[0_0_10px_rgba(5,150,105,0.5)] group-hover/achievement:text-green-400 transition-all duration-300">
                        {achievement.split(' ')[0]}
                      </div>
                      <div className="text-xs text-gray-300 leading-tight group-hover/achievement:text-gray-200 transition-colors duration-300">
                        {achievement.split(' ').slice(1).join(' ')}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .experience-card {
          position: relative;
        }

        .shine {
          border-radius: inherit;
          position: absolute;
          inset: 0;
          z-index: 1;
          overflow: hidden;
          opacity: 0;
          transition: opacity 0.5s;
        }

        .shine:before {
          content: '';
          width: 200%;
          padding-bottom: 200%;
          border-radius: 50%;
          position: absolute;
          left: 50%;
          bottom: 50%;
          filter: blur(40px);
          opacity: 0.3;
          transform: translateX(-50%);
          background-image: conic-gradient(from 205deg at 50% 50%, rgba(5, 150, 105, 0) 0deg, #059669 35deg, rgba(6, 120, 95, 0.4) 280deg, rgba(5, 150, 105, 0) 360deg);
          box-shadow: 0 0 60px rgba(5, 150, 105, 0.25), 0 0 100px rgba(5, 150, 105, 0.15);
        }

        .background {
          border-radius: inherit;
          position: absolute;
          inset: 0;
          overflow: hidden;
          -webkit-mask-image: radial-gradient(circle at 60% 5%, black 0%, black 15%, transparent 60%);
          mask-image: radial-gradient(circle at 60% 5%, black 0%, black 15%, transparent 60%);
        }

        .tiles {
          opacity: 0;
          transition: opacity 0.25s;
        }

        .tile {
          position: absolute;
          background-color: rgba(5, 150, 105, 0.2);
          animation-duration: 6s;
          animation-iteration-count: infinite;
          opacity: 0;
          box-shadow: 0 0 8px rgba(5, 150, 105, 0.3), inset 0 0 8px rgba(5, 150, 105, 0.1);
          border: 1px solid rgba(5, 150, 105, 0.2);
        }

        /* Smaller screens - reduce tile size and glow */
        @media (max-width: 768px) {
          .tile {
            background-color: rgba(5, 150, 105, 0.1);
            box-shadow: 0 0 4px rgba(5, 150, 105, 0.15), inset 0 0 4px rgba(5, 150, 105, 0.05);
            border: 1px solid rgba(5, 150, 105, 0.1);
          }

          .tile.tile-1 {
            height: 6%;
            width: 15%;
          }

          .tile.tile-2 {
            height: 6%;
            width: 18%;
          }

          .tile.tile-3 {
            height: 6%;
            width: 18%;
          }

          .tile.tile-4 {
            height: 6%;
            width: 15%;
          }

          .tile.tile-5 {
            height: 15%;
            width: 15%;
          }

          .tile.tile-6 {
            height: 15%;
            width: 18%;
          }

          .tile.tile-7 {
            height: 15%;
            width: 18%;
          }

          .tile.tile-8 {
            height: 15%;
            width: 15%;
          }

          .tile.tile-9 {
            height: 15%;
            width: 18%;
          }

          .tile.tile-10 {
            height: 15%;
            width: 15%;
          }
        }

        .tile.tile-4,
        .tile.tile-6,
        .tile.tile-10 {
          animation-delay: -2s;
        }

        .tile.tile-3,
        .tile.tile-5,
        .tile.tile-8 {
          animation-delay: -4s;
        }

        .tile.tile-2,
        .tile.tile-9 {
          animation-delay: -6s;
        }

        .tile.tile-1 {
          top: 0;
          left: 0;
          height: 10%;
          width: 22.5%;
        }

        .tile.tile-2 {
          top: 0;
          left: 22.5%;
          height: 10%;
          width: 27.5%;
        }

        .tile.tile-3 {
          top: 0;
          left: 50%;
          height: 10%;
          width: 27.5%;
        }

        .tile.tile-4 {
          top: 0;
          left: 77.5%;
          height: 10%;
          width: 22.5%;
        }

        .tile.tile-5 {
          top: 10%;
          left: 0;
          height: 22.5%;
          width: 22.5%;
        }

        .tile.tile-6 {
          top: 10%;
          left: 22.5%;
          height: 22.5%;
          width: 27.5%;
        }

        .tile.tile-7 {
          top: 10%;
          left: 50%;
          height: 22.5%;
          width: 27.5%;
        }

        .tile.tile-8 {
          top: 10%;
          left: 77.5%;
          height: 22.5%;
          width: 22.5%;
        }

        .tile.tile-9 {
          top: 32.5%;
          left: 50%;
          height: 22.5%;
          width: 27.5%;
        }

        .tile.tile-10 {
          top: 32.5%;
          left: 77.5%;
          height: 22.5%;
          width: 22.5%;
        }

        @keyframes tile {
          0%, 15%, 100% {
            opacity: 0.6;
            box-shadow: 0 0 12px rgba(5, 150, 105, 0.4), inset 0 0 12px rgba(5, 150, 105, 0.15);
          }
          30%, 70% {
            opacity: 0;
            box-shadow: 0 0 3px rgba(5, 150, 105, 0.1);
          }
        }

        /* Smaller screens - reduced glow animation */
        @media (max-width: 768px) {
          @keyframes tile {
            0%, 15%, 100% {
              opacity: 0.3;
              box-shadow: 0 0 6px rgba(5, 150, 105, 0.2), inset 0 0 6px rgba(5, 150, 105, 0.08);
            }
            30%, 70% {
              opacity: 0;
              box-shadow: 0 0 2px rgba(5, 150, 105, 0.05);
            }
          }
        }

        .line {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.35s;
        }

        .line:before,
        .line:after {
          content: '';
          position: absolute;
          background-color: rgba(5, 150, 105, 0.7);
          transition: transform 0.35s;
          box-shadow: 0 0 10px rgba(5, 150, 105, 0.4), 0 0 20px rgba(5, 150, 105, 0.2);
        }

        .line:before {
          left: 0;
          right: 0;
          height: 1px;
          transform-origin: 0 50%;
          transform: scaleX(0);
        }

        .line:after {
          top: 0;
          bottom: 0;
          width: 1px;
          transform-origin: 50% 0;
          transform: scaleY(0);
        }

        .line.line-1:before {
          top: 10%;
        }

        .line.line-1:after {
          left: 22.5%;
        }

        .line.line-1:before,
        .line.line-1:after {
          transition-delay: 0.3s;
        }

        .line.line-2:before {
          top: 32.5%;
        }

        .line.line-2:after {
          left: 50%;
        }

        .line.line-2:before,
        .line.line-2:after {
          transition-delay: 0.15s;
        }

        .line.line-3:before {
          top: 55%;
        }

        .line.line-3:after {
          right: 22.5%;
        }

        /* Hover Effects */
        .experience-card:hover .shine {
          opacity: 1;
          transition-duration: 0.3s;
          transition-delay: 0s;
        }

        .experience-card:hover .tiles {
          opacity: 1;
          transition-delay: 0.1s;
        }

        .experience-card:hover .tile {
          animation-name: tile;
        }

        .experience-card:hover .line {
          opacity: 1;
          transition-duration: 0.2s;
        }

        .experience-card:hover .line:before {
          transform: scaleX(1);
        }

        .experience-card:hover .line:after {
          transform: scaleY(1);
        }

        .experience-card:hover .line.line-1:before,
        .experience-card:hover .line.line-1:after {
          transition-delay: 0s;
        }

        .experience-card:hover .line.line-2:before,
        .experience-card:hover .line.line-2:after {
          transition-delay: 0.15s;
        }

        .experience-card:hover .line.line-3:before,
        .experience-card:hover .line.line-3:after {
          transition-delay: 0.3s;
        }
      `}</style>
    </section>
  )
}

export default WorkExperienceSection