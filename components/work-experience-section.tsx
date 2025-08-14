"use client"
import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { 
  Building2, 
  Database, 
  Server, 
  Code, 
  Zap, 
  Globe, 
  FileCode, 
  Layers, 
  GitBranch, 
  Github, 
  Palette, 
  Activity,
  Box
} from "lucide-react"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const WorkExperienceSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const currentlyWorkingRef = useRef<HTMLDivElement>(null)
  const companyNameRef = useRef<HTMLDivElement>(null)
  const roleTitleRef = useRef<HTMLDivElement>(null)
  const backgroundLogoRef = useRef<HTMLDivElement>(null)
  const animatedLineRef = useRef<HTMLDivElement>(null)

  const experience = {
    company: "NovaSphere Sol",
    position: "Junior Software Engineer",
    duration: "April 2025 - Present",
    location: "Hybrid",
    status: "Currently Working"
  }

  useEffect(() => {
    if (typeof window === "undefined") return

    const ctx = gsap.context(() => {
      // Section title animation
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

      // Background logo parallax drift
      gsap.to(backgroundLogoRef.current, {
        x: 30,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      })

      // Animated line drawing effect
      gsap.fromTo(animatedLineRef.current, 
        { 
          scaleX: 0,
          transformOrigin: "left center"
        },
        {
          scaleX: 1,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: animatedLineRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Letter by letter animation for "CURRENTLY WORKING AT"
      if (currentlyWorkingRef.current) {
        const text = currentlyWorkingRef.current.textContent || ""
        currentlyWorkingRef.current.innerHTML = ""
        
        text.split("").forEach((char, index) => {
          const span = document.createElement("span")
          span.textContent = char === " " ? "\u00A0" : char
          span.style.opacity = "0"
          span.style.filter = "blur(5px)"
          currentlyWorkingRef.current?.appendChild(span)
        })

        const letters = currentlyWorkingRef.current.children
        gsap.to(letters, {
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.1,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: currentlyWorkingRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        })
      }

      // Company name mask reveal animation
      gsap.fromTo(companyNameRef.current,
        {
          clipPath: "inset(0 100% 0 0)",
          scale: 1.2,
          opacity: 0
        },
        {
          clipPath: "inset(0 0% 0 0)",
          scale: 1,
          opacity: 1,
          duration: 2,
          ease: "power3.out",
          delay: 1,
          scrollTrigger: {
            trigger: companyNameRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Role title slide up animation
      gsap.fromTo(roleTitleRef.current,
        {
          y: 100,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          delay: 2,
          scrollTrigger: {
            trigger: roleTitleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="work-experience" className="min-h-screen flex items-center justify-center py-20 px-4 relative overflow-hidden font-[Urbanist] bg-black">
      
      {/* Background Logo Watermark */}
      <div 
        ref={backgroundLogoRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity: 0.15 }}
      >
        <img 
          src="/Novalogo.png" 
          alt="NovaSphere Sol Logo" 
          className="w-[800px] h-[800px] object-contain"
        />
      </div>


      <div className="max-w-7xl mx-auto w-full relative z-40">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-32">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block"
          >
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight"
              style={{ fontFamily: 'Urbanist, sans-serif' }}>
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
            My professional journey and the story behind my passion for creating 
            innovative digital solutions and meaningful user experiences.
          </motion.p>
        </div>

        {/* Cinematic Job Intro */}
        <div className="text-center space-y-12">
          {/* "CURRENTLY WORKING AT" - Letter by letter fade */}
          <div 
            ref={currentlyWorkingRef}
            className="text-2xl md:text-3xl font-light text-gray-300 tracking-[0.3em] uppercase"
          >
            CURRENTLY WORKING AT
          </div>

          {/* Company Name - Mask reveal with half-and-half colors */}
          <div 
            ref={companyNameRef}
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none mb-16"
            style={{ 
              fontFamily: "Urbanist, sans-serif",
              textShadow: "0 0 100px rgba(255, 255, 255, 0.1)"
            }}
          >
            {experience.company.toUpperCase().split('').map((char, index) => (
              <span
                key={index}
                className="half-split-char"
                style={{
                  background: `linear-gradient(90deg, #2E073F 50%, white 50%)`,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent'
                }}
              >
                {char}
              </span>
            ))}
          </div>
        </div>

      {/* Animated Line */}
      <div 
        ref={animatedLineRef}
        className="absolute left-0 w-full h-px bg-white z-40"
        style={{ transform: "translateY(-50%)" }}
      />
        {/* Content Below Line */}
        <div className="text-center space-y-2 mt-8">
          {/* Role Title - Slide up */}
          <div 
            ref={roleTitleRef}
            className="text-3xl md:text-4xl lg:text-5xl font-medium text-gray-200  mb-20"
          >
            {experience.position}
          </div>

          {/* Duration and Location */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex items-center gap-4 px-8 py-4 border border-white/20 rounded-full bg-white/5 backdrop-blur-sm   ">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              <span className="text-white font-medium text-lg">{experience.status}</span>
            </div>
            
            <div className="text-gray-400 text-lg">
              {experience.duration} • {experience.location}
            </div>
          </div>
        </div>

       

        {/* Key Technologies */}
        <div className="mt-24 text-center">
          <h3 className="text-2xl font-semibold text-white mb-8 tracking-wide">
            CORE TECHNOLOGIES
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 max-w-5xl mx-auto">
            {[
              { name: "MongoDB", icon: Database, hue: 120 },
              { name: "Express.js", icon: Server, hue: 60 },
              { name: "React.js", icon: Code, hue: 200 },
              { name: "Node.js", icon: Zap, hue: 90 },
              { name: "Next.js", icon: Globe, hue: 240 },
              { name: "TypeScript", icon: FileCode, hue: 210 },
              { name: "Tailwind CSS", icon: Palette, hue: 190 },
              { name: "WordPress", icon: Layers, hue: 300 },
              { name: "Liquid", icon: FileCode, hue: 180 },
              { name: "Git", icon: GitBranch, hue: 45 },
              { name: "GitHub", icon: Github, hue: 280 },
              { name: "Shadcn", icon: Box, hue: 150 },
              { name: "GSAP", icon: Activity, hue: 330 },
              { name: "Postman", icon: Zap, hue: 30 }
            ].map((tech, index) => {
              const IconComponent = tech.icon
              return (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="tech-item relative"
                  style={{ '--hue': tech.hue } as React.CSSProperties}
                >
                  <article className="tech-article flex flex-col items-center gap-3 p-6 bg-black/40 rounded-xl border border-white/20 transition-all duration-300 hover:transform hover:-translate-y-1">
                    <IconComponent className="w-8 h-8 text-white transition-all duration-300" />
                    <span className="text-sm text-white font-medium text-center">{tech.name}</span>
                  </article>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .shimmer-text {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.4) 50%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: shimmer 3s ease-in-out infinite;
          -webkit-background-clip: text;
          background-clip: text;
        }

        /* Technology Cards Grid Tiles Effect */
        .tech-article {
          position: relative;
          border-radius: 0.75rem;
        }

        .tech-article::before {
          content: "";
          position: absolute;
          inset: 0;
          background: 
            linear-gradient(hsl(0 0% 15%) 0 2px, transparent 2px 38px) -20px -20px / 40px 40px,
            linear-gradient(90deg, hsl(0 0% 15%) 0 2px, transparent 2px 38px) -20px -20px / 40px 40px;
          mask: linear-gradient(-35deg, hsl(0 0% 15%) 0%, transparent 45%);
          -webkit-mask: linear-gradient(-35deg, hsl(0 0% 15%) 0%, transparent 45%);
          z-index: -1;
          opacity: var(--tech-active, 0);
          transition: opacity 0.2s;
          border-radius: inherit;
        }

        .tech-item:hover {
          --tech-active: 1;
        }

        .tech-item:hover .tech-article svg {
          stroke: hsl(var(--hue, 30) 60% 60%);
        }

        .tech-article svg {
          fill: none;
          stroke: currentColor;
          stroke-width: 1.5;
          transition: stroke 0.3s ease;
        }
      `}</style>
    </section>
  )
}

export default WorkExperienceSection