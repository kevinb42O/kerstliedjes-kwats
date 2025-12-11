import { useEffect, useState } from 'react'

interface Snowflake {
  id: number
  left: number
  delay: number
  duration: number
  size: number
}

export function SnowfallBackground() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([])

  useEffect(() => {
    const flakes: Snowflake[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 15,
      duration: 10 + Math.random() * 15,
      size: 2 + Math.random() * 4
    }))
    setSnowflakes(flakes)
  }, [])

  return (
    <>
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
            className="absolute rounded-full bg-white/60 animate-snow backdrop-blur-[1px]"
            style={{
              left: `${flake.left}%`,
              width: `${flake.size}px`,
              height: `${flake.size}px`,
              animationDelay: `${flake.delay}s`,
              animationDuration: `${flake.duration}s`,
              boxShadow: `0 0 ${flake.size * 2}px rgba(255, 255, 255, 0.5)`
            }}
          />
        ))}
      </div>
    </>
  )
}
