import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { GameState, Player, Song } from '@/lib/types'
import { generatePlayerId, ensureUniqueName, getRandomPlayerIndex, SONGS_PER_ROUND, INITIAL_SKIPS_PER_ROUND, shouldAdvanceToNextRound, isLastCategory } from '@/lib/game-utils'
import { createSongsList, createCategories, getRandomUnusedSongFromCategory } from '@/lib/songs'
import { WelcomeScreen } from '@/components/WelcomeScreen'
import { SeatingScreen } from '@/components/SeatingScreen'
import { ConfirmScreen } from '@/components/ConfirmScreen'
import { PlayingScreen } from '@/components/PlayingScreen'
import { LeaderboardScreen } from '@/components/LeaderboardScreen'
import { RoundTransition } from '@/components/RoundTransition'
import { SnowfallBackground } from '@/components/SnowfallBackground'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'

function App() {
  const [isInitialized, setIsInitialized] = useState(false)
  const [gameState, setGameState] = useKV<GameState>('game-state', {
    phase: 'welcome',
    players: [],
    currentPlayerIndex: -1,
    currentSong: null,
    songs: createSongsList(),
    roundNumber: 0,
    categories: createCategories(),
    currentCategoryIndex: 0,
    songsUsedInCurrentRound: 0
  })

  useEffect(() => {
    const initializeApp = async () => {
      const allKeys = await window.spark.kv.keys()
      for (const key of allKeys) {
        await window.spark.kv.delete(key)
      }
      setIsInitialized(true)
    }
    
    initializeApp()
  }, [])

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
        currentSong: null,
        categories: createCategories(),
        currentCategoryIndex: 0,
        songsUsedInCurrentRound: 0
      }
    })
  }

  const handleAddPlayer = (name: string) => {
    setGameState((current) => {
      if (!current) return current!
      const uniqueName = ensureUniqueName(name, current.players)
      const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6', '#f59e0b', '#06b6d4', '#10b981', '#6366f1', '#d946ef', '#84cc16', '#f43f5e']
      const newPlayer: Player = {
        id: generatePlayerId(),
        name: uniqueName,
        score: 0,
        skipsRemaining: INITIAL_SKIPS_PER_ROUND,
        color: colors[current.players.length % colors.length]
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
        phase: 'round-transition' as const,
        currentPlayerIndex: firstPlayerIndex,
        roundNumber: 1,
        currentCategoryIndex: 0,
        songsUsedInCurrentRound: 0
      }
    })
  }

  const handleContinueFromTransition = () => {
    setGameState((current) => {
      if (!current) return current!
      return {
        ...current,
        phase: 'playing' as const
      }
    })
  }

  const handleRevealSong = () => {
    setGameState((current) => {
      if (!current) return current!
      
      const categories = current.categories || createCategories()
      const categoryIndex = current.currentCategoryIndex ?? 0
      const currentCategory = categories[categoryIndex]
      
      if (!currentCategory) {
        toast.error('Geen categorie gevonden!')
        return {
          ...current,
          phase: 'leaderboard' as const
        }
      }
      
      const song = getRandomUnusedSongFromCategory(currentCategory.id, current.songs)
      
      if (!song) {
        toast.error('Alle liedjes in deze categorie zijn gebruikt!')
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

      const categories = current.categories || createCategories()
      const categoryIndex = current.currentCategoryIndex ?? 0
      const songsUsed = (current.songsUsedInCurrentRound ?? 0) + 1

      // Check if we need to advance to next round
      if (shouldAdvanceToNextRound(songsUsed)) {
        const nextCategoryIndex = categoryIndex + 1
        
        // Check if game is over
        if (nextCategoryIndex >= categories.length) {
          setTimeout(() => {
            setGameState((curr) => {
              if (!curr) return curr!
              return {
                ...curr,
                phase: 'leaderboard' as const
              }
            })
          }, 2000)
        } else {
          // Move to next round
          setTimeout(() => {
            setGameState((curr) => {
              if (!curr) return curr!
              // Reset skips for all players
              const resetPlayers = curr.players.map(p => ({ ...p, skipsRemaining: INITIAL_SKIPS_PER_ROUND }))
              return {
                ...curr,
                phase: 'round-transition' as const,
                currentCategoryIndex: nextCategoryIndex,
                songsUsedInCurrentRound: 0,
                roundNumber: nextCategoryIndex + 1,
                players: resetPlayers
              }
            })
          }, 2000)
        }
      }

      return {
        ...current,
        players: updatedPlayers,
        songs: updatedSongs,
        currentPlayerIndex: guesserIndex,
        currentSong: null,
        songsUsedInCurrentRound: songsUsed
      }
    })
  }

  const handleSkipSong = () => {
    setGameState((current) => {
      if (!current) return current!
      
      const currentPlayer = current.players[current.currentPlayerIndex]
      const newSkipsRemaining = currentPlayer.skipsRemaining - 1
      
      if (newSkipsRemaining < 0) {
        toast.error('Geen skips meer over!', {
          description: `Je hebt al je ${INITIAL_SKIPS_PER_ROUND} skips gebruikt.`
        })
        return current
      }

      toast.info(`Lied overgeslagen (${newSkipsRemaining} ${newSkipsRemaining === 1 ? 'skip' : 'skips'} over)`, {
        description: 'Nieuw lied wordt geladen...'
      })

      const updatedSongs = current.songs.map(s =>
        s.id === current.currentSong?.id ? { ...s, used: true } : s
      )

      const categories = current.categories || createCategories()
      const categoryIndex = current.currentCategoryIndex ?? 0
      const currentCategory = categories[categoryIndex]
      const songsUsed = (current.songsUsedInCurrentRound ?? 0) + 1

      const newSong = getRandomUnusedSongFromCategory(currentCategory.id, updatedSongs)
      
      if (!newSong) {
        // Check if we need to advance to next round
        if (shouldAdvanceToNextRound(songsUsed)) {
          const nextCategoryIndex = categoryIndex + 1
          
          if (nextCategoryIndex >= categories.length) {
            toast.error('Het spel is afgelopen!')
            return {
              ...current,
              phase: 'leaderboard' as const
            }
          } else {
            // Move to next round
            const resetPlayers = current.players.map(p => ({ ...p, skipsRemaining: INITIAL_SKIPS_PER_ROUND }))
            return {
              ...current,
              phase: 'round-transition' as const,
              currentCategoryIndex: nextCategoryIndex,
              songsUsedInCurrentRound: 0,
              roundNumber: nextCategoryIndex + 1,
              players: resetPlayers,
              songs: updatedSongs,
              currentSong: null
            }
          }
        } else {
          toast.error('Geen liedjes meer in deze categorie!')
          return current
        }
      }

      const updatedPlayers = current.players.map((p, idx) =>
        idx === current.currentPlayerIndex 
          ? { ...p, skipsRemaining: newSkipsRemaining } 
          : p
      )

      return {
        ...current,
        players: updatedPlayers,
        songs: updatedSongs,
        currentSong: newSong,
        songsUsedInCurrentRound: songsUsed
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
      categories: createCategories(),
      currentCategoryIndex: 0,
      songsUsedInCurrentRound: 0
    })
  }

  if (!gameState || !isInitialized) {
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

      {gameState.phase === 'round-transition' && (
        <RoundTransition
          categoryName={gameState.categories?.[gameState.currentCategoryIndex ?? 0]?.name ?? 'Onbekende categorie'}
          roundNumber={gameState.roundNumber}
          isFinale={isLastCategory(gameState.currentCategoryIndex ?? 0, gameState.categories || [])}
          onContinue={handleContinueFromTransition}
        />
      )}

      {gameState.phase === 'playing' && (
        <PlayingScreen
          players={gameState.players}
          currentPlayerIndex={gameState.currentPlayerIndex}
          currentSong={gameState.currentSong}
          skipsRemaining={gameState.players[gameState.currentPlayerIndex]?.skipsRemaining ?? INITIAL_SKIPS_PER_ROUND}
          onRevealSong={handleRevealSong}
          onCorrectGuess={handleCorrectGuess}
          onSkipSong={handleSkipSong}
          onEndGame={handleEndGame}
          categoryName={gameState.categories?.[gameState.currentCategoryIndex ?? 0]?.name ?? 'Onbekende categorie'}
          songsUsedInRound={gameState.songsUsedInCurrentRound ?? 0}
          isFinale={isLastCategory(gameState.currentCategoryIndex ?? 0, gameState.categories || [])}
          roundNumber={gameState.roundNumber}
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