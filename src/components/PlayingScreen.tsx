import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Player, Song } from '@/lib/types'
import { PlayerSeat } from './PlayerSeat'
import { Eye, CheckCircle, SkipForward, SignOut } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
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
  onRevealSong: () => void
  onCorrectGuess: (playerId: string) => void
  onSkipSong: () => void
  onEndGame: () => void
}

export function PlayingScreen({
  players,
  currentPlayerIndex,
  currentSong,
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

  useEffect(() => {
    if (!showSong && currentPlayer) {
      setIsSelecting(true)
      let count = 0
      const maxCount = 20
      const interval = setInterval(() => {
        setHighlightedIndex(Math.floor(Math.random() * players.length))
        count++
        if (count >= maxCount) {
          clearInterval(interval)
          setHighlightedIndex(currentPlayerIndex)
          setTimeout(() => setIsSelecting(false), 800)
        }
      }, 100)

      return () => clearInterval(interval)
    }
  }, [currentPlayerIndex, players.length, showSong, currentPlayer])

  const handleRevealSong = () => {
    setShowSong(true)
    onRevealSong()
  }

  const handleCorrectGuess = (playerId: string) => {
    setShowConfetti(true)
    setTimeout(() => {
      onCorrectGuess(playerId)
      setShowSong(false)
      setSelectingGuesser(false)
    }, 1500)
  }

  const handleSkip = () => {
    onSkipSong()
    setShowSong(false)
  }

  const handleEndGame = () => {
    setShowEndDialog(false)
    onEndGame()
  }

  const leaderScore = Math.max(...players.map(p => p.score))

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-background to-muted">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-display font-semibold text-2xl text-secondary">
            Ronde {players.reduce((sum, p) => sum + p.score, 0) + 1}
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

        <AnimatePresence mode="wait">
          {!showSong ? (
            <motion.div
              key="reveal-button"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Card className="p-8 text-center bg-secondary text-secondary-foreground border-2 border-accent/30">
                <p className="text-2xl font-bold mb-6">
                  {isSelecting ? 'Wie moet voorlezen...' : `${currentPlayer?.name} is aan de beurt!`}
                </p>
                {!isSelecting && (
                  <Button
                    onClick={handleRevealSong}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg font-bold uppercase tracking-wide shadow-lg"
                    size="lg"
                  >
                    <Eye weight="bold" className="mr-2" size={24} />
                    Onthul het lied
                  </Button>
                )}
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="song-display"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="p-8 mb-6 bg-gradient-to-br from-primary to-secondary text-secondary-foreground border-2 border-accent relative overflow-hidden">
                <Confetti trigger={showConfetti} onComplete={() => setShowConfetti(false)} />
                
                <div className="relative z-10">
                  <p className="text-sm uppercase tracking-widest mb-4 text-accent font-bold">
                    Lees dit hardop voor:
                  </p>
                  <p className="text-3xl md:text-4xl font-bold leading-relaxed text-accent tracking-wide mb-6 font-lato">
                    {currentSong?.gibberish}
                  </p>
                </div>
              </Card>

              {!selectingGuesser ? (
                <div className="space-y-3">
                  <Button
                    onClick={() => setSelectingGuesser(true)}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-6 text-lg font-bold uppercase tracking-wide"
                    size="lg"
                  >
                    <CheckCircle weight="fill" className="mr-2" size={24} />
                    Goed geraden!
                  </Button>
                  <Button
                    onClick={handleSkip}
                    variant="outline"
                    className="w-full py-4 border-2"
                    size="lg"
                  >
                    <SkipForward className="mr-2" size={20} />
                    Sla dit lied over
                  </Button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Card className="p-6 bg-card">
                    <p className="text-lg font-semibold mb-4 text-center">Wie heeft het geraden?</p>
                    <div className="space-y-2">
                      {players.map((player) => (
                        <Button
                          key={player.id}
                          onClick={() => handleCorrectGuess(player.id)}
                          variant={player.id === currentPlayer.id ? 'outline' : 'default'}
                          className="w-full justify-start text-lg py-6"
                          size="lg"
                        >
                          {player.name}
                        </Button>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
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
