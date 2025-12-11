import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Player } from '@/lib/types'
import { getLeaderboard } from '@/lib/game-utils'
import { Crown, Sparkle, ArrowCounterClockwise } from '@phosphor-icons/react'

interface LeaderboardScreenProps {
  players: Player[]
  onPlayAgain: () => void
}

export function LeaderboardScreen({ players, onPlayAgain }: LeaderboardScreenProps) {
  const leaderboard = getLeaderboard(players)
  const winner = leaderboard[0]

  return (
    <div className="min-h-screen p-6 relative">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div>
            <Crown className="w-20 h-20 mx-auto text-accent mb-4 drop-shadow-lg" weight="fill" />
          </div>
          
          <h1 className="font-display font-bold text-4xl md:text-5xl text-accent mb-2 drop-shadow-lg">
            Kerstliedjes Kwats
          </h1>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4 drop-shadow-md">
            Kampioen!
          </h2>
          
          <Card className="inline-block px-8 py-4 bg-accent/30 border-2 border-accent shadow-xl">
            <p className="text-2xl font-bold text-accent flex items-center gap-2">
              <Sparkle weight="fill" />
              {winner.name}
              <Sparkle weight="fill" />
            </p>
            <p className="text-lg text-foreground mt-1">
              {winner.score} {winner.score === 1 ? 'punt' : 'punten'}
            </p>
          </Card>
        </div>

        <div className="space-y-3 mb-8">
          {leaderboard.map((player, index) => (
            <Card
              key={player.id}
              className={`p-6 ${
                index === 0
                  ? 'bg-accent/30 border-2 border-accent shadow-xl'
                  : index === 1
                  ? 'bg-foreground/10 border-2 border-foreground/30 shadow-lg'
                  : index === 2
                  ? 'bg-primary/20 border-2 border-primary/50 shadow-lg'
                  : 'bg-card/90 shadow-md'
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-md ${
                    index === 0
                      ? 'bg-accent text-accent-foreground'
                      : index === 1
                      ? 'bg-foreground/30 text-foreground'
                      : index === 2
                      ? 'bg-primary/50 text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-xl font-bold">{player.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-accent drop-shadow-md">
                    {player.score}
                  </p>
                  <p className="text-sm text-foreground/60">
                    {player.score === 1 ? 'punt' : 'punten'}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div>
          <Button
            onClick={onPlayAgain}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-8 text-xl font-bold uppercase tracking-wide shadow-xl active:scale-95 transition-all"
            size="lg"
          >
            <ArrowCounterClockwise weight="bold" className="mr-2" size={28} />
            Nog een keer spelen
          </Button>
        </div>
      </div>
    </div>
  )
}
