import { useEffect, useState, useMemo } from 'react'

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
  const [isActive, setIsActive] = useState(false)

  const particles = useMemo(() => {
    const colors = ['#FFD700', '#BF0A30', '#1A4314']
    return Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: -25 + (i * 12),
      color: colors[i % colors.length]
    }))
  }, [])

  useEffect(() => {
    if (trigger) {
      setIsActive(true)
      const timer = setTimeout(() => {
        setIsActive(false)
        onComplete?.()
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [trigger, onComplete])

  if (!isActive) return null

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full animate-confetti will-change-transform"
          style={{
            backgroundColor: particle.color,
            left: '50%',
            top: '50%',
            transform: `translate(${particle.x}px, 100px) rotate(360deg)`,
            opacity: 0
          }}
        />
      ))}
    </div>
  )
}
