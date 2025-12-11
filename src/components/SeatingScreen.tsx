import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Player } from '@/lib/types'
import { PlayerSeat } from './PlayerSeat'
import { UserPlus, ArrowRight } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface SeatingScreenProps {
  players: Player[]
  onAddPlayer: (name: string) => void
  onComplete: () => void
}

export function SeatingScreen({ players, onAddPlayer, onComplete }: SeatingScreenProps) {
  const [nameInput, setNameInput] = useState('')

  const handleAddPlayer = () => {
    if (nameInput.trim()) {
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
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="font-display font-bold text-4xl md:text-5xl text-center mb-2 text-accent drop-shadow-lg">
            Wie speelt mee?
          </h1>
          <p className="text-center text-foreground/70 mb-8">
            Voeg spelers toe door de telefoon rond te geven
          </p>
        </motion.div>

        {players.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 space-y-3"
          >
            {players.map((player) => (
              <PlayerSeat key={player.id} player={player} />
            ))}
          </motion.div>
        )}

        <Card className="p-6 mb-6 border-2 border-accent/30 bg-card/80 backdrop-blur-md shadow-xl">
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
              disabled={!nameInput.trim()}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg font-bold uppercase tracking-wide shadow-md hover:shadow-lg transition-all hover:scale-105"
              size="lg"
            >
              <UserPlus weight="bold" className="mr-2" size={24} />
              Bevestig mijn plek
            </Button>
          </div>
        </Card>

        {players.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              onClick={onComplete}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-6 text-lg font-bold uppercase tracking-wide shadow-lg hover:shadow-xl transition-all hover:scale-105"
              size="lg"
            >
              Klaar om te spelen
              <ArrowRight weight="bold" className="ml-2" size={24} />
            </Button>
          </motion.div>
        )}

        {players.length === 1 && (
          <p className="text-center text-foreground/60 text-sm mt-4">
            Voeg minstens nog één speler toe om te beginnen
          </p>
        )}
      </div>
    </div>
  )
}
