import { useMemo } from 'react'

interface Snowflake {
  id: number
  left: number
  delay: number
  duration: number
  size: number
}

export function SnowfallBackground() {
  const snowflakes = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 15,
      duration: 15 + Math.random() * 10,
      size: 3 + Math.random() * 3
    }))
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden bg-gradient-to-b from-background via-background to-secondary/20">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, oklch(0.75 0.15 85 / 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, oklch(0.45 0.15 20 / 0.2) 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, oklch(0.28 0.06 155 / 0.25) 0%, transparent 50%)
          `
        }}
      />
      
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute rounded-full bg-white/50 animate-snow will-change-transform"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            animationDelay: `${flake.delay}s`,
            animationDuration: `${flake.duration}s`
          }}
        />
      ))}
    </div>
  )
}
