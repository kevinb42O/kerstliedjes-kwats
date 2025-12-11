import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface ConfettiProps {
  trigger: boolean
  onComplete?: () => void
}

interface Particle {
  id: number
  x: number
  color: string
}

export function Confetti({ trigger, onComplete }: ConfettiProps) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    if (trigger) {
      const colors = ['#FFD700', '#BF0A30', '#1A4314']
      const newParticles: Particle[] = Array.from({ length: 7 }, (_, i) => ({
        id: Date.now() + i,
        x: -30 + (i * 10),
        color: colors[Math.floor(Math.random() * colors.length)]
      }))
      setParticles(newParticles)

      const timer = setTimeout(() => {
        setParticles([])
        onComplete?.()
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [trigger, onComplete])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: particle.color,
            left: '50%',
            top: '50%'
          }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{
            x: particle.x,
            y: 100,
            opacity: 0,
            rotate: 360
          }}
          transition={{
            duration: 1.5,
            ease: 'easeOut'
          }}
        />
      ))}
    </div>
  )
}
