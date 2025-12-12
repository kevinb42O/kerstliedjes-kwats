export interface Player {
  id: string
  name: string
  score: number
  skipsRemaining: number
  color?: string
}

export interface Song {
  id: string
  original: string
  gibberish: string
  used: boolean
  categoryId: string
}

export interface Category {
  id: string
  name: string
  songs: Song[]
}

export type GamePhase = 'welcome' | 'seating' | 'confirm' | 'playing' | 'leaderboard' | 'round-transition'

export interface GameState {
  phase: GamePhase
  players: Player[]
  currentPlayerIndex: number
  currentSong: Song | null
  songs: Song[]
  roundNumber: number
  categories?: Category[]
  currentCategoryIndex?: number
  songsUsedInCurrentRound?: number
}
