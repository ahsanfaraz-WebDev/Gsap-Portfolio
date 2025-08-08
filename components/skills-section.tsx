"use client"

import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { 
  Code2, 
  Database, 
  Brain, 
  Wrench, 
  Users,
  Server,
  Palette,
  Globe,
  Terminal,
  GitBranch,
  TestTube,
  Shield
} from "lucide-react"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const skillCategories = [
  {
    title: "Programming Languages",
    icon: Code2,
    color: "from-blue-500 to-purple-600",
    skills: ["C++", "Java", "JavaScript", "Python"],
    description: "Strong foundation in multiple programming paradigms"
  },
  {
    title: "Frontend Development",
    icon: Palette,
    color: "from-pink-500 to-rose-600",
    skills: ["React.js", "Next.js", "Tailwind CSS", "Bootstrap", "jQuery"],
    description: "Creating beautiful and responsive user interfaces"
  },
  {
    title: "Backend Development",
    icon: Server,
    color: "from-green-500 to-teal-600",
    skills: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "Sanity"],
    description: "Building robust and scalable server-side applications"
  },
  {
    title: "DevOps & Tools",
    icon: Wrench,
    color: "from-orange-500 to-red-600",
    skills: ["Docker", "Kubernetes", "Jenkins", "Git", "GitHub Actions"],
    description: "Streamlining development workflow and deployment"
  },
  {
    title: "Quality Assurance",
    icon: TestTube,
    color: "from-cyan-500 to-blue-600",
    skills: ["SonarQube", "Jira", "Cypress", "Postman", "AssertJ Swing"],
    description: "Ensuring code quality and robust testing practices"
  },
  {
    title: "Core Concepts",
    icon: Brain,
    color: "from-violet-500 to-purple-600",
    skills: ["DSA", "OOP", "Operating Systems", "Databases", "Web3Forms"],
    description: "Essential computer science fundamentals"
  },
]

const techStackIcons = [
  { name: "React", icon: Code2 },
  { name: "Next.js", icon: Globe },
  { name: "Node.js", icon: Server },
  { name: "JavaScript", icon: Terminal },
  { name: "TypeScript", icon: Code2 },
  { name: "Python", icon: Terminal },
  { name: "MongoDB", icon: Database },
  { name: "PostgreSQL", icon: Database },
  { name: "Docker", icon: Shield },
  { name: "Kubernetes", icon: Shield },
  { name: "Git", icon: GitBranch },
  { name: "Jenkins", icon: Wrench },
  { name: "Tailwind CSS", icon: Palette },
  { name: "Bootstrap", icon: Palette },
  { name: "Express.js", icon: Server },
  { name: "Sanity", icon: Database },
  { name: "SonarQube", icon: TestTube },
  { name: "Jira", icon: TestTube },
  { name: "Cypress", icon: TestTube },
  { name: "Postman", icon: TestTube },
]

