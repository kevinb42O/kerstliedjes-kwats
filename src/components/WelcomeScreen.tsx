import { Button } from '@/components/ui/button'
import { Play } from '@phosphor-icons/react'

interface WelcomeScreenProps {
  onStart: () => void
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* CSS Christmas Tree */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="christmas-tree">
          {/* Tree top star */}
          <div className="tree-star"></div>
          
          {/* Tree layers */}
          <div className="tree-layer tree-layer-1"></div>
          <div className="tree-layer tree-layer-2"></div>
          <div className="tree-layer tree-layer-3"></div>
          <div className="tree-layer tree-layer-4"></div>
          <div className="tree-layer tree-layer-5"></div>
          
          {/* Tree trunk */}
          <div className="tree-trunk"></div>
          
          {/* Twinkling lights - Layer 1 */}
          <div className="light light-1"></div>
          <div className="light light-2"></div>
          <div className="light light-3"></div>
          
          {/* Twinkling lights - Layer 2 */}
          <div className="light light-4"></div>
          <div className="light light-5"></div>
          <div className="light light-6"></div>
          <div className="light light-7"></div>
          <div className="light light-8"></div>
          
          {/* Twinkling lights - Layer 3 */}
          <div className="light light-9"></div>
          <div className="light light-10"></div>
          <div className="light light-11"></div>
          <div className="light light-12"></div>
          <div className="light light-13"></div>
          
          {/* Twinkling lights - Layer 4 */}
          <div className="light light-14"></div>
          <div className="light light-15"></div>
          <div className="light light-16"></div>
          <div className="light light-17"></div>
          <div className="light light-18"></div>
          
          {/* Twinkling lights - Layer 5 */}
          <div className="light light-19"></div>
          <div className="light light-20"></div>
          <div className="light light-21"></div>
          <div className="light light-22"></div>
          <div className="light light-23"></div>
          <div className="light light-24"></div>
          <div className="light light-25"></div>
          <div className="light light-26"></div>
          <div className="light light-27"></div>
          <div className="light light-28"></div>
        </div>
      </div>

      <div className="text-center max-w-2xl relative z-10">
        <h1 className="font-display font-bold text-5xl md:text-7xl mb-3 tracking-tight drop-shadow-lg animate-in fade-in duration-1000">
          <span style={{ color: 'oklch(0.55 0.22 25)' }}>Hulukuh</span>{' '}
          <span style={{ color: 'oklch(0.45 0.15 155)' }}>Knew</span>{' '}
          <span style={{ color: 'oklch(0.75 0.15 85)' }}>Yar!</span>
        </h1>
        
        <h2 className="font-display text-2xl md:text-3xl text-accent/80 mb-4 italic">
          Het Dronken gebrabbel raadspel
        </h2>
        
        <p className="text-xl md:text-2xl text-foreground/90 mb-8 leading-relaxed">
          Raad het woord aan de hand van <span className="font-bold text-accent">de dronken uitspraak...</span>
        </p>
        
        <p className="text-lg text-foreground/70 mb-8 italic">
          Veel plezier en een fijn eindejaar voor iedereen.
        </p>
        
        <div className="bg-card/90 rounded-2xl p-6 mb-10 border border-accent/30 shadow-lg backdrop-blur-sm">
          <p className="text-foreground/80 text-lg leading-relaxed">
            Speel rond de tafel, geef de telefoon door, lees de verhaspelde teksten voor, 
            en laat je vrienden raden welk woord het is!
          </p>
        </div>

        <Button
          size="lg"
          onClick={onStart}
          className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all active:scale-95"
        >
          <Play weight="fill" className="mr-2" size={24} />
          Start het spel
        </Button>
      </div>
    </div>
  )
}
