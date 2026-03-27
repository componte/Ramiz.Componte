"use client"

import { useEffect, useRef } from "react"

interface Vector2D {
  x: number
  y: number
}

class Particle {
  pos: Vector2D = { x: 0, y: 0 }
  vel: Vector2D = { x: 0, y: 0 }
  acc: Vector2D = { x: 0, y: 0 }
  target: Vector2D = { x: 0, y: 0 }

  closeEnoughTarget = 80
  maxSpeed = 1.5
  maxForce = 0.08
  particleSize = 3
  isKilled = false

  startColor = { r: 168, g: 85, b: 247 } // text-purple-500 baseline
  targetColor = { r: 168, g: 85, b: 247 }
  colorWeight = 0
  colorBlendRate = 0.02

  move() {
    let proximityMult = 1
    const distance = Math.sqrt(Math.pow(this.pos.x - this.target.x, 2) + Math.pow(this.pos.y - this.target.y, 2))

    if (distance < this.closeEnoughTarget) {
      proximityMult = distance / this.closeEnoughTarget
    }

    const towardsTarget = {
      x: this.target.x - this.pos.x,
      y: this.target.y - this.pos.y,
    }

    const magnitude = Math.sqrt(towardsTarget.x * towardsTarget.x + towardsTarget.y * towardsTarget.y)
    if (magnitude > 0) {
      towardsTarget.x = (towardsTarget.x / magnitude) * this.maxSpeed * proximityMult
      towardsTarget.y = (towardsTarget.y / magnitude) * this.maxSpeed * proximityMult
    }

    const steer = {
      x: towardsTarget.x - this.vel.x,
      y: towardsTarget.y - this.vel.y,
    }

    const steerMagnitude = Math.sqrt(steer.x * steer.x + steer.y * steer.y)
    if (steerMagnitude > 0) {
      steer.x = (steer.x / steerMagnitude) * this.maxForce
      steer.y = (steer.y / steerMagnitude) * this.maxForce
    }

    this.acc.x += steer.x
    this.acc.y += steer.y

    this.vel.x += this.acc.x
    this.vel.y += this.acc.y
    
    // Add some subtle Brownian motion/drift so they aren't totally static when they arrive
    if (proximityMult < 0.1 && magnitude > 0) {
        this.pos.x += this.vel.x + (Math.random() - 0.5) * 0.5
        this.pos.y += this.vel.y + (Math.random() - 0.5) * 0.5
    } else {
        this.pos.x += this.vel.x
        this.pos.y += this.vel.y
    }
    
    this.acc.x = 0
    this.acc.y = 0
  }