// Animated Tech Stack Component
function RunningTechStack() {
  // Split icons into two rows
  const midPoint = Math.ceil(techStackIcons.length / 2)
  const firstRow = techStackIcons.slice(0, midPoint)
  const secondRow = techStackIcons.slice(midPoint)

  return (
    <div className="w-full overflow-hidden py-8 bg-black relative">
      <div className="space-y-6">
        {/* First Row */}
        <motion.div
          animate={{
            x: [0, -2000],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 35,
              ease: "linear",
            },
          }}
          className="flex items-center space-x-8 whitespace-nowrap"
          style={{ width: 'max-content' }}
        >
          {[...firstRow, ...firstRow, ...firstRow].map((tech, index) => {
            const IconComponent = tech.icon
            return (
              <div
                key={`${tech.name}-row1-${index}`}
                className="group relative flex items-center space-x-3 px-6 py-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-500 min-w-fit shadow-2xl hover:shadow-blue-500/20"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
                }}
              >
                {/* Glassy shine effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
                <IconComponent className="w-6 h-6 text-white/80 group-hover:text-white transition-all duration-300 relative z-10" />
                <span className="font-semibold text-white/90 group-hover:text-white font-['Urbanist'] text-sm relative z-10 tracking-wide">
                  {tech.name}
                </span>
                
                {/* Animated border glow */}
                <div className="absolute inset-0 rounded-2xl border border-blue-400/0 group-hover:border-blue-400/30 transition-all duration-500" />
              </div>
            )
          })}
        </motion.div>

        {/* Second Row */}
        <motion.div
          animate={{
            x: [-2000, 0],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
          className="flex items-center space-x-8 whitespace-nowrap"
          style={{ width: 'max-content' }}
        >
          {[...secondRow, ...secondRow, ...secondRow].map((tech, index) => {
            const IconComponent = tech.icon
            return (
              <div
                key={`${tech.name}-row2-${index}`}
                className="group relative flex items-center space-x-3 px-6 py-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-500 min-w-fit shadow-2xl hover:shadow-purple-500/20"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)',
                }}
              >
                {/* Glassy shine effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
                <IconComponent className="w-6 h-6 text-white/80 group-hover:text-white transition-all duration-300 relative z-10" />
                <span className="font-semibold text-white/90 group-hover:text-white font-['Urbanist'] text-sm relative z-10 tracking-wide">
                  {tech.name}
                </span>
                
                {/* Animated border glow */}
                <div className="absolute inset-0 rounded-2xl border border-purple-400/0 group-hover:border-purple-400/30 transition-all duration-500" />
              </div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}

// Skill Card Component - Enhanced Glassy Design
function SkillCard({ category, index }: { category: any; index: number }) {
  return (
    <div 
      className="skill-card group cursor-pointer relative rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-700 ease-out min-h-[450px] flex flex-col overflow-hidden transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.02) 100%)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
      }}
    >
      {/* Glassy background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-all duration-700" />
      
      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-3xl border border-transparent bg-gradient-to-r from-blue-400/0 via-purple-400/0 to-cyan-400/0 group-hover:from-blue-400/30 group-hover:via-purple-400/30 group-hover:to-cyan-400/30 transition-all duration-700" style={{ mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'exclude' }} />
      
      <div className="flex flex-col h-full p-8 relative z-10">
        {/* Enhanced Icon with Glassy Effect */}
        <div className="relative mb-8">
          <div 
            className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-500 relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${category.color.replace('from-', 'rgba(').replace('to-', 'rgba(').replace('-500', ', 0.3)').replace('-600', ', 0.1)')})`,
              backdropFilter: 'blur(10px)',
              boxShadow: '0 12px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
            }}
          >
            {/* Icon glassy overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
            
            <category.icon 
              className="w-12 h-12 text-white/90 group-hover:text-white transition-all duration-500 relative z-10 drop-shadow-lg" 
            />
            
            {/* Floating particles effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1000">
              <div className="absolute top-2 right-2 w-1 h-1 bg-white/60 rounded-full animate-pulse delay-100" />
              <div className="absolute bottom-3 left-3 w-1 h-1 bg-white/40 rounded-full animate-pulse delay-300" />
              <div className="absolute top-1/2 right-1 w-0.5 h-0.5 bg-white/50 rounded-full animate-pulse delay-500" />
            </div>
          </div>
          
          {/* Glowing halo effect */}
          <div className="absolute -inset-6 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse" />
        </div>
        
        {/* Content */}
        <div className="flex-1 flex flex-col">
          <h3 
            className="relative text-2xl font-bold text-white mb-6 transition-all duration-500 ease-in-out font-mono tracking-wide after:content-[''] after:w-[60px] after:h-[3px] after:block after:bg-white/30 after:mt-4 after:transition-all after:duration-500 group-hover:after:w-full group-hover:after:bg-white after:rounded-full after:shadow-lg after:shadow-white/20"
            style={{ fontFamily: 'JetBrains Mono, Fira Code, SF Mono, Monaco, Inconsolata, Roboto Mono, monospace' }}
          >
            {category.title}
          </h3>
          <p 
            className="text-white/70 text-base leading-relaxed flex-1 transition-all duration-500 ease-in-out group-hover:text-white/90 font-mono mb-8"
            style={{ fontFamily: 'JetBrains Mono, Fira Code, SF Mono, Monaco, Inconsolata, Roboto Mono, monospace' }}
          >
            {category.description}
          </p>
          
          {/* Enhanced Skills Tags with Glassy Effect */}
          <div className="flex flex-wrap gap-3 mb-6">
            {category.skills?.map((skill: string) => (
              <span 
                key={skill} 
                className="relative text-xs px-4 py-2 rounded-2xl text-white/80 font-mono transition-all duration-500 group-hover:text-white group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-white/10 overflow-hidden"
                style={{ 
                  fontFamily: 'JetBrains Mono, Fira Code, SF Mono, Monaco, Inconsolata, Roboto Mono, monospace',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
                }}
              >
                {/* Hover shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative z-10">{skill}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
      
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
    </div>
  )
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current, 
        { 
          y: 100,
          opacity: 0,
          rotationX: 90
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
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

      // Skills animation - 3D flip and slide effect
      gsap.fromTo(skillsRef.current?.children || [],
        {
          rotationY: 90,
          y: 100,
          opacity: 0,
          scale: 0.7
        },
        {
          rotationY: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
          delay: 0.3,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="skills" className="py-20 relative bg-black">
      {/* Background */}
      <div className="absolute inset-0 bg-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Title */}
            <div className="text-center mb-20">
              <h2
                ref={titleRef}
                className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight"
                style={{ fontFamily: 'Urbanist, sans-serif' }}
              >
                SKILLS
              </h2>
              <div className="w-32 h-1 bg-white mx-auto mb-6 rounded-full"></div>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-[Urbanist]">
                My technical expertise and core competencies in modern web development, 
                programming languages, and industry-standard tools and frameworks.
              </p>
            </div>

                    {/* Skill Cards Grid - 3 per row */}
            <div ref={skillsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
              {skillCategories.map((category, index) => (
                <SkillCard
                  key={category.title}
                  category={category}
                  index={index}
                />
              ))}
                  </div>
        </div>

      {/* Running Tech Stack - Full Width */}
      <RunningTechStack />

      {/* Skill Card Hover Animation Styles */}
      <style jsx global>{`
        .skill-card {
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
          background-image: conic-gradient(from 205deg at 50% 50%, rgba(16, 185, 129, 0) 0deg, #10B981 35deg, rgba(52, 211, 153, 0.4) 280deg, rgba(16, 185, 129, 0) 360deg);
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
          background-color: rgba(16, 185, 129, 0.15);
          animation-duration: 6s;
          animation-iteration-count: infinite;
          opacity: 0;
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
            opacity: 0.8;
          }
          30%, 70% {
            opacity: 0;
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
          background-color: rgba(16, 185, 129, 0.4);
          transition: transform 0.35s;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.3);
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
        .skill-card:hover .shine {
          opacity: 1;
          transition-duration: 0.3s;
          transition-delay: 0s;
        }

        .skill-card:hover .tiles {
          opacity: 1;
          transition-delay: 0.1s;
        }

        .skill-card:hover .tile {
          animation-name: tile;
        }

        .skill-card:hover .line {
          opacity: 1;
          transition-duration: 0.2s;
        }

        .skill-card:hover .line:before {
          transform: scaleX(1);
        }

        .skill-card:hover .line:after {
          transform: scaleY(1);
        }

        .skill-card:hover .line.line-1:before,
        .skill-card:hover .line.line-1:after {
          transition-delay: 0s;
        }

        .skill-card:hover .line.line-2:before,
        .skill-card:hover .line.line-2:after {
          transition-delay: 0.15s;
        }

        .skill-card:hover .line.line-3:before,
        .skill-card:hover .line.line-3:after {
          transition-delay: 0.3s;
        }


      `}</style>
    </section>
  )
}