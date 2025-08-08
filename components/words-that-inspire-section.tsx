"use client"
import React, { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Quote, Lightbulb, ArrowRight, Heart, Star, Zap } from "lucide-react"

interface MatterJS {
  Engine: any;
  World: any;
  Bodies: any;
  Constraint: any;
  Mouse: any;
  MouseConstraint: any;
  Body: any;
}

// Client-side only floating elements component
const FloatingElements = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => {
        // Use index-based values for consistent positioning
        const leftPos = (i * 23.7) % 100
        const topPos = (i * 17.3) % 100
        const delay = (i * 0.8) % 5
        const duration = 3 + (i % 4)
        
        return (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            style={{
              left: `${leftPos}%`,
              top: `${topPos}%`,
              animationDelay: `${delay}s`,
              animation: `float ${duration}s ease-in-out infinite alternate`
            }}
          />
        )
      })}
    </div>
  )
}

const WordsThatInspireSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [lightOn, setLightOn] = useState(true)
  const [brightness] = useState(1.0)
  const [Matter, setMatter] = useState<MatterJS | null>(null)
  const engineRef = useRef<any>(null)
  const bulbRef = useRef<any>(null)
  const ceilingRef = useRef<any>(null)
  const cordRef = useRef<any>(null)
  const [currentQuote, setCurrentQuote] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  const quotes = [
    {
      id: 1,
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
      category: "Passion",
      icon: Heart
    },
    {
      id: 2,
      text: "Innovation distinguishes between a leader and a follower.",
      author: "Steve Jobs", 
      category: "Innovation",
      icon: Lightbulb
    },
    {
      id: 3,
      text: "The best way to predict the future is to create it.",
      author: "Peter Drucker",
      category: "Vision",
      icon: Quote
    },
    {
      id: 4,
      text: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt",
      category: "Dreams",
      icon: Star
    },
    {
      id: 5,
      text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill",
      category: "Courage",
      icon: Zap
    }
  ]

  useEffect(() => {
    // Dynamically import Matter.js to avoid SSR issues
    import('matter-js').then((MatterModule) => {
      setMatter(MatterModule.default)
    })
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isVisible, quotes.length])

  // Matter.js setup for desktop screens (1350px+)
  useEffect(() => {
    if (!Matter || !canvasRef.current || window.innerWidth < 1350) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Create Matter.js engine
    const engine = Matter.Engine.create()
    engine.world.gravity.y = 0.8
    engineRef.current = engine

    // Create physics bodies
    const ceiling = Matter.Bodies.rectangle(canvas.width / 2, 40, 20, 10, { isStatic: true })
    const bulb = Matter.Bodies.circle(canvas.width / 2, canvas.height / 2, 22, {
      density: 0.006,
      frictionAir: 0.015,
      restitution: 0.3
    })
    const cord = Matter.Constraint.create({
      bodyA: ceiling,
      bodyB: bulb,
      length: canvas.height / 2 - 100,
      stiffness: 0.95,
      damping: 0.02
    })

    ceilingRef.current = ceiling
    bulbRef.current = bulb
    cordRef.current = cord

    // Mouse interaction
    const mouse = Matter.Mouse.create(canvas)
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.8,
        render: { visible: false }
      }
    })

    Matter.World.add(engine.world, [ceiling, bulb, cord, mouseConstraint])

    // Drawing functions
    const drawBackground = () => {
      ctx.fillStyle = lightOn ? '#1a1a1a' : '#050505'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    const drawRoom = () => {
      const roomPadding = 120
      const roomTopPadding = 80
      const roomBottomPadding = 80
      
      const roomColor = lightOn ? '#2a2a2a' : '#0f0f0f'
      ctx.fillStyle = roomColor
      ctx.fillRect(roomPadding, roomTopPadding, canvas.width - (roomPadding * 2), canvas.height - roomTopPadding - roomBottomPadding)

      ctx.fillStyle = lightOn ? '#222' : '#080808'
      ctx.fillRect(0, 0, canvas.width, roomTopPadding)

      ctx.fillStyle = lightOn ? '#1f1f1f' : '#0a0a0a'
      ctx.fillRect(0, roomTopPadding, roomPadding, canvas.height - roomTopPadding - roomBottomPadding)
      ctx.fillRect(canvas.width - roomPadding, roomTopPadding, roomPadding, canvas.height - roomTopPadding - roomBottomPadding)

      ctx.fillStyle = lightOn ? '#1f1f1f' : '#080808'
      ctx.fillRect(0, canvas.height - roomBottomPadding, canvas.width, roomBottomPadding)
    }

    let currentBrightness = brightness

    const drawRealisticLighting = (x: number, y: number) => {
      if (!lightOn) {
        currentBrightness += (0 - currentBrightness) * 0.1
        return
      }

      currentBrightness += (1 - currentBrightness) * 0.1

      if (currentBrightness < 0.01) return

      const lightRadius = 350
      const roomPadding = 120
      const roomTopPadding = 80
      const roomBottomPadding = 80

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, lightRadius)
      gradient.addColorStop(0, `rgba(255, 240, 200, ${0.8 * currentBrightness})`)
      gradient.addColorStop(0.3, `rgba(255, 230, 180, ${0.5 * currentBrightness})`)
      gradient.addColorStop(0.7, `rgba(240, 190, 140, ${0.2 * currentBrightness})`)
      gradient.addColorStop(1, 'rgba(150, 120, 100, 0)')

      ctx.save()
      ctx.beginPath()
      ctx.rect(roomPadding, roomTopPadding, canvas.width - (roomPadding * 2), canvas.height - roomTopPadding - roomBottomPadding)
      ctx.clip()
      ctx.globalCompositeOperation = 'screen'
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(x, y, lightRadius, 0, Math.PI * 2)
      ctx.fill()
      ctx.globalCompositeOperation = 'source-over'
      ctx.restore()
    }

    const drawBulb = (x: number, y: number) => {
      const bulbRadius = 20
      const socketWidth = 24
      const socketHeight = 12
      
      // Draw cord
      ctx.strokeStyle = '#444'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(canvas.width / 2, 45)
      ctx.lineTo(x, y - 25)
      ctx.stroke()

      // Draw bulb socket
      ctx.fillStyle = '#888'
      ctx.fillRect(x - socketWidth/2, y - 25, socketWidth, socketHeight)

      // Draw socket threads
      ctx.strokeStyle = '#555'
      ctx.lineWidth = 0.5
      for (let i = 0; i < 5; i++) {
        ctx.beginPath()
        ctx.moveTo(x - socketWidth/2, y - 22 + i * 2)
        ctx.lineTo(x + socketWidth/2, y - 22 + i * 2)
        ctx.stroke()
      }

      // Draw bulb
      ctx.fillStyle = lightOn ? '#ffffff' : '#e8e8e8'
      ctx.beginPath()
      ctx.arc(x, y, bulbRadius, 0, Math.PI * 2)
      ctx.fill()

      // Bulb outline
      ctx.strokeStyle = 'rgba(200, 200, 200, 0.5)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(x, y, bulbRadius, 0, Math.PI * 2)
      ctx.stroke()

      // Bulb highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
      ctx.beginPath()
      ctx.ellipse(x - 8, y - 6, 3, 10, -0.2, 0, Math.PI * 2)
      ctx.fill()

      // Filament
      if (lightOn) {
        ctx.strokeStyle = '#ff9900'
        ctx.shadowColor = '#ff9900'
        ctx.shadowBlur = 8
      } else {
        ctx.strokeStyle = '#666'
        ctx.shadowBlur = 0
      }

      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(x, y - 12)
      ctx.lineTo(x, y + 12)
      ctx.stroke()

      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(x - 8, y - 6)
      ctx.quadraticCurveTo(x, y, x + 8, y - 6)
      ctx.moveTo(x - 8, y + 6)
      ctx.quadraticCurveTo(x, y, x + 8, y + 6)
      ctx.stroke()

      ctx.shadowBlur = 0
    }

    let lastFrameTime = 0
    let animationId: number

    const animate = (timestamp: number) => {
      if (timestamp - lastFrameTime < 33) {
        animationId = requestAnimationFrame(animate)
        return
      }
      lastFrameTime = timestamp

      Matter.Engine.update(engine, 16.67)
      
      const x = bulb.position.x
      const y = bulb.position.y

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawBackground()
      drawRoom()
      drawRealisticLighting(x, y)
      drawBulb(x, y)

      animationId = requestAnimationFrame(animate)
    }

    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        Matter.Body.setPosition(ceiling, { x: canvas.width / 2, y: 40 })
        cord.length = canvas.height / 2 - 100
      }, 100)
    }

    window.addEventListener('resize', handleResize, { passive: true })
    canvas.addEventListener('touchstart', () => {}, { passive: true })
    canvas.addEventListener('touchmove', () => {}, { passive: true })
    
    animate(0)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      clearTimeout(resizeTimeout)
      window.removeEventListener('resize', handleResize)
      Matter.World.clear(engine.world, false)
      Matter.Engine.clear(engine)
    }
  }, [Matter, lightOn, brightness])

  const toggleLight = () => {
    setLightOn(!lightOn)
  }

  return (
    <section 
      ref={sectionRef}
      id="inspire" 
      className="min-h-screen bg-black text-white font-[Urbanist] relative overflow-hidden"
    >
      {/* Desktop Design (1350px+) - Matter.js with transparent cards */}
      <div className="hidden 2xl:block">
        {/* Desktop Section Header - Above the bulb section */}
        <div className="text-center py-16 lg:py-20 relative z-20 bg-black">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white">
              WORDS THAT INSPIRE
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="w-32 h-1 bg-white mx-auto mb-6 rounded-full"
          />
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed px-4"
          >
            Powerful words and thoughts that drive innovation, creativity, and the pursuit of excellence in everything we do.
          </motion.p>
        </div>

        {/* Bulb Section Container */}
        <div className="relative min-h-screen">
          {/* Canvas for bulb animation */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            style={{ display: 'block' }}
          />

          {/* Light Switch */}
          <div className="absolute left-10 top-1/3 z-20">
            <div className="w-[70px] h-[110px] bg-gray-100 border border-gray-300 rounded-sm shadow-xl flex items-center justify-center">
              <div
                className={`w-10 h-[70px] bg-white border border-gray-300 rounded-sm relative cursor-pointer shadow-inner transition-all duration-150 touch-manipulation hover:shadow-lg ${
                  !lightOn ? 'bg-gray-50' : ''
                }`}
                onClick={toggleLight}
              >
                <div
                  className={`w-9 h-8 bg-gradient-to-b from-gray-100 to-gray-200 border border-gray-400 rounded-sm absolute left-0.5 transition-all duration-150 shadow-md ${
                    lightOn ? 'top-0.5' : 'top-[34px] bg-gradient-to-b from-gray-200 to-gray-300'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Transparent Quote Cards - Positioned within the bulb's lighting area */}
          {lightOn && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-full max-w-5xl px-8">
                <div className="grid grid-cols-3 gap-6 mt-40">
                  {quotes.slice(0, 3).map((quote, index) => (
                    <motion.div
                      key={quote.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      className="group"
                    >
                      <div className="bg-black/30 backdrop-blur-md border border-white/20 rounded-2xl p-6 h-[180px] flex flex-col relative overflow-hidden hover:bg-black/40 hover:border-white/40 transition-all duration-300 cursor-pointer">
                        {/* Category Badge */}
                        <div className="text-center mb-4">
                          <span className="px-4 py-1.5 bg-white/20 text-white rounded-full text-sm font-semibold tracking-wide backdrop-blur-sm">
                            {quote.category}
                          </span>
                        </div>
                        
                        {/* Quote Text */}
                        <blockquote className="text-center mb-4 flex-grow flex items-center">
                          <p className="text-white text-base leading-relaxed italic font-medium">
                            "{quote.text}"
                          </p>
                        </blockquote>
                        
                        {/* Author */}
                        <div className="text-center">
                          <div className="w-16 h-px bg-white/40 mx-auto mb-2"></div>
                          <cite className="text-gray-200 text-sm font-semibold not-italic">
                            — {quote.author}
                          </cite>
                        </div>

                        {/* Glow Effect */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Smaller Screens Section Header (0px - 1350px) */}
      <div className="2xl:hidden text-center py-16 lg:py-20 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white">
            WORDS THAT INSPIRE
          </h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-32 h-1 bg-white mx-auto mb-6 rounded-full"
        />
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed px-4"
        >
          Powerful words and thoughts that drive innovation, creativity, and the pursuit of excellence in everything we do.
        </motion.p>
      </div>

      {/* Smaller Screens Design (0px - 1350px) - Beautiful cards */}
      <div className="2xl:hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:50px_50px] animate-pulse"></div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_49%,rgba(255,255,255,0.03)_50%,transparent_51%)] bg-[length:100px_100px]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_49%,rgba(255,255,255,0.03)_50%,transparent_51%)] bg-[length:100px_100px]"></div>
        </div>

        {/* Floating Elements - Client-side only to avoid hydration mismatch */}
        <FloatingElements />

        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Main Content Area */}
          <div className="flex-1 flex items-center justify-center px-4 lg:px-8 pb-16">
            <div className="max-w-6xl mx-auto w-full">
              {/* Large screens - Grid layout */}
              <div className="hidden lg:block xl:hidden">
                <div className="grid grid-cols-2 gap-8">
                  {quotes.slice(0, 4).map((quote, index) => {
                    const IconComponent = quote.icon
                    return (
                      <motion.div
                        key={quote.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.15 }}
                        className="group"
                      >
                        <div className="bg-black/80 backdrop-blur-lg border-2 border-white/20 rounded-3xl p-8 h-[280px] flex flex-col relative overflow-hidden hover:bg-white hover:text-black hover:border-white transition-all duration-700 cursor-pointer">
                          {/* Icon */}
                          <div className="flex justify-center mb-4">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-black/20 transition-all duration-700">
                              <IconComponent className="w-6 h-6 text-white group-hover:text-black transition-colors duration-700" />
                            </div>
                          </div>
                          
                          {/* Category */}
                          <div className="text-center mb-4">
                            <span className="px-4 py-2 bg-white/20 text-white rounded-full text-sm font-bold tracking-wide group-hover:bg-black/20 group-hover:text-black transition-all duration-700">
                              {quote.category}
                            </span>
                          </div>
                          
                          {/* Quote */}
                          <blockquote className="text-center mb-6 flex-grow flex items-center">
                            <p className="text-lg leading-relaxed font-medium italic">
                              "{quote.text}"
                            </p>
                          </blockquote>
                          
                          {/* Author */}
                          <div className="text-center">
                            <div className="w-16 h-px bg-white/50 mx-auto mb-3 group-hover:bg-black/50 transition-all duration-700"></div>
                            <cite className="text-base font-bold not-italic">
                              — {quote.author}
                            </cite>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Medium and small screens - Carousel */}
              <div className="lg:hidden xl:hidden">
                <div className="relative max-w-4xl mx-auto">
                  {/* Quote Navigation Dots */}
                  <div className="flex justify-center mb-8 gap-3">
                    {quotes.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentQuote(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          currentQuote === index 
                            ? 'bg-white scale-125' 
                            : 'bg-white/30 hover:bg-white/50'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Main Quote Card */}
                  <motion.div
                    key={currentQuote}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    <div className="bg-black/90 backdrop-blur-lg border-2 border-white/30 rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden group hover:bg-white hover:text-black hover:border-white transition-all duration-700 cursor-pointer min-h-[400px] flex flex-col justify-center">
                      {/* Icon */}
                      <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-black/20 transition-all duration-700">
                          {React.createElement(quotes[currentQuote].icon, {
                            className: "w-8 h-8 text-white group-hover:text-black transition-colors duration-700"
                          })}
                        </div>
                      </div>
                      
                      {/* Category Badge */}
                      <div className="mb-8">
                        <span className="px-6 py-3 bg-white/20 text-white rounded-full text-base font-bold tracking-wide group-hover:bg-black/20 group-hover:text-black transition-all duration-700">
                          {quotes[currentQuote].category}
                        </span>
                      </div>
                      
                      {/* Quote Text */}
                      <blockquote className="mb-8">
                        <p className="text-2xl lg:text-3xl leading-relaxed font-light italic">
                          "{quotes[currentQuote].text}"
                        </p>
                      </blockquote>
                      
                      {/* Author */}
                      <div className="relative">
                        <div className="w-24 h-px bg-white/50 mx-auto mb-4 group-hover:bg-black/50 transition-all duration-700"></div>
                        <cite className="text-xl font-bold not-italic tracking-wide">
                          — {quotes[currentQuote].author}
                        </cite>
                      </div>

                      {/* Decorative Elements */}
                      <div className="absolute top-6 left-6 opacity-10 group-hover:opacity-20 transition-opacity duration-700">
                        <Quote className="w-12 h-12" />
                      </div>
                      <div className="absolute bottom-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-700">
                        <ArrowRight className="w-8 h-8" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Quote Counter */}
                  <div className="text-center mt-6">
                    <span className="text-white/60 text-sm font-mono">
                      {String(currentQuote + 1).padStart(2, '0')} / {String(quotes.length).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Decorative Line */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="w-full h-px bg-gradient-to-r from-transparent via-white to-transparent"
          />
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          100% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </section>
  )
}

export default WordsThatInspireSection