"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Code, Layers, ShoppingBag } from "lucide-react"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const skills = [
  {
    title: "Full-Stack Development",
    description: "Building end-to-end web applications with modern technologies and best practices",
    icon: Code,
    number: "01"
  },
  {
    title: "Shopify Developer",
    description: "Creating custom e-commerce solutions and themes for Shopify platforms",
    icon: ShoppingBag,
    number: "02"
  },
  {
    title: "WordPress Developer", 
    description: "Developing custom WordPress themes and plugins for diverse client needs",
    icon: Layers,
    number: "03"
  }
]

// Typewriter Component
function TypewriterText() {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  
  const fullText = `I'm a passionate Software Engineering student at FAST NUCES, focused on creating meaningful, user-first digital solutions. I specialize in designing and developing modern web applications that are visually engaging, scalable, and reliable.

From intuitive user interfaces to streamlined backend systems, I love solving real-world problems through clean, thoughtful design. I've worked on diverse projects—educational platforms, e-commerce solutions, and automation suites—each built with attention to detail.

I'm always eager to collaborate on impactful projects that push boundaries and deliver real value.`

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, 30) // Typing speed
      
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, fullText])

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500) // Cursor blink speed
    
    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <div className="text-lg leading-8 text-gray-300 whitespace-pre-wrap">
      {displayedText}
      <span className={`inline-block w-0.5 h-6 bg-white ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>
        |
      </span>
    </div>
  )
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLDivElement>(null)
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

      // Image animation - simple fade in only
      gsap.fromTo(imageRef.current,
        {
          scale: 0.9,
          opacity: 0
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Content slide in from right
      gsap.fromTo(contentRef.current,
        {
          x: 100,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.3,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Description animation
      gsap.fromTo(descRef.current,
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.5,
          scrollTrigger: {
            trigger: descRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Skills animation - stagger effect
      gsap.fromTo(skillsRef.current?.children || [],
        {
          x: 50,
          opacity: 0,
          scale: 0.8
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.1,
          delay: 0.7,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      )



      // Card animation is now handled by CSS hover effects

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative bg-black overflow-hidden"
    >
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-800/[0.03] rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 
            ref={titleRef}
            className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight"
            style={{ fontFamily: 'Urbanist, sans-serif' }}
          >
            ABOUT
          </h2>
          <div className="w-32 h-1 bg-white mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-[Urbanist]">
            My personal journey and the story behind my passion for creating 
            innovative digital solutions and meaningful user experiences.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Side - Animated Profile Card */}
          <div 
            ref={imageRef}
            className="relative cursor-pointer flex justify-center lg:justify-start"
          >
            <div className="about-card-container">
              <div className="about-card">
                <div className="about-border">
                  <h2 className="about-name">Ahsan Faraz</h2>
                  <div className="about-icons">
                    <div className="about-icon">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </div>
                    <div className="about-icon">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <div className="about-icon">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </div>
                    
                    <div className="about-icon">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0190 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9460 2.4189-2.1568 2.4189Z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Shine Effect */}
                <div className="about-shine"></div>
                
                {/* Animated Background */}
                <div className="about-background">
                  <div className="about-tiles">
                    <div className="about-tile about-tile-1"></div>
                    <div className="about-tile about-tile-2"></div>
                    <div className="about-tile about-tile-3"></div>
                    <div className="about-tile about-tile-4"></div>
                    <div className="about-tile about-tile-5"></div>
                    <div className="about-tile about-tile-6"></div>
                    <div className="about-tile about-tile-7"></div>
                    <div className="about-tile about-tile-8"></div>
                    <div className="about-tile about-tile-9"></div>
                    <div className="about-tile about-tile-10"></div>
                  </div>
                  
                  <div className="about-line about-line-1"></div>
                  <div className="about-line about-line-2"></div>
                  <div className="about-line about-line-3"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div ref={contentRef} className="flex flex-col justify-start">
            <div className="space-y-0">
              <h3 
                className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight"
                style={{ fontFamily: 'Urbanist, sans-serif' }}
              >
                Crafting Digital
                <span className="block text-gray-400">Experiences</span>
              </h3>
              
              <div 
                ref={descRef}
                className="font-mono tracking-wide"
                style={{ 
                  fontFamily: 'JetBrains Mono, Fira Code, SF Mono, Monaco, Inconsolata, Roboto Mono, monospace',
                  marginTop: '0',
                  paddingTop: '0'
                }}
              >
                <TypewriterText />
              </div>
            </div>
          </div>
        </div>

        {/* Professional Skills Cards - Full Width */}
        <div className="mt-20">
          <h4 
            className="text-3xl font-bold text-white mb-16 text-center font-mono tracking-wider"
            style={{ fontFamily: 'JetBrains Mono, Fira Code, SF Mono, Monaco, Inconsolata, Roboto Mono, monospace' }}
          >
            &lt; EXPERTISE /&gt;
          </h4>
          <div ref={skillsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
            {skills.map((skill, index) => {
              const IconComponent = skill.icon
              return (
                <div 
                  key={index}
                  className="professional-card group cursor-pointer bg-gradient-to-br from-gray-900/50 to-black/30 backdrop-blur-sm p-10 transition-all duration-500 ease-in-out hover:from-gray-800/60 hover:to-black/40 rounded-2xl border border-gray-800 hover:border-gray-600 hover:shadow-2xl hover:shadow-white/5 min-h-[400px] flex flex-col"
                >
                  <div className="flex flex-col h-full">
                    {/* Animated Icon */}
                    <div className="relative mb-8">
                      <div className="w-20 h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center group-hover:from-gray-700 group-hover:to-gray-800 transition-all duration-500 shadow-lg">
                        <IconComponent 
                          className="w-10 h-10 text-gray-300 group-hover:text-white transition-all duration-500 group-hover:scale-110" 
                        />
                      </div>
                      {/* Animated background circle */}
                      <div className="absolute -inset-3 bg-gradient-to-r from-gray-700/10 via-white/5 to-gray-700/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 flex flex-col">
                      <h3 
                        className="relative text-2xl font-bold text-white mb-6 transition-all duration-500 ease-in-out font-mono tracking-wide after:content-[''] after:w-[60px] after:h-[3px] after:block after:bg-gray-600 after:mt-4 after:transition-all after:duration-500 group-hover:after:w-full group-hover:after:bg-white"
                        style={{ fontFamily: 'JetBrains Mono, Fira Code, SF Mono, Monaco, Inconsolata, Roboto Mono, monospace' }}
                      >
                        {skill.title}
                      </h3>
                      <p 
                        className="text-gray-400 text-base leading-relaxed flex-1 transition-all duration-500 ease-in-out group-hover:text-gray-300 font-mono"
                        style={{ fontFamily: 'JetBrains Mono, Fira Code, SF Mono, Monaco, Inconsolata, Roboto Mono, monospace' }}
                      >
                        {skill.description}
                      </p>
                    </div>
                    
                    {/* Number */}
                    <div className="text-right mt-8">
                      <h6 
                        className="text-6xl font-bold leading-normal text-transparent m-0 font-mono"
                        style={{
                          WebkitTextStroke: '2px rgba(255, 255, 255, 0.1)',
                          WebkitTextFillColor: 'transparent',
                          fontFamily: 'JetBrains Mono, Fira Code, SF Mono, Monaco, Inconsolata, Roboto Mono, monospace'
                        }}
                      >
                        {skill.number}
                      </h6>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Card Animation Styles */}
      <style jsx>{`
        .about-card-container {
          height: 100vh;
          width: 100vw;
          max-height: 650px;
          max-width: 520px;
          min-height: 500px;
          min-width: 400px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto;
        }

        .about-border {
          height: 479px;
          width: 380px;
          background: transparent;
          border-radius: 35px;
          transition: border 1s;
          position: relative;
        }

        .about-border:hover {
          border: 1px solid white;
        }

        .about-card {
          height: 489px;
          width: 390px;
          background: grey;
          border-radius: 35px;
          transition: background 0.8s;
          overflow: hidden;
          background: black;
          box-shadow: 0 70px 63px -60px #000000;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .about-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('/placeholder-user.png') center center no-repeat;
          background-size: 390px;
          filter: grayscale(100%) contrast(1.2) brightness(0.9);
          transition: all 0.8s ease;
          z-index: 1;
        }

        .about-card:hover::before {
          background: url('/placeholder-user.png') left center no-repeat;
          background-size: 780px;
        }

        .about-card:hover .about-name {
          opacity: 1;
        }

        .about-card:hover .about-icon {
          opacity: 1;
        }

        .about-name {
          font-family: 'Urbanist', sans-serif;
          color: white;
          margin: 20px;
          opacity: 0;
          transition: opacity 1s;
          font-size: 1.5rem;
          font-weight: bold;
          position: relative;
          z-index: 2;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
        }

        .about-icon {
          opacity: 0;
          transition: opacity 1s;
          color: white;
          margin: 8px 0;
          position: relative;
          z-index: 2;
          filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.8));
        }

        .about-icons {
          position: absolute;
          fill: #fff;
          color: #fff;
          height: 160px;
          top: 290px;
          width: 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          z-index: 2;
        }

        /* Skill Section Style Animations */
        .about-shine {
          border-radius: inherit;
          position: absolute;
          inset: 0;
          z-index: 1;
          overflow: hidden;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .about-shine:before {
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
          background-image: conic-gradient(from 205deg at 50% 50%, rgba(255, 255, 255, 0) 0deg, #ffffff 35deg, rgba(255, 255, 255, 0.4) 280deg, rgba(255, 255, 255, 0) 360deg);
        }

        .about-background {
          border-radius: inherit;
          position: absolute;
          inset: 0;
          overflow: hidden;
          -webkit-mask-image: radial-gradient(circle at 60% 5%, black 0%, black 15%, transparent 60%);
          mask-image: radial-gradient(circle at 60% 5%, black 0%, black 15%, transparent 60%);
        }

        .about-tiles {
          opacity: 0;
          transition: opacity 0.25s;
        }

        .about-tile {
          position: absolute;
          background-color: rgba(255, 255, 255, 0.1);
          animation-duration: 6s;
          animation-iteration-count: infinite;
          opacity: 0;
        }

        .about-tile.about-tile-4,
        .about-tile.about-tile-6,
        .about-tile.about-tile-10 {
          animation-delay: -2s;
        }

        .about-tile.about-tile-3,
        .about-tile.about-tile-5,
        .about-tile.about-tile-8 {
          animation-delay: -4s;
        }

        .about-tile.about-tile-2,
        .about-tile.about-tile-9 {
          animation-delay: -6s;
        }

        .about-tile.about-tile-1 {
          top: 0;
          left: 0;
          height: 10%;
          width: 22.5%;
        }

        .about-tile.about-tile-2 {
          top: 0;
          left: 22.5%;
          height: 10%;
          width: 27.5%;
        }

        .about-tile.about-tile-3 {
          top: 0;
          left: 50%;
          height: 10%;
          width: 27.5%;
        }

        .about-tile.about-tile-4 {
          top: 0;
          left: 77.5%;
          height: 10%;
          width: 22.5%;
        }

        .about-tile.about-tile-5 {
          top: 10%;
          left: 0;
          height: 22.5%;
          width: 22.5%;
        }

        .about-tile.about-tile-6 {
          top: 10%;
          left: 22.5%;
          height: 22.5%;
          width: 27.5%;
        }

        .about-tile.about-tile-7 {
          top: 10%;
          left: 50%;
          height: 22.5%;
          width: 27.5%;
        }

        .about-tile.about-tile-8 {
          top: 10%;
          left: 77.5%;
          height: 22.5%;
          width: 22.5%;
        }

        .about-tile.about-tile-9 {
          top: 32.5%;
          left: 50%;
          height: 22.5%;
          width: 27.5%;
        }

        .about-tile.about-tile-10 {
          top: 32.5%;
          left: 77.5%;
          height: 22.5%;
          width: 22.5%;
        }

        @keyframes about-tile {
          0%, 15%, 100% {
            opacity: 0.6;
          }
          30%, 70% {
            opacity: 0;
          }
        }

        .about-line {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .about-line:before,
        .about-line:after {
          content: '';
          position: absolute;
          background-color: rgba(255, 255, 255, 0.3);
          transition: transform 0.35s;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
        }

        .about-line:before {
          left: 0;
          right: 0;
          height: 1px;
          transform-origin: 0 50%;
          transform: scaleX(0);
        }

        .about-line:after {
          top: 0;
          bottom: 0;
          width: 1px;
          transform-origin: 50% 0;
          transform: scaleY(0);
        }

        .about-line.about-line-1:before {
          top: 10%;
        }

        .about-line.about-line-1:after {
          left: 22.5%;
        }

        .about-line.about-line-2:before {
          top: 32.5%;
        }

        .about-line.about-line-2:after {
          left: 50%;
        }

        .about-line.about-line-3:before {
          top: 55%;
        }

        .about-line.about-line-3:after {
          right: 22.5%;
        }

        /* Hover Effects for New Animations */
        .about-card:hover .about-shine {
          opacity: 1;
          transition-duration: 0.3s;
          transition-delay: 0s;
        }

        .about-card:hover .about-tiles {
          opacity: 1;
          transition-delay: 0.1s;
        }

        .about-card:hover .about-tile {
          animation-name: about-tile;
        }

        .about-card:hover .about-line {
          opacity: 1;
          transition-duration: 0.2s;
        }

        .about-card:hover .about-line:before {
          transform: scaleX(1);
        }

        .about-card:hover .about-line:after {
          transform: scaleY(1);
        }
      `}</style>
    </section>
  )
}
