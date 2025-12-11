import { useState, useEffect, useMemo, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Player, Song } from '@/lib/types'
import { PlayerSeat } from './PlayerSeat'
import { Eye, CheckCircle, SkipForward, SignOut } from '@phosphor-icons/react'
import { Confetti } from './Confetti'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface PlayingScreenProps {
  players: Player[]
  currentPlayerIndex: number
  currentSong: Song | null
  skipsRemaining: number
  onRevealSong: () => void
  onCorrectGuess: (playerId: string) => void
  onSkipSong: () => void
  onEndGame: () => void
}

export function PlayingScreen({
  players,
  currentPlayerIndex,
  currentSong,
  skipsRemaining,
  onRevealSong,
  onCorrectGuess,
  onSkipSong,
  onEndGame
}: PlayingScreenProps) {
  const [showSong, setShowSong] = useState(false)
  const [selectingGuesser, setSelectingGuesser] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showEndDialog, setShowEndDialog] = useState(false)
  const [isSelecting, setIsSelecting] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)

  const currentPlayer = players[currentPlayerIndex]
  const roundNumber = useMemo(() => players.reduce((sum, p) => sum + p.score, 0) + 1, [players])
  const leaderScore = useMemo(() => Math.max(...players.map(p => p.score)), [players])

  useEffect(() => {
    if (!showSong && currentPlayer) {
      setIsSelecting(true)
      let count = 0
      const maxCount = 15
      const interval = setInterval(() => {
        setHighlightedIndex(Math.floor(Math.random() * players.length))
        count++
        if (count >= maxCount) {
          clearInterval(interval)
          setHighlightedIndex(currentPlayerIndex)
          setTimeout(() => setIsSelecting(false), 500)
        }
      }, 80)

      return () => clearInterval(interval)
    }
  }, [currentPlayerIndex, players.length, showSong, currentPlayer])

  const handleRevealSong = useCallback(() => {
    setShowSong(true)
    onRevealSong()
  }, [onRevealSong])

  const handleCorrectGuess = useCallback((playerId: string) => {
    setShowConfetti(true)
    setTimeout(() => {
      onCorrectGuess(playerId)
      setShowSong(false)
      setSelectingGuesser(false)
    }, 1000)
  }, [onCorrectGuess])

  const handleSkip = useCallback(() => {
    onSkipSong()
    setShowSong(false)
  }, [onSkipSong])

  const handleEndGame = useCallback(() => {
    setShowEndDialog(false)
    onEndGame()
  }, [onEndGame])

  return (
    <div className="min-h-screen p-6 relative">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-display font-semibold text-2xl text-accent drop-shadow-md">
            Ronde {roundNumber}
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowEndDialog(true)}
            className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            <SignOut className="mr-2" size={18} />
            Einde spel
          </Button>
        </div>

        <div className="mb-8 space-y-3">
          {players.map((player, index) => (
            <PlayerSeat
              key={player.id}
              player={player}
              isActive={isSelecting ? index === highlightedIndex : index === currentPlayerIndex}
              isLeader={player.score === leaderScore && player.score > 0}
            />
          ))}
        </div>

        {!showSong ? (
          <Card className="p-8 text-center bg-card/90 text-foreground border-2 border-accent/40 shadow-xl">
            <p className="text-2xl font-bold mb-6">
              {isSelecting ? 'Wie moet voorlezen...' : `${currentPlayer?.name} is aan de beurt!`}
            </p>
            {!isSelecting && (
              <Button
                onClick={handleRevealSong}
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg font-bold uppercase tracking-wide shadow-lg active:scale-95 transition-all"
                size="lg"
              >
                <Eye weight="bold" className="mr-2" size={24} />
                Onthul het lied
              </Button>
            )}
          </Card>
        ) : (
          <div>
            <Card className="p-8 mb-6 bg-gradient-to-br from-primary via-primary/90 to-secondary text-foreground border-2 border-accent relative overflow-hidden shadow-2xl">
              <Confetti trigger={showConfetti} onComplete={() => setShowConfetti(false)} />
              
              <div className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 20% 30%, oklch(0.75 0.15 85 / 0.4) 0%, transparent 50%),
                    radial-gradient(circle at 80% 70%, oklch(0.75 0.15 85 / 0.3) 0%, transparent 50%)
                  `
                }}
              />
              
              <div className="relative z-10">
                <p className="text-sm uppercase tracking-widest mb-4 text-accent font-bold">
                  Lees dit hardop voor:
                </p>
                <p className="text-3xl md:text-4xl font-bold leading-relaxed text-accent tracking-wide mb-6 font-lato drop-shadow-lg">
                  {currentSong?.gibberish}
                </p>
              </div>
            </Card>

            {!selectingGuesser ? (
              <div className="space-y-3">
                <Button
                  onClick={() => setSelectingGuesser(true)}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-6 text-lg font-bold uppercase tracking-wide shadow-lg active:scale-95 transition-all"
                  size="lg"
                >
                  <CheckCircle weight="fill" className="mr-2" size={24} />
                  Goed geraden!
                </Button>
                <Button
                  onClick={handleSkip}
                  variant="outline"
                  className="w-full py-4 border-2 border-foreground/30 hover:bg-card/50"
                  size="lg"
                >
                  <SkipForward className="mr-2" size={20} />
                  Nieuw lied ({skipsRemaining}/3 skips over)
                </Button>
              </div>
            ) : (
              <Card className="p-6 bg-card/90 shadow-xl">
                <p className="text-lg font-semibold mb-4 text-center">Wie heeft het geraden?</p>
                <div className="space-y-2">
                  {players.map((player) => (
                    <Button
                      key={player.id}
                      onClick={() => handleCorrectGuess(player.id)}
                      variant={player.id === currentPlayer.id ? 'outline' : 'default'}
                      className="w-full justify-start text-lg py-6 active:scale-95 transition-all"
                      size="lg"
                    >
                      {player.name}
                    </Button>
                  ))}
                </div>
              </Card>
            )}
          </div>
        )}
      </div>

      <Dialog open={showEndDialog} onOpenChange={setShowEndDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Spel beëindigen?</DialogTitle>
            <DialogDescription>
              Weet je zeker dat je het spel wilt beëindigen? Je gaat naar het scorebord.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEndDialog(false)}>
              Annuleren
            </Button>
            <Button onClick={handleEndGame} className="bg-destructive hover:bg-destructive/90">
              Beëindig spel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
