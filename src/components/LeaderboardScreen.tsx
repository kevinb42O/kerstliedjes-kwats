import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Player } from '@/lib/types'
import { getLeaderboard } from '@/lib/game-utils'
import { Crown, Sparkle, ArrowCounterClockwise } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface LeaderboardScreenProps {
  players: Player[]
  onPlayAgain: () => void
}

export function LeaderboardScreen({ players, onPlayAgain }: LeaderboardScreenProps) {
  const leaderboard = getLeaderboard(players)
  const winner = leaderboard[0]

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-secondary via-secondary/95 to-primary/80">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 10, 0],
              scale: [1, 1.1, 1, 1.1, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          >
            <Crown className="w-20 h-20 mx-auto text-accent mb-4" weight="fill" />
          </motion.div>
          
          <h1 className="font-display font-bold text-4xl md:text-5xl text-accent mb-2">
            Kerstliedjes Kwats
          </h1>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-secondary-foreground mb-4">
            Kampioen!
          </h2>
          
          <Card className="inline-block px-8 py-4 bg-accent/20 border-2 border-accent backdrop-blur-sm">
            <p className="text-2xl font-bold text-accent flex items-center gap-2">
              <Sparkle weight="fill" />
              {winner.name}
              <Sparkle weight="fill" />
            </p>
            <p className="text-lg text-secondary-foreground mt-1">
              {winner.score} {winner.score === 1 ? 'punt' : 'punten'}
            </p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3 mb-8"
        >
          {leaderboard.map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Card
                className={`p-6 ${
                  index === 0
                    ? 'bg-gradient-to-r from-accent/20 to-accent/10 border-2 border-accent'
                    : index === 1
                    ? 'bg-muted/50 border-2 border-muted-foreground/20'
                    : index === 2
                    ? 'bg-primary/10 border-2 border-primary/30'
                    : 'bg-card'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl ${
                      index === 0
                        ? 'bg-accent text-accent-foreground'
                        : index === 1
                        ? 'bg-muted-foreground/30 text-foreground'
                        : index === 2
                        ? 'bg-primary/30 text-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-xl font-bold">{player.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-accent">
                      {player.score}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {player.score === 1 ? 'punt' : 'punten'}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            onClick={onPlayAgain}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-8 text-xl font-bold uppercase tracking-wide shadow-xl"
            size="lg"
          >
            <ArrowCounterClockwise weight="bold" className="mr-2" size={28} />
            Nog een keer spelen
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
