"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function InteractiveParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const container = containerRef.current
    let animationId: number

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
    }
    resizeCanvas()

    // Main particle system
    const particles: Array<{
      x: number
      y: number
      targetX: number
      targetY: number
      vx: number
      vy: number
      size: number
      color: string
      opacity: number
    }> = []

    // Neural network background particles
    const neuralParticles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
    }> = []

    const particleCount = 1500
    let currentShape = 0
    let morphing = false

    // Color schemes
    const colorSchemes = {
      fire: ['#ff4500', '#ff6b00', '#ff8c00', '#ffaa00', '#ffcc00'],
      neon: ['#ff00ff', '#ff0080', '#8000ff', '#0080ff', '#00ffff'],
      nature: ['#00ff00', '#40ff40', '#66ffcc', '#80ff80', '#99ffaa'],
      rainbow: ['#ff0000', '#ff8000', '#ffff00', '#80ff00', '#00ff80', '#00ffff', '#0080ff', '#8000ff']
    }

    let currentColorScheme: keyof typeof colorSchemes = 'rainbow'

    // Shape generators
    const shapes = {
      sphere: (index: number, total: number) => {
        const phi = Math.acos(1 - 2 * (index / total))
        const theta = Math.sqrt(total * Math.PI) * phi
        const radius = Math.min(canvas.width, canvas.height) * 0.15
        return {
          x: canvas.width / 2 + radius * Math.sin(phi) * Math.cos(theta),
          y: canvas.height / 2 + radius * Math.sin(phi) * Math.sin(theta)
        }
      },
      cube: (index: number, total: number) => {
        const size = Math.min(canvas.width, canvas.height) * 0.3
        const side = Math.floor(index / (total / 4))
        const t = (index % (total / 4)) / (total / 4)
        const halfSize = size / 2
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2

        switch (side) {
          case 0: return { x: centerX - halfSize + t * size, y: centerY - halfSize }
          case 1: return { x: centerX + halfSize, y: centerY - halfSize + t * size }
          case 2: return { x: centerX + halfSize - t * size, y: centerY + halfSize }
          default: return { x: centerX - halfSize, y: centerY + halfSize - t * size }
        }
      },
      wave: (index: number, total: number) => {
        const x = (index / total) * canvas.width
        const frequency = 4
        const amplitude = Math.min(canvas.width, canvas.height) * 0.1
        const y = canvas.height / 2 + Math.sin((x / canvas.width) * Math.PI * frequency) * amplitude
        return { x, y }
      },
      spiral: (index: number, total: number) => {
        const angle = (index / total) * Math.PI * 8
        const radius = (index / total) * Math.min(canvas.width, canvas.height) * 0.2
        return {
          x: canvas.width / 2 + radius * Math.cos(angle),
          y: canvas.height / 2 + radius * Math.sin(angle)
        }
      }
    }

    const shapeNames = Object.keys(shapes) as Array<keyof typeof shapes>

    // Initialize main particles
    for (let i = 0; i < particleCount; i++) {
      const pos = shapes.sphere(i, particleCount)
      const colors = colorSchemes[currentColorScheme]
      particles.push({
        x: pos.x,
        y: pos.y,
        targetX: pos.x,
        targetY: pos.y,
        vx: 0,
        vy: 0,
        size: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 0.8 + Math.random() * 0.2
      })
    }

    // Initialize neural network particles
    for (let i = 0; i < 80; i++) {
      neuralParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3
      })
    }

    // Neural network drawing function
    const drawNeuralNetwork = () => {
      // Update neural particles
      neuralParticles.forEach(particle => {
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        particle.y = Math.max(0, Math.min(canvas.height, particle.y))
      })

      // Draw neural network connections
      ctx.globalAlpha = 1
      neuralParticles.forEach((particle, i) => {
        neuralParticles.forEach((otherParticle, j) => {
          if (i !== j) {
            const dx = particle.x - otherParticle.x
            const dy = particle.y - otherParticle.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 120) {
              const opacity = (1 - distance / 120) * 0.3
              ctx.globalAlpha = opacity
              
              // Yellowish-white color for connections
              ctx.strokeStyle = `rgba(255, 248, 220, ${opacity})`
              ctx.lineWidth = 0.8
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(otherParticle.x, otherParticle.y)
              ctx.stroke()
            }
          }
        })

        // Draw neural network nodes
        ctx.globalAlpha = particle.opacity * 0.6
        ctx.fillStyle = '#fff8dc' // Cornsilk color (yellowish-white)
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        // Add subtle glow to neural nodes
        ctx.shadowBlur = 8
        ctx.shadowColor = '#fff8dc'
        ctx.globalAlpha = particle.opacity * 0.3
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 1.5, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      })

      ctx.globalAlpha = 1
    }

    // Morph to shape
    const morphToShape = (shapeIndex: number) => {
      if (morphing) return
      morphing = true
      
      const shapeName = shapeNames[shapeIndex]
      particles.forEach((particle, i) => {
        const newPos = shapes[shapeName](i, particleCount)
        particle.targetX = newPos.x
        particle.targetY = newPos.y
      })

      setTimeout(() => {
        morphing = false
      }, 2000)
    }

    // Update colors
    const updateColors = () => {
      const colors = colorSchemes[currentColorScheme]
      particles.forEach(particle => {
        particle.color = colors[Math.floor(Math.random() * colors.length)]
      })
    }

    // Animation loop
    const animate = () => {
      // Clear canvas with slight fade for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw neural network background
      drawNeuralNetwork()

      // Draw main particles
      particles.forEach(particle => {
        // Move towards target
        const dx = particle.targetX - particle.x
        const dy = particle.targetY - particle.y
        particle.vx += dx * 0.02
        particle.vy += dy * 0.02
        particle.vx *= 0.9
        particle.vy *= 0.9
        particle.x += particle.vx
        particle.y += particle.vy

        // Draw particle
        ctx.globalAlpha = particle.opacity
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        // Add glow effect
        ctx.shadowBlur = 10
        ctx.shadowColor = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      })

      animationId = requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Event handlers
    const handleClick = () => {
      currentShape = (currentShape + 1) % shapeNames.length
      morphToShape(currentShape)
    }

    const handleColorChange = (scheme: keyof typeof colorSchemes) => {
      currentColorScheme = scheme
      updateColors()
    }

    // Add event listeners to buttons
    const shapeBtn = container.querySelector('#shape-btn') as HTMLButtonElement
    const colorOptions = container.querySelectorAll('.color-option') as NodeListOf<HTMLElement>

    if (shapeBtn) {
      shapeBtn.addEventListener('click', handleClick)
    }

    canvas.addEventListener('click', handleClick)

    colorOptions.forEach(option => {
      option.addEventListener('click', () => {
        const scheme = option.dataset.scheme as keyof typeof colorSchemes
        if (scheme) {
          colorOptions.forEach(o => o.classList.remove('active'))
          option.classList.add('active')
          handleColorChange(scheme)
        }
      })
    })

    // Resize handler
    const handleResize = () => {
      resizeCanvas()
      // Reinitialize neural particles for new canvas size
      neuralParticles.length = 0
      for (let i = 0; i < 80; i++) {
        neuralParticles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.3
        })
      }
      // Recalculate particle positions for new canvas size
      morphToShape(currentShape)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[500px] bg-black rounded-2xl overflow-hidden border border-gray-800"
    >
      {/* UI Elements */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="px-4 py-2 bg-black/50 backdrop-blur-sm border border-gray-700 rounded-lg">
          <span className="text-white text-sm">Interactive Particle System - Click to morph shapes</span>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-3 p-4 bg-black/50 backdrop-blur-sm border border-gray-700 rounded-lg">
          <button
            id="shape-btn"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 text-sm"
          >
            Change Shape
          </button>
          
          <div className="flex gap-2">
            <div 
              className="color-option w-6 h-6 rounded-full border-2 border-gray-400 cursor-pointer transition-all duration-200 hover:scale-110"
              data-scheme="fire"
              style={{ background: 'linear-gradient(45deg, #ff4500, #ffcc00)' }}
            />
            <div 
              className="color-option w-6 h-6 rounded-full border-2 border-gray-400 cursor-pointer transition-all duration-200 hover:scale-110"
              data-scheme="neon"
              style={{ background: 'linear-gradient(45deg, #ff00ff, #00ffff)' }}
            />
            <div 
              className="color-option w-6 h-6 rounded-full border-2 border-gray-400 cursor-pointer transition-all duration-200 hover:scale-110"
              data-scheme="nature"
              style={{ background: 'linear-gradient(45deg, #00ff00, #66ffcc)' }}
            />
            <div 
              className="color-option active w-6 h-6 rounded-full border-2 border-white cursor-pointer transition-all duration-200 hover:scale-110"
              data-scheme="rainbow"
              style={{ background: 'linear-gradient(45deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff)' }}
            />
          </div>
        </div>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: 'radial-gradient(circle at center, #111 0%, #000 100%)' }}
      />
    </div>
  )
}