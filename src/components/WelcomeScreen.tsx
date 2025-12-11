import { Button } from '@/components/ui/button'
import { Play, Sparkle, Tree, Gift } from '@phosphor-icons/react'

interface WelcomeScreenProps {
  onStart: () => void
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Grote kerstboom in het midden achteraan */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <div className="text-center">
          <div className="text-[40rem] leading-none">🎄</div>
        </div>
      </div>

      {/* Kleine decoratie bomen in de hoeken */}
      <div className="absolute top-10 left-10 opacity-15">
        <Tree className="w-24 h-24 text-accent" weight="fill" />
      </div>
      
      <div className="absolute bottom-10 right-10 opacity-15">
        <Gift className="w-20 h-20 text-primary" weight="fill" />
      </div>

      {/* Cadeautjes decoratie */}
      <div className="absolute top-20 right-20 opacity-10 text-6xl">🎁</div>
      <div className="absolute bottom-20 left-20 opacity-10 text-5xl">⭐</div>

      <div className="text-center max-w-2xl relative z-10">
        <div className="mb-6">
          <div className="text-6xl mb-4">🎅🎄🎁</div>
        </div>

        <h1 className="font-display font-bold text-5xl md:text-7xl text-accent mb-3 tracking-tight drop-shadow-lg animate-in fade-in duration-1000">
          Huh luck ig knew yar!
        </h1>
        
        <h2 className="font-display text-2xl md:text-3xl text-accent/80 mb-6 italic">
          🎵 Het Mad Gab Kerstspel 🎵
        </h2>
        
        <p className="text-xl md:text-2xl text-foreground/90 mb-8 leading-relaxed">
          Raad het kerstlied aan de hand van <span className="font-bold text-accent">verhaspelde uitspraak</span>
        </p>
        
        <div className="bg-card/90 rounded-2xl p-6 mb-10 border border-accent/30 shadow-lg">
          <p className="text-foreground/80 text-lg leading-relaxed">
            Speel rond de tafel, geef de telefoon door, lees de verhaspelde liedjes voor, 
            en laat je vrienden raden welk kerstlied het is!
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
