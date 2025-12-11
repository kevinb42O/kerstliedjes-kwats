import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Player } from '@/lib/types'
import { PlayerSeat } from './PlayerSeat'
import { UserPlus, ArrowRight } from '@phosphor-icons/react'

interface SeatingScreenProps {
  players: Player[]
  onAddPlayer: (name: string) => void
  onComplete: () => void
}

export function SeatingScreen({ players, onAddPlayer, onComplete }: SeatingScreenProps) {
  const [nameInput, setNameInput] = useState('')

  const handleAddPlayer = () => {
    if (nameInput.trim() && players.length < 15) {
      onAddPlayer(nameInput.trim())
      setNameInput('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddPlayer()
    }
  }

  return (
    <div className="min-h-screen p-6 relative">
      <div className="max-w-2xl mx-auto">
        <div>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-center mb-2 text-accent drop-shadow-lg">
            Wie speelt mee?
          </h1>
          <p className="text-center text-foreground/70 mb-8">
            Voeg spelers toe door de telefoon rond te geven
          </p>
        </div>

        {players.length > 0 && (
          <div className="mb-8 space-y-3">
            {players.map((player) => (
              <PlayerSeat key={player.id} player={player} />
            ))}
          </div>
        )}

        <Card className="p-6 mb-6 border-2 border-accent/30 bg-card/90 shadow-xl">
          <div className="space-y-4">
            <div>
              <label htmlFor="player-name" className="block text-sm font-semibold mb-2 text-foreground">
                {players.length === 0 ? 'Hallo! Wat is jouw naam, Kerstman/vrouw?' : 'Geef de telefoon door aan de volgende speler'}
              </label>
              <Input
                id="player-name"
                type="text"
                placeholder="Vul je naam in..."
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="text-lg border-2 focus:border-accent bg-background/50"
                maxLength={20}
                autoFocus
              />
            </div>
            
            <Button
              onClick={handleAddPlayer}
              disabled={!nameInput.trim() || players.length >= 15}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg font-bold uppercase tracking-wide shadow-md active:scale-95 transition-all"
              size="lg"
            >
              <UserPlus weight="bold" className="mr-2" size={24} />
              {players.length >= 15 ? 'Maximaal aantal spelers bereikt' : 'Bevestig mijn plek'}
            </Button>
          </div>
        </Card>

        {players.length >= 2 && (
          <div>
            <Button
              onClick={onComplete}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-6 text-lg font-bold uppercase tracking-wide shadow-lg active:scale-95 transition-all"
              size="lg"
            >
              Klaar om te spelen
              <ArrowRight weight="bold" className="ml-2" size={24} />
            </Button>
          </div>
        )}

        {players.length === 1 && (
          <p className="text-center text-foreground/60 text-sm mt-4">
            Voeg minstens nog één speler toe om te beginnen
          </p>
        )}
        {players.length >= 15 && (
          <p className="text-center text-accent font-bold text-sm mt-4">
            🎅 Maximaal aantal spelers (15) bereikt!
          </p>
        )}
      </div>
    </div>
  )
}
