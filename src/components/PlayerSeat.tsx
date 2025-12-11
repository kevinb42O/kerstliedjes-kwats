import { Player } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { User } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface PlayerSeatProps {
  player: Player
  isActive?: boolean
  isLeader?: boolean
  className?: string
}

export function PlayerSeat({ player, isActive, isLeader, className = '' }: PlayerSeatProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <Card
        className={`p-4 transition-all duration-300 ${
          isActive
            ? 'border-accent shadow-lg shadow-accent/20 bg-accent/5'
            : 'border-border'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isActive ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'
            }`}
          >
            <User weight="fill" size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-lg truncate">{player.name}</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={isLeader ? 'default' : 'secondary'} className={isLeader ? 'bg-accent text-accent-foreground' : ''}>
                {player.score} {player.score === 1 ? 'punt' : 'punten'}
              </Badge>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
