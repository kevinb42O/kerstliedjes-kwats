import { Button } from '@/components/ui/button'
import { Player } from '@/lib/types'
import { PlayerSeat } from './PlayerSeat'
import { Play } from '@phosphor-icons/react'

interface ConfirmScreenProps {
  players: Player[]
  onStart: () => void
}

export function ConfirmScreen({ players, onStart }: ConfirmScreenProps) {
  return (
    <div className="min-h-screen p-6 relative">
      <div className="max-w-2xl mx-auto">
        <div>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-center mb-2 text-accent drop-shadow-lg">
            Iedereen aan tafel!
          </h1>
          <p className="text-center text-foreground/70 mb-8">
            Bevestig om de Kerst Kwats te beginnen
          </p>
        </div>

        <div className="mb-8 space-y-3">
          {players.map((player) => (
            <PlayerSeat key={player.id} player={player} />
          ))}
        </div>

        <div>
          <Button
            onClick={onStart}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-8 text-xl font-bold uppercase tracking-wide shadow-xl active:scale-95 transition-all"
            size="lg"
          >
            <Play weight="fill" className="mr-2" size={28} />
            Start de Kerst Kwats!
          </Button>
        </div>
      </div>
    </div>
  )
}
