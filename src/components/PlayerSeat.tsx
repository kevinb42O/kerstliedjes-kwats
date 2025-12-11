import { Player } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { User, Crown } from '@phosphor-icons/react'

interface PlayerSeatProps {
  player: Player
  isActive?: boolean
  isLeader?: boolean
  className?: string
}

export function PlayerSeat({ player, isActive, isLeader, className = '' }: PlayerSeatProps) {
  return (
    <Card
      className={`p-3 md:p-4 transition-all duration-300 ${
        isActive
          ? 'border-yellow-400 border-4 shadow-lg shadow-yellow-400/50 bg-yellow-400/20 scale-105 ring-4 ring-yellow-400/30'
          : 'border-border bg-card/90'
      } ${className}`}
    >
      <div className="flex items-center gap-4">
        <div className="relative flex-shrink-0">
          {/* Kerstmuts boven cirkel */}
          <div 
            className="absolute -top-3 left-1/2 -translate-x-1/2 text-3xl md:text-4xl z-10"
            style={{ 
              filter: `drop-shadow(0 2px 4px rgba(0,0,0,0.3))`,
              color: player.color || '#ef4444'
            }}
          >
            🎅
          </div>
          {/* Gekleurde cirkel */}
          <div
            className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all shadow-md border-2 ${
              isActive 
                ? 'border-yellow-400 ring-2 ring-yellow-400/50 scale-110' 
                : 'border-white/50'
            }`}
            style={{
              backgroundColor: player.color || '#ef4444'
            }}
          >
            {isLeader && (
              <Crown weight="fill" size={24} className="text-yellow-300" />
            )}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-base md:text-lg truncate">{player.name}</p>
          <Badge 
            variant="secondary"
            className="mt-1 text-sm md:text-base px-2 py-1"
            style={{
              backgroundColor: isLeader ? player.color : undefined,
              color: isLeader ? 'white' : undefined
            }}
          >
            {player.score} {player.score === 1 ? 'pt' : 'pts'}
          </Badge>
        </div>
      </div>
    </Card>
  )
}
