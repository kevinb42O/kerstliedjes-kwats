import { useState, useEffect, useMemo, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Player, Song } from '@/lib/types'
import { PlayerSeat } from './PlayerSeat'
import { Eye, CheckCircle, SkipForward, SignOut, Crown, User } from '@phosphor-icons/react'
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
  const [showAnswer, setShowAnswer] = useState(false)

  const currentPlayer = players[currentPlayerIndex]
  const roundNumber = useMemo(() => players.reduce((sum, p) => sum + p.score, 0) + 1, [players])
  const leaderScore = useMemo(() => Math.max(...players.map(p => p.score)), [players])

  useEffect(() => {
    if (currentSong) {
      setShowSong(true)
      setShowAnswer(false)
    }
  }, [currentSong])

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
  }, [onSkipSong])

  const handleEndGame = useCallback(() => {
    setShowEndDialog(false)
    onEndGame()
  }, [onEndGame])

  // Verdeel spelers voor rechthoekige tafel layout
  const topPlayers = players.slice(0, Math.ceil(players.length / 2))
  const bottomPlayers = players.slice(Math.ceil(players.length / 2))

  return (
    <div className="min-h-screen p-4 md:p-6 relative flex flex-col">
      <Confetti trigger={showConfetti} onComplete={() => setShowConfetti(false)} />
      
      {/* Header met ronde info */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-display font-semibold text-xl md:text-2xl text-accent drop-shadow-md">
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

      {/* Kersttafel view - alleen tonen als lied NIET wordt getoond */}
      {!showSong && (
        <div className="mb-6 relative">
          {/* Bovenkant van tafel - spelers als kleine cirkels met kerstmuts */}
          <div className="flex justify-around mb-3 flex-wrap gap-2">
            {topPlayers.map((player, index) => {
              const isPlayerActive = isSelecting ? index === highlightedIndex : index === currentPlayerIndex
              const isPlayerLeader = player.score === leaderScore && player.score > 0
              return (
                <div key={player.id} className="flex flex-col items-center">
                  <div className="relative">
                    {/* Kerstmuts */}
                    <div 
                      className="absolute -top-4 left-1/2 -translate-x-1/2 text-3xl md:text-4xl z-10"
                      style={{ 
                        filter: `drop-shadow(0 2px 4px rgba(0,0,0,0.3))`,
                        color: player.color || '#ef4444'
                      }}
                    >
                      🎅
                    </div>
                    {/* Cirkel */}
                    <div
                      className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all shadow-lg ${
                        isPlayerActive
                          ? 'ring-4 ring-yellow-400 scale-125 animate-pulse'
                          : 'border-2 border-white/50'
                      }`}
                      style={{
                        backgroundColor: player.color || '#ef4444'
                      }}
                    >
                      {isPlayerLeader && (
                        <Crown weight="fill" size={20} className="text-yellow-300" />
                      )}
                    </div>
                  </div>
                  <div className="mt-2 text-center">
                    <p className="font-bold text-xs md:text-sm truncate max-w-[70px]">{player.name}</p>
                    <p className="text-xs text-muted-foreground">{player.score} pts</p>
                  </div>
                </div>
              )
            })}
          </div>
          
          {/* Realistische kersttafel */}
          <div className="relative px-4">
            {/* Tafel met houtstructuur en kerstversiering */}
            <div className="relative">
              {/* Tafelblad - donker hout */}
              <div className="h-28 rounded-3xl shadow-2xl relative overflow-hidden"
                   style={{
                     background: 'linear-gradient(135deg, #3e2723 0%, #4e342e 25%, #3e2723 50%, #4e342e 75%, #3e2723 100%)',
                     boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.1)'
                   }}>
                {/* Houtnerf effect */}
                <div className="absolute inset-0 opacity-30"
                     style={{
                       backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)`
                     }} />
                
                {/* Hoogglans effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/20" />
                
                {/* Kerstversiering op tafel */}
                <div className="absolute inset-0 flex items-center justify-around px-6">
                  {/* Rood tafelkleed runner in het midden */}
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-16 bg-gradient-to-r from-transparent via-red-800/60 to-transparent" />
                  
                  {/* Decoraties */}
                  <div className="relative z-10 text-4xl drop-shadow-lg">🕯️</div>
                  <div className="relative z-10 text-3xl drop-shadow-lg">🎄</div>
                  <div className="relative z-10 text-5xl drop-shadow-lg">🕯️</div>
                  <div className="relative z-10 text-4xl drop-shadow-lg">⭐</div>
                  <div className="relative z-10 text-5xl drop-shadow-lg">🕯️</div>
                  <div className="relative z-10 text-3xl drop-shadow-lg">🎁</div>
                  <div className="relative z-10 text-4xl drop-shadow-lg">🕯️</div>
                </div>
                
                {/* Kaarslicht gloed effect */}
                <div className="absolute top-2 left-1/4 w-20 h-20 bg-yellow-400/20 rounded-full blur-2xl animate-pulse" />
                <div className="absolute top-2 right-1/4 w-20 h-20 bg-yellow-400/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '0.5s'}} />
              </div>
              
              {/* Tafelrand - 3D effect */}
              <div className="h-2 rounded-b-xl"
                   style={{
                     background: 'linear-gradient(to bottom, #2c1810, #1a0f0a)',
                     boxShadow: '0 4px 8px rgba(0,0,0,0.5)'
                   }} />
            </div>
          </div>
          
          {/* Onderkant van tafel - spelers als kleine cirkels met kerstmuts */}
          <div className="flex justify-around mt-3 flex-wrap gap-2">
            {bottomPlayers.map((player, index) => {
              const actualIndex = topPlayers.length + index
              const isPlayerActive = isSelecting ? actualIndex === highlightedIndex : actualIndex === currentPlayerIndex
              const isPlayerLeader = player.score === leaderScore && player.score > 0
              return (
                <div key={player.id} className="flex flex-col items-center">
                  <div className="relative order-1">
                    {/* Kerstmuts */}
                    <div 
                      className="absolute -top-4 left-1/2 -translate-x-1/2 text-3xl md:text-4xl z-10"
                      style={{ 
                        filter: `drop-shadow(0 2px 4px rgba(0,0,0,0.3))`,
                        color: player.color || '#ef4444'
                      }}
                    >
                      🎅
                    </div>
                    {/* Cirkel */}
                    <div
                      className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all shadow-lg ${
                        isPlayerActive
                          ? 'ring-4 ring-yellow-400 scale-125 animate-pulse'
                          : 'border-2 border-white/50'
                      }`}
                      style={{
                        backgroundColor: player.color || '#ef4444'
                      }}
                    >
                      {isPlayerLeader && (
                        <Crown weight="fill" size={20} className="text-yellow-300" />
                      )}
                    </div>
                  </div>
                  <div className="mt-2 text-center order-2">
                    <p className="font-bold text-xs md:text-sm truncate max-w-[70px]">{player.name}</p>
                    <p className="text-xs text-muted-foreground">{player.score} pts</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Hoofdcontent gebied */}
      <div className="flex-1 flex items-center justify-center">
        {!showSong ? (
          <Card className="w-full max-w-2xl p-8 md:p-12 text-center bg-card/90 text-foreground border-2 border-accent/40 shadow-xl">
            <p className="text-3xl md:text-4xl font-bold mb-8">
              {isSelecting ? 'Wie moet voorlezen...' : `${currentPlayer?.name} is aan de beurt!`}
            </p>
            {!isSelecting && (
              <Button
                onClick={handleRevealSong}
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-12 py-8 text-2xl md:text-3xl font-bold uppercase tracking-wide shadow-lg active:scale-95 transition-all"
                size="lg"
              >
                <Eye weight="bold" className="mr-3" size={32} />
                Onthul het lied
              </Button>
            )}
          </Card>
        ) : (
          <div className="w-full max-w-4xl">
            {/* Voorlees kaart - EXTRA GROOT voor leesbaarheid */}
            <Card 
              className="p-8 md:p-16 mb-6 bg-gradient-to-br from-primary via-primary/90 to-secondary text-foreground border-4 border-accent relative overflow-hidden shadow-2xl cursor-pointer hover:shadow-accent/50 transition-all"
              onClick={() => setShowAnswer(!showAnswer)}
            >
              <div className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 20% 30%, oklch(0.75 0.15 85 / 0.4) 0%, transparent 50%),
                    radial-gradient(circle at 80% 70%, oklch(0.75 0.15 85 / 0.3) 0%, transparent 50%)
                  `
                }}
              />
              
              <div className="relative z-10">
                <p className="text-lg md:text-xl uppercase tracking-widest mb-6 text-accent font-bold">
                  Lees dit hardop voor:
                </p>
                {/* MEGA GROTE TEKST voor ouderen */}
                <p className="text-5xl md:text-7xl font-bold leading-relaxed text-accent tracking-wide mb-6 font-lato drop-shadow-lg" 
                   style={{ lineHeight: '1.4' }}>
                  {currentSong?.gibberish}
                </p>
                
                {/* Antwoord sectie */}
                {!showAnswer ? (
                  <div className="mt-8 pt-6 border-t-2 border-accent/30">
                    <p className="text-xl md:text-2xl text-accent/80 italic flex items-center justify-center gap-2">
                      <Eye size={24} weight="bold" />
                      Klik om het antwoord te zien
                    </p>
                  </div>
                ) : (
                  <div className="mt-8 pt-6 border-t-4 border-accent animate-in fade-in duration-300">
                    <p className="text-2xl md:text-3xl text-accent/80 font-bold mb-3">Het antwoord is:</p>
                    <p className="text-4xl md:text-6xl font-bold text-accent drop-shadow-lg">
                      {currentSong?.original}
                    </p>
                  </div>
                )}
              </div>
            </Card>

            {/* Extra grote knoppen voor ouderen */}
            {!selectingGuesser ? (
              <div className="space-y-4">
                <Button
                  onClick={() => setSelectingGuesser(true)}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-10 text-2xl md:text-3xl font-bold uppercase tracking-wide shadow-lg active:scale-95 transition-all"
                  size="lg"
                >
                  <CheckCircle weight="fill" className="mr-3" size={36} />
                  Goed geraden!
                </Button>
                <Button
                  onClick={handleSkip}
                  variant="outline"
                  className="w-full py-8 text-xl md:text-2xl border-2 border-foreground/30 hover:bg-card/50"
                  size="lg"
                >
                  <SkipForward className="mr-3" size={28} />
                  Nieuw lied ({skipsRemaining}/3 skips over)
                </Button>
              </div>
            ) : (
              <Card className="p-6 md:p-8 bg-card/90 shadow-xl">
                <p className="text-2xl md:text-3xl font-semibold mb-6 text-center">Wie heeft het geraden?</p>
                <div className="space-y-3">
                  {players.map((player) => (
                    <Button
                      key={player.id}
                      onClick={() => handleCorrectGuess(player.id)}
                      variant={player.id === currentPlayer.id ? 'outline' : 'default'}
                      className="w-full justify-start text-xl md:text-2xl py-8 active:scale-95 transition-all"
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
