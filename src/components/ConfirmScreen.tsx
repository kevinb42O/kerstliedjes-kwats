import { Button } from '@/components/ui/button'
import { Player } from '@/lib/types'
import { PlayerSeat } from './PlayerSeat'
import { Play } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface ConfirmScreenProps {
  players: Player[]
  onStart: () => void
}

export function ConfirmScreen({ players, onStart }: ConfirmScreenProps) {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-background to-muted">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="font-display font-bold text-4xl md:text-5xl text-center mb-2 text-secondary">
            Iedereen aan tafel!
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            Bevestig om de Kerst Kwats te beginnen
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 space-y-3"
        >
          {players.map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <PlayerSeat player={player} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            onClick={onStart}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-8 text-xl font-bold uppercase tracking-wide shadow-xl"
            size="lg"
          >
            <Play weight="fill" className="mr-2" size={28} />
            Start de Kerst Kwats!
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
