import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sparkle } from '@phosphor-icons/react'

interface RoundTransitionProps {
  categoryName: string
  roundNumber: number
  isFinale?: boolean
  onContinue: () => void
}

export function RoundTransition({ 
  categoryName, 
  roundNumber, 
  isFinale = false,
  onContinue 
}: RoundTransitionProps) {
  const [showContinue, setShowContinue] = useState(false)

  useEffect(() => {
    // Auto-continue after 3 seconds, or show button after 1.5 seconds
    const buttonTimer = setTimeout(() => setShowContinue(true), 1500)
    const autoTimer = setTimeout(() => onContinue(), 3000)
    
    return () => {
      clearTimeout(buttonTimer)
      clearTimeout(autoTimer)
    }
  }, [onContinue])

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card 
        className={`w-full max-w-3xl p-12 md:p-20 text-center relative overflow-hidden ${
          isFinale 
            ? 'bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-600 border-4 border-yellow-300' 
            : 'bg-gradient-to-br from-primary via-primary/90 to-secondary border-4 border-accent'
        }`}
      >
        {/* Background effects */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 30%, oklch(0.85 0.2 ${isFinale ? '60' : '85'} / 0.5) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, oklch(0.85 0.2 ${isFinale ? '60' : '85'} / 0.4) 0%, transparent 50%)
              `
            }}
          />
        </div>

        {/* Sparkle effects for finale */}
        {isFinale && (
          <div className="absolute inset-0 pointer-events-none">
            <Sparkle 
              weight="fill" 
              size={40} 
              className="absolute top-8 left-8 text-yellow-200 animate-pulse" 
              style={{ animationDelay: '0s' }}
            />
            <Sparkle 
              weight="fill" 
              size={32} 
              className="absolute top-12 right-12 text-yellow-100 animate-pulse" 
              style={{ animationDelay: '0.3s' }}
            />
            <Sparkle 
              weight="fill" 
              size={36} 
              className="absolute bottom-16 left-16 text-yellow-300 animate-pulse" 
              style={{ animationDelay: '0.6s' }}
            />
            <Sparkle 
              weight="fill" 
              size={28} 
              className="absolute bottom-12 right-8 text-yellow-200 animate-pulse" 
              style={{ animationDelay: '0.9s' }}
            />
          </div>
        )}

        <div className="relative z-10">
          {isFinale ? (
            <>
              <div className="text-7xl md:text-9xl mb-8 animate-bounce">🎊</div>
              <h2 className="font-display font-bold text-4xl md:text-6xl mb-4 text-white drop-shadow-2xl">
                FINALE!
              </h2>
              <p className="text-2xl md:text-4xl font-bold text-yellow-100 drop-shadow-xl mb-2">
                {categoryName}
              </p>
              <p className="text-xl md:text-2xl text-white/90 drop-shadow-lg">
                De laatste ronde begint...
              </p>
            </>
          ) : (
            <>
              <div className="text-6xl md:text-8xl mb-8">🎯</div>
              <h2 className="font-display font-bold text-3xl md:text-5xl mb-4 text-accent drop-shadow-xl">
                Ronde {roundNumber}
              </h2>
              <p className="text-2xl md:text-4xl font-bold text-accent/90 drop-shadow-lg mb-2">
                {categoryName}
              </p>
              <p className="text-xl md:text-2xl text-accent/80 drop-shadow-md">
                Nieuwe categorie!
              </p>
            </>
          )}

          {showContinue && (
            <div className="mt-12 animate-in fade-in duration-300">
              <Button
                onClick={onContinue}
                size="lg"
                className={`px-8 py-6 text-xl font-bold ${
                  isFinale
                    ? 'bg-white text-orange-600 hover:bg-yellow-50'
                    : 'bg-accent hover:bg-accent/90 text-accent-foreground'
                }`}
              >
                Start de ronde
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