  draw(ctx: CanvasRenderingContext2D, drawAsPoints: boolean) {
    if (this.colorWeight < 1.0) {
      this.colorWeight = Math.min(this.colorWeight + this.colorBlendRate, 1.0)
    }

    const currentColor = {
      r: Math.round(this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight),
      g: Math.round(this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight),
      b: Math.round(this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight),
    }

    // Leve effect: semi-transparent particles instead of harsh solid ones
    ctx.fillStyle = `rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, 0.7)`

    if (drawAsPoints) {
      ctx.fillRect(this.pos.x, this.pos.y, this.particleSize, this.particleSize)
    } else {
      ctx.beginPath()
      ctx.arc(this.pos.x, this.pos.y, this.particleSize / 2, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  kill(width: number, height: number) {
    if (!this.isKilled) {
      const angle = Math.random() * Math.PI * 2
      const radius = width + height
      this.target.x = width / 2 + Math.cos(angle) * radius
      this.target.y = height / 2 + Math.sin(angle) * radius

      this.startColor = {
        r: this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight,
        g: this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight,
        b: this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight,
      }
      this.targetColor = { r: 5, g: 5, b: 7 } // Fade out to background color
      this.colorWeight = 0

      this.isKilled = true
    }
  }
}

interface ParticleTextEffectProps {
  words?: string[]
}

const DEFAULT_WORDS = ["AUTOMATIZACIÓN", "IA REACTIVA", "SISTEMAS", "DATOS"]

export function ParticleTextEffect({ words = DEFAULT_WORDS }: ParticleTextEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const frameCountRef = useRef(0)
  const wordIndexRef = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const pixelSteps = 10 // Increased for lighter density ("leve" effect)
  const drawAsPoints = false

  const nextWord = (word: string, canvas: HTMLCanvasElement) => {
    const offscreenCanvas = document.createElement("canvas")
    offscreenCanvas.width = canvas.width
    offscreenCanvas.height = canvas.height
    const offscreenCtx = offscreenCanvas.getContext("2d")!

    // Calculate dynamic font size based on canvas width to avoid clipping on mobile
    const isMobile = canvas.width < 768
    const fontSize = isMobile ? Math.min(canvas.width / 6, 80) : Math.min(canvas.width / 6, 140)

    offscreenCtx.fillStyle = "white"
    offscreenCtx.font = `900 ${fontSize}px "Inter", sans-serif`
    offscreenCtx.textAlign = "center"
    offscreenCtx.textBaseline = "middle"
    // Dibujar la palabra cerca del centro para que se adapte a bandas más pequeñas (Hero)
    offscreenCtx.fillText(word, canvas.width / 2, canvas.height * 0.55)

    const imageData = offscreenCtx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data

    const particles = particlesRef.current
    let particleIndex = 0

    const coordsIndexes: number[] = []
    // Analyze pixels. Since we only draw white text, checking red channel is enough
    for (let i = 0; i < pixels.length; i += pixelSteps * 4) {
      coordsIndexes.push(i)
    }

    for (let i = coordsIndexes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[coordsIndexes[i], coordsIndexes[j]] = [coordsIndexes[j], coordsIndexes[i]]
    }

    // Brand colors: Purples, pinks, whites, light gray
    const palettes = [
      { r: 168, g: 85, b: 247 }, // #a855f7
      { r: 216, g: 180, b: 254 }, // #d8b4fe
      { r: 255, g: 255, b: 255 }, // White
      { r: 139, g: 92, b: 246 }, // #8b5cf6
    ]

    for (const coordIndex of coordsIndexes) {
      const alpha = pixels[coordIndex + 3]

      if (alpha > 50) {
        const x = (coordIndex / 4) % canvas.width
        const y = Math.floor(coordIndex / 4 / canvas.width)

        let particle: Particle

        if (particleIndex < particles.length) {
          particle = particles[particleIndex]
          particle.isKilled = false
          particleIndex++
        } else {
          particle = new Particle()
          
          // Spawn from center randomly
          const angle = Math.random() * Math.PI * 2
          const radius = Math.random() * (canvas.width / 4)
          particle.pos.x = canvas.width / 2 + Math.cos(angle) * radius
          particle.pos.y = canvas.height / 2 + Math.sin(angle) * radius

          particle.maxSpeed = Math.random() * 2 + 1.5 // Slower, elegant movement
          particle.maxForce = particle.maxSpeed * 0.05
          particle.particleSize = Math.random() * 2.5 + 1.5 // Small particles for subtlety
          particle.colorBlendRate = Math.random() * 0.02 + 0.01

          particles.push(particle)
        }

        particle.startColor = {
          r: particle.startColor.r + (particle.targetColor.r - particle.startColor.r) * particle.colorWeight,
          g: particle.startColor.g + (particle.targetColor.g - particle.startColor.g) * particle.colorWeight,
          b: particle.startColor.b + (particle.targetColor.b - particle.startColor.b) * particle.colorWeight,
        }
        
        // Pick random brand color
        particle.targetColor = palettes[Math.floor(Math.random() * palettes.length)]
        particle.colorWeight = 0

        particle.target.x = x
        particle.target.y = y
      }
    }

    for (let i = particleIndex; i < particles.length; i++) {
      particles[i].kill(canvas.width, canvas.height)
    }
  }

  const animate = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")!
    const particles = particlesRef.current

    // Trail effect background (matches #050507 site background)
    ctx.fillStyle = "rgba(5, 5, 7, 0.15)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (let i = particles.length - 1; i >= 0; i--) {
      const particle = particles[i]
      particle.move()
      particle.draw(ctx, drawAsPoints)

      if (particle.isKilled) {
        if (
          particle.pos.x < -100 ||
          particle.pos.x > canvas.width + 100 ||
          particle.pos.y < -100 ||
          particle.pos.y > canvas.height + 100
        ) {
          particles.splice(i, 1)
        }
      }
    }

    frameCountRef.current++
    if (frameCountRef.current % 500 === 0) { // Change word every ~8.5 seconds so they hold the shape longer
      wordIndexRef.current = (wordIndexRef.current + 1) % words.length
      nextWord(words[wordIndexRef.current], canvas)
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const resizeCanvas = () => {
      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
      nextWord(words[wordIndexRef.current], canvas)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-30 mix-blend-screen">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  )
}
