import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { GameState, Player, Song } from '@/lib/types'
import { generatePlayerId, ensureUniqueName, getRandomPlayerIndex } from '@/lib/game-utils'
import { createSongsList, getRandomUnusedSong } from '@/lib/songs'
import { WelcomeScreen } from '@/components/WelcomeScreen'
import { SeatingScreen } from '@/components/SeatingScreen'
import { ConfirmScreen } from '@/components/ConfirmScreen'
import { PlayingScreen } from '@/components/PlayingScreen'
import { LeaderboardScreen } from '@/components/LeaderboardScreen'
import { SnowfallBackground } from '@/components/SnowfallBackground'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'

function App() {
  const [gameState, setGameState] = useKV<GameState>('game-state', {
    phase: 'welcome',
    players: [],
    currentPlayerIndex: -1,
    currentSong: null,
    songs: createSongsList(),
    roundNumber: 0,
    skipsRemaining: 3
  })

  const handleStartSeating = () => {
    setGameState((current) => {
      if (!current) return current!
      return {
        ...current,
        phase: 'seating' as const,
        players: [],
        songs: createSongsList(),
        roundNumber: 0,
        currentPlayerIndex: -1,
        currentSong: null
      }
    })
  }

  const handleAddPlayer = (name: string) => {
    setGameState((current) => {
      if (!current) return current!
      const uniqueName = ensureUniqueName(name, current.players)
      const newPlayer: Player = {
        id: generatePlayerId(),
        name: uniqueName,
        score: 0
      }
      
      toast.success(`${uniqueName} heeft plaatsgenomen!`, {
        description: 'Geef de telefoon door aan de volgende speler'
      })

      return {
        ...current,
        players: [...current.players, newPlayer]
      }
    })
  }

  const handleCompleteSeating = () => {
    setGameState((current) => {
      if (!current) return current!
      return {
        ...current,
        phase: 'confirm' as const
      }
    })
  }

  const handleStartGame = () => {
    setGameState((current) => {
      if (!current) return current!
      const firstPlayerIndex = getRandomPlayerIndex(current.players)
      return {
        ...current,
        phase: 'playing' as const,
        currentPlayerIndex: firstPlayerIndex,
        roundNumber: 1,
        skipsRemaining: 3
      }
    })
  }

  const handleRevealSong = () => {
    setGameState((current) => {
      if (!current) return current!
      const song = getRandomUnusedSong(current.songs)
      if (!song) {
        toast.error('Alle liedjes zijn gebruikt!')
        return {
          ...current,
          phase: 'leaderboard' as const
        }
      }
      return {
        ...current,
        currentSong: song
      }
    })
  }

  const handleCorrectGuess = (playerId: string) => {
    setGameState((current) => {
      if (!current) return current!
      const updatedPlayers = current.players.map(p =>
        p.id === playerId ? { ...p, score: p.score + 1 } : p
      )

      const updatedSongs = current.songs.map(s =>
        s.id === current.currentSong?.id ? { ...s, used: true } : s
      )

      const guesserIndex = updatedPlayers.findIndex(p => p.id === playerId)
      const guesser = updatedPlayers[guesserIndex]

      toast.success(`${guesser.name} heeft het geraden!`, {
        description: `+1 punt voor ${guesser.name}`
      })

      const unusedSongs = updatedSongs.filter(s => !s.used)
      if (unusedSongs.length === 0) {
        setTimeout(() => {
          setGameState((curr) => {
            if (!curr) return curr!
            return {
              ...curr,
              phase: 'leaderboard' as const
            }
          })
        }, 2000)
      }

      return {
        ...current,
        players: updatedPlayers,
        songs: updatedSongs,
        currentPlayerIndex: guesserIndex,
        currentSong: null,
        roundNumber: current.roundNumber + 1,
        skipsRemaining: 3
      }
    })
  }

  const handleSkipSong = () => {
    setGameState((current) => {
      if (!current) return current!
      
      const newSkipsRemaining = current.skipsRemaining - 1
      
      if (newSkipsRemaining < 0) {
        const nextPlayerIndex = getRandomPlayerIndex(current.players, current.currentPlayerIndex)
        
        toast.warning('Geen skips meer over!', {
          description: 'Je verliest je beurt. Volgende speler is aan de beurt.'
        })

        const updatedSongs = current.songs.map(s =>
          s.id === current.currentSong?.id ? { ...s, used: true } : s
        )

        return {
          ...current,
          songs: updatedSongs,
          currentPlayerIndex: nextPlayerIndex,
          currentSong: null,
          skipsRemaining: 3
        }
      }

      toast.info(`Lied overgeslagen (${newSkipsRemaining} ${newSkipsRemaining === 1 ? 'skip' : 'skips'} over)`, {
        description: 'Nieuw lied wordt geladen...'
      })

      const updatedSongs = current.songs.map(s =>
        s.id === current.currentSong?.id ? { ...s, used: true } : s
      )

      const newSong = getRandomUnusedSong(updatedSongs)
      
      if (!newSong) {
        toast.error('Alle liedjes zijn gebruikt!')
        return {
          ...current,
          phase: 'leaderboard' as const
        }
      }

      return {
        ...current,
        songs: updatedSongs,
        currentSong: newSong,
        skipsRemaining: newSkipsRemaining
      }
    })
  }

  const handleEndGame = () => {
    setGameState((current) => {
      if (!current) return current!
      return {
        ...current,
        phase: 'leaderboard' as const
      }
    })
  }

  const handlePlayAgain = () => {
    setGameState({
      phase: 'welcome',
      players: [],
      currentPlayerIndex: -1,
      currentSong: null,
      songs: createSongsList(),
      roundNumber: 0,
      skipsRemaining: 3
    })
  }

  if (!gameState) {
    return null
  }

  return (
    <div className="relative min-h-screen">
      <SnowfallBackground />
      
      {gameState.phase === 'welcome' && (
        <WelcomeScreen onStart={handleStartSeating} />
      )}

      {gameState.phase === 'seating' && (
        <SeatingScreen
          players={gameState.players}
          onAddPlayer={handleAddPlayer}
          onComplete={handleCompleteSeating}
        />
      )}

      {gameState.phase === 'confirm' && (
        <ConfirmScreen
          players={gameState.players}
          onStart={handleStartGame}
        />
      )}

      {gameState.phase === 'playing' && (
        <PlayingScreen
          players={gameState.players}
          currentPlayerIndex={gameState.currentPlayerIndex}
          currentSong={gameState.currentSong}
          skipsRemaining={gameState.skipsRemaining}
          onRevealSong={handleRevealSong}
          onCorrectGuess={handleCorrectGuess}
          onSkipSong={handleSkipSong}
          onEndGame={handleEndGame}
        />
      )}

      {gameState.phase === 'leaderboard' && (
        <LeaderboardScreen
          players={gameState.players}
          onPlayAgain={handlePlayAgain}
        />
      )}

      <Toaster position="top-center" />
    </div>
  )
}

export default App